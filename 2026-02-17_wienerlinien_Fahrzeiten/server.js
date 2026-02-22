const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  adapter: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL || 'file:./dev.db'
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend OK!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend up and running!' });
});

// Station endpoints
app.post('/api/stations', async (req, res) => {
  const { rbl, name } = req.body;
  
  if (!rbl || !name) {
    return res.status(400).json({ error: 'Missing rbl or name' });
  }
  
  try {
    const station = await prisma.station.create({
      data: { rbl: Number(rbl), name }
    });
    res.status(201).json(station);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Station with this RBL already exists' });
    }
    res.status(500).json({ error: 'Failed to create station', details: error.message });
  }
});

// Get station by RBL
app.get('/api/stations/rbl/:rbl', async (req, res) => {
  const rbl = Number(req.params.rbl);
  
  try {
    const station = await prisma.station.findUnique({
      where: { rbl }
    });
    
    if (!station) {
      return res.status(404).json({ error: 'Station not found', rbl });
    }
    
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get station', details: error.message });
  }
});

// Departure endpoint: retrieves all departures from DB
app.get('/api/departures', async (req, res) => {
  try {
    const departures = await prisma.departure.findMany({
      include: { station: true }
    });
    res.json(departures);
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// All-or-nothing batch insert for departures
app.post('/api/departures', async (req, res) => {
  const now = new Date();
  now.setSeconds(0, 0); // round to minute

  let departures = req.body;
  if (!Array.isArray(departures)) {
    departures = [departures];
  }

  // Validate all records first
  const errors = [];
  const stations = await prisma.station.findMany({});
  const validStationIds = new Set(stations.map(s => s.id));

  const validated = departures.map((dep, idx) => {
    // strict validation
    let err = null;
    if (!dep.line || typeof dep.line !== 'string') err = 'Missing or invalid line';
    if (!dep.destination || typeof dep.destination !== 'string') err = 'Missing or invalid destination';
    if (!dep.stationId || !validStationIds.has(dep.stationId)) err = `Invalid stationId: ${dep.stationId}`;
    if (!dep.expectedArrival) err = 'Missing expectedArrival';
    else {
      const arrival = new Date(dep.expectedArrival);
      if (isNaN(arrival)) err = 'Invalid expectedArrival';
    }
    if (err) errors.push({error: err, index: idx});
    return !err;
  });

  if (errors.length > 0) {
    return res.status(400).json({error: 'Batch insert failed', errors});
  }

  try {
    // All are valid; process insert
    const results = await Promise.all(departures.map(dep => {
      const expectedArrival = new Date(dep.expectedArrival);
      expectedArrival.setSeconds(0, 0);
      return prisma.departure.create({
        data: {
          line: dep.line,
          destination: dep.destination,
          expectedArrival,
          actualArrival: null,
          delayMinutes: null,
          createdAt: new Date(now),
          stationId: dep.stationId
        }
      });
    }));
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Insert failed', details: error.message });
  }
});

// PATCH endpoint for updating actual arrival and delay
app.patch('/api/departures/:id', async (req, res) => {
  const { actualArrival } = req.body;
  if (!actualArrival) {
    return res.status(400).json({ error: 'Missing actualArrival' });
  }
  const arrivalDate = new Date(actualArrival);
  if (isNaN(arrivalDate)) {
    return res.status(400).json({ error: 'Invalid actualArrival' });
  }

  try {
    // Fetch departure
    const dep = await prisma.departure.findUnique({ where: { id: Number(req.params.id) } });
    if (!dep) return res.status(404).json({ error: 'Departure not found' });

    // Calculate delay
    const delayMinutes = Math.round((arrivalDate - dep.expectedArrival) / 60000);

    const updated = await prisma.departure.update({
      where: { id: dep.id },
      data: { actualArrival: arrivalDate, delayMinutes }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Patch failed', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
