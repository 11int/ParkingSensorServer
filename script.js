const distanceElement = document.getElementById("distance");

async function logJSONData() {
    const response = await fetch("http://192.168.2.233:8000/sensor/1");
    const jsonData = await response.text();
    console.log(jsonData);
}

logJSONData();

function getSensorData() {
    // replace this with your code to read sensor data
}

setInterval(() => {
    const distance = getSensorData();
    distanceElement.innerText = distance;
}, 1000);
