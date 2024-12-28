const policeStations = [
    { name: "Alankar Police station", lat: 18.5072, lon: 73.8372 },
    { name: "Kothrud Police station", lat: 18.506585, lon: 73.8024811 },
    { name: "Deccan Police station",  lat: 18.5145, lon: 73.8319 },
    { name: "Parvati Police station", lat: 18.4942, lon: 73.8554}
];

var map = L.map('map').setView([18.5204, 73.8567], 13); 

L.tileLayer('https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=zDf0WlMdXc1AN1F0Mvyt', {
    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors',
    maxZoom: 18,
}).addTo(map);

const selectElement = document.getElementById('station-select');
policeStations.forEach(station => {
    const option = document.createElement('option');
    option.value = `${station.lat},${station.lon}`;
    option.textContent = station.name;
    selectElement.appendChild(option);
});

function updateMap(lat, lon) {
    map.setView([lat, lon], 15); 
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${station.name}</b>`)
        .openPopup();
}

selectElement.addEventListener('change', function() {
    const [lat, lon] = this.value.split(',').map(Number);
    updateMap(lat, lon);
});
