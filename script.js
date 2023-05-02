const { response } = require("express");

const distanceElement = document.getElementById("distance");

async function logJSONData() {
    const response = await fetch("http://192.168.2.233:8000/sensor/1");
    const jsonData = await response.text();
    console.log(jsonData);
    console.log(response)
}

logJSONData();

function getSensorData() {
    let distance = response
}

getSensorData();

setInterval(() => {
    const distance = getSensorData();
    distanceElement.innerText = distance;
}, 1000);