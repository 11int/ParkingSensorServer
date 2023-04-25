const distanceElement = document.getElementById("distance");

function getSensorData() {
  // replace this with your code to read sensor data
  return Math.floor(Math.random() * 100);
}

setInterval(() => {
  const distance = getSensorData();
  distanceElement.innerText = distance;
}, 1000);
