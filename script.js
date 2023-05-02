
const distanceElement = document.getElementById("distance");

async function logJSONData(sensorId) {
  const response = await fetch(`http://192.168.2.233:8000/sensor/${sensorId}`);
  const jsonData = await response.text();
  console.log(jsonData);
  console.log(response);
}

async function getSensorData() {
  const distance1 = await logJSONData(1);
  const distance2 = await logJSONData(2);
  return [distance1, distance2];
}

setInterval(async () => {
  const [distance1, distance2] = await getSensorData();
  distanceElement.innerText = `Sensor 1 - Distance: ${distance1} cm`;
}, 1000);
