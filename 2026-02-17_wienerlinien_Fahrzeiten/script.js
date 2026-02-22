import axios from 'https://cdn.skypack.dev/axios';

const rbls = [4415, 4422, 4611, 4618];
let apiCallCount = 0;

function getProxyUrl() {
    apiCallCount++;
    const timestamp = Date.now();
    const apiUrl = `https://www.wienerlinien.at/ogd_realtime/monitor?rbl=${rbls.join('&rbl=')}&t=${timestamp}`;
    return `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
}

const BACKEND_URL = 'http://localhost:3000';

function formatTime(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }
        return date.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return dateString;
    }
}

function updateCurrentTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = 'Aktuelle Zeit: ' + now.toLocaleTimeString('de-AT');
}

function displayDepartures(departures, saveResults = []) {
    const container = document.getElementById('departures-container');
    container.innerHTML = '';
    
    if (departures.length === 0) {
        container.innerHTML = '<p>Keine Abfahrten gefunden.</p>';
        return;
    }
    
    // Group departures by RBL
    const grouped = {};
    for (const dep of departures) {
        const key = dep.stationRbl;
        if (!grouped[key]) {
            grouped[key] = {
                stationName: dep.stationName,
                rbl: dep.stationRbl,
                departures: []
            };
        }
        grouped[key].departures.push(dep);
    }
    
    // Create columns for each RBL
    const columnsContainer = document.createElement('div');
    columnsContainer.className = 'columns-container';
    
    for (const rbl in grouped) {
        const group = grouped[rbl];
        
        const column = document.createElement('div');
        column.className = 'rbl-column';
        
        const header = document.createElement('h3');
        header.className = 'column-header';
        header.textContent = `${group.stationName} (RBL: ${group.rbl})`;
        column.appendChild(header);
        
        for (let i = 0; i < group.departures.length; i++) {
            const dep = group.departures[i];
            const saveResult = saveResults.find(s => s && s.departure === dep);
            
            const card = document.createElement('div');
            card.className = 'departure-card';
            
            const timeClass = dep.hasDelay ? 'time delay' : 'time';
            
            let saveStatus = '';
            if (saveResult) {
                saveStatus = saveResult.result.success 
                    ? '<span class="save-status saved">✓</span>' 
                    : `<span class="save-status error" title="${saveResult.result.error}">✗</span>`;
            }
            
            card.innerHTML = `
                <div class="departure-info">
                    <span class="line">${dep.line}</span>
                    <div class="destination">${dep.destination}</div>
                </div>
                <div class="time-wrapper">
                    <div class="${timeClass}">${formatTime(dep.expectedArrival)}</div>
                    ${saveStatus}
                </div>
            `;
            column.appendChild(card);
        }
        
        columnsContainer.appendChild(column);
    }
    
    container.appendChild(columnsContainer);
}

function setStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
}

async function getStationByRbl(rbl) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/stations/rbl/${rbl}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

async function saveDepartureToDb(departure) {
    const station = await getStationByRbl(departure.stationRbl);
    
    if (!station) {
        return { success: false, error: `Station RBL ${departure.stationRbl} not found - add in Prisma Studio` };
    }
    
    try {
        const response = await axios.post(`${BACKEND_URL}/api/departures`, {
            line: departure.line,
            destination: departure.destination,
            stationId: station.id,
            expectedArrival: departure.expectedArrival
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.error || error.message };
    }
}

async function saveAllDepartures(departures) {
    const results = [];
    const errors = [];
    
    for (const dep of departures) {
        const result = await saveDepartureToDb(dep);
        results.push({ departure: dep, result });
        if (!result.success) {
            errors.push(result.error);
        }
    }
    
    if (errors.length > 0) {
        setStatus(`Fehler: ${errors[0]}`, 'error');
    } else {
        setStatus(`${departures.length} Abfahrten gespeichert`, 'success');
    }
    
    return results;
}

function parseApiResponse(data) {
    const departures = [];
    
    if (!data || !data.data || !data.data.monitors) {
        console.log('No monitors found in data');
        return departures;
    }
    
    for (const monitor of data.data.monitors) {
        const stationName = monitor.locationStop?.properties?.title || 'Unknown';
        const stationRbl = monitor.locationStop?.properties?.attributes?.rbl || null;
        
        if (!monitor.lines) continue;
        
        for (const line of monitor.lines) {
            const lineName = line.name || 'Unknown';
            const destination = line.towards || 'Unknown';
            
            if (!line.departures || !line.departures.departure) continue;
            
            for (const dep of line.departures.departure) {
                const timeReal = dep.departureTime?.timeReal;
                const timePlanned = dep.departureTime?.timePlanned;
                const departureTime = timeReal || timePlanned;
                
                const hasDelay = timeReal && timePlanned && timeReal !== timePlanned;
                
                if (departureTime) {
                    departures.push({
                        line: lineName,
                        destination: destination.trim(),
                        stationName: stationName,
                        stationRbl: stationRbl,
                        expectedArrival: departureTime,
                        hasDelay: hasDelay
                    });
                }
            }
        }
    }
    
    departures.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
    
    console.log('Total departures parsed:', departures.length);
    return departures;
}

async function getDepartures() {
    updateCurrentTime();
    setStatus('Lädt...', '');
    try {
        const response = await axios.get(getProxyUrl());
        
        if (response.data && response.data.data) {
            const departures = parseApiResponse(response.data);
            console.log('Parsed departures:', departures);
            displayDepartures(departures);
            setStatus(`${departures.length} Abfahrten geladen`, 'success');
            
            // Auto-save to database
            const saveResults = await saveAllDepartures(departures);
            
            // Update display with save status
            displayDepartures(departures, saveResults);
            
            return departures;
        } else {
            console.error('Datenstruktur der Wiener Linien unvollständig', response.data);
            setStatus('Fehler: Datenstruktur unvollständig', 'error');
            return [];
        }
    } catch (error) {
        console.error('Error fetching departures:', error.message);
        setStatus('Fehler beim Laden: ' + error.message, 'error');
        return [];
    }
}

getDepartures();

setInterval(() => {
    getDepartures();
}, 30000);