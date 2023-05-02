const distanceElement = document.getElementById("distance");
const distanceElement2 = document.getElementById("distance2");
let s1 = document.getElementById("parking1")
let s2 = document.getElementById("parking2")
let s3 = document.getElementById("parking3")


async function logJSONData(sensorId) {
  const response = await fetch(`http://192.168.2.233:8000/sensor/${sensorId}`);
  const jsonData = await response.json();
  const distanceCm = jsonData.distanceCm;
  console.log(distanceCm);
  console.log(jsonData);
  console.log(response);
  return distanceCm;
}

async function getSensorData() {
  const distance1 = await logJSONData(1);
  const distance2 = await logJSONData(2);
  return [distance1, distance2];
}

setInterval(async () => {
  const [distance1, distance2] = await getSensorData();
  if (distance1 <= 100) {
    s1.style.backgroundColor = "#none"
  }
  else {
    s1.style.backgroundColor = "#none"
  }
  if (distance2 <= 100) {
    s2.style.backgroundColor = "#ff0000"
  }
  else {
    s2.style.backgroundColor = "#none"
  }
  distanceElement.innerText = `Sensor 1 - Distance: ${distance1.toFixed(0)}`;
  distanceElement2.innerText = `Sensor 2 - Distance: ${distance2.toFixed(0)}`;
}, 1000);