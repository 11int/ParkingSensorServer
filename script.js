const distanceElement = document.getElementById("distance");
const distanceElement2 = document.getElementById("distance2");
let s1 = document.getElementById("parking1")
let s2 = document.getElementById("parking2")
let timestamp1 = document.getElementById("timeStamp1")

async function logJSONData(sensorId) {
  const response = await fetch(`http://192.168.2.233:8000/sensor/${sensorId}`);
  const jsonData = await response.json();
  const sensorData = jsonData.sensorData;
  const distanceCm = sensorData.distanceCm
  const timestamp = sensorData.timestamp
  console.log(timestamp);
  console.log(distanceCm);
  console.log(jsonData);
  console.log(response);
  return sensorData;
}

async function getSensorData() {
  const sensorData1 = await logJSONData(1);
  const sensorData2 = await logJSONData(2);
  return [sensorData1, sensorData2];
}

const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const car1 = document.getElementById("car1")
const car2 = document.getElementById("car2")

let buttonclicked1 = false;
let buttonclicked2 = false;

setInterval(async () => {
  const [sensorData1, sensorData2] = await getSensorData();
  if (sensorData1.distanceCm <= 100) {
    s1.style.backgroundColor = "#none"
  }
  else {
    s1.style.backgroundColor = "#none"
  }
  if (sensorData2.distanceCm <= 100) {
    s2.style.backgroundColor = "#ff0000"
    if (buttonclicked2) {
      car2.style = "animation: in 5s forwards";
      buttonclicked2 = false;
    } else {
      car2.style = "animation: out 5s forwards";
      buttonclicked2 = true;
    }
  }
  else {
    s2.style.backgroundColor = "#none"
  }
  timestamp1.innerText = `Sensor 1 - Time: ${sensorData1.timestamp}`;
  distanceElement.innerText = `Sensor 1 - Distance: ${sensorData1.distanceCm.toFixed(0)}`;
  distanceElement2.innerText = `Sensor 2 - Distance: ${sensorData2.distanceCm.toFixed(0)}`;
}, 1000);