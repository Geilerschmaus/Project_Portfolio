import axios from 'https://cdn.skypack.dev/axios';

const rbls = [4415, 4422];
const url = `https://www.wienerlinien.at/ogd_realtime/monitor?rbl=${rbls.join('&rbl=')}`;
const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

async function getDepartures() {

    const response = await axios.get(proxyUrl);
    
    if (response.data && response.data.data) {
        const station = response.data.data.monitors[0].locationStop.properties.title;
        console.log("3. Station gefunden:", station);
        alert("Station: " + station);
    } else {
        console.error("Datenstruktur der Wiener Linien unvollständig", response.data);
    }

}

getDepartures();