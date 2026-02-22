import axios from 'https://esm.sh/axios@1.7.4';

let name = [];

//Margaretengürttel U4 heiligen,hüttel gumpendorferstraße U6 sieben,florids 

const rbls = [4415, 4422,4611,4618];
const url = `https://www.wienerlinien.at/ogd_realtime/monitor?rbl=${rbls.join('&rbl=')}`;
const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

async function getDepartures() {

    const response = await axios.get(proxyUrl);
    
    if (response.data && response.data.data) {

        const data = response.data.data;
        return data;

    } else {
        console.error("Datenstruktur der Wiener Linien unvollständig", response.data);
    }

}

function splitDataAndDisplay(data) {

    const tableData = document.getElementById("departures-body")
    
    
    data.monitors.forEach((station,index) => {
        
        const line = station.lines[0];
        
        if (!line.departures || !line.departures.departure) {
            console.log("No departures for station:", station.locationStop.properties.title);
            return;
        }

        name[index] = {
            name: station.locationStop.properties.title,
            departureNext: line.departures.departure[0].departureTime.countdown,
            departureAfterNext: line.departures.departure[1].departureTime.countdown,
            direction: line.towards,
            trafficjam: line.trafficjam,
            realtime: line.realtimeSupported
        }

        const newRow = document.createElement("tr");
        const stationName = document.createElement("td");
        const departureNext = document.createElement("td");
        const departureAfterNext = document.createElement("td");
        const direction = document.createElement("td");
        const trafficjam = document.createElement("td");
        const realtime = document.createElement("td");
        
        stationName.textContent = name[index].name;
        departureNext.textContent = name[index].departureNext;
        departureAfterNext.textContent = name[index].departureAfterNext;
        direction.textContent = name[index].direction;
        trafficjam.textContent = name[index].trafficjam ? "Yes" : "No";
        realtime.textContent = name[index].realtime ? "Yes" : "No";


        tableData.appendChild(newRow);
        newRow.appendChild(stationName);
        newRow.appendChild(direction);
        newRow.appendChild(departureNext);
        newRow.appendChild(departureAfterNext);
        newRow.appendChild(trafficjam);
        newRow.appendChild(realtime);

        console.log(index, name[index]);        
    });
}

async function main() {
    const data = await getDepartures();
    splitDataAndDisplay(data);
}

main();
