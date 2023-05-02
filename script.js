
const distanceElement = document.getElementById("distance");
const distanceElement2 = document.getElementById("distance2");

async function logJSONData(sensorId) {
  const response = await fetch(`http://192.168.2.233:8000/sensor/${sensorId}`);
  const jsonData = await response.json();
  const distanceCm = jsonData.distanceCm;
  console.log(distanceCm);
  return distanceCm;
}

async function getSensorData() {
  const distance1 = await logJSONData(1);
  const distance2 = await logJSONData(2);
  return [distance1, distance2];
}

setInterval(async () => {
  const [distance1, distance2] = await getSensorData();
  distanceElement.innerText = `Sensor 1 - Distance: ${distance1}`;
  distanceElement2.innerText = `Sensor 2 - Distance: ${distance2}`;
}, 1000);