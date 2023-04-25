const status = document.getElementById("status");

function updateSensorData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/sensor');
  xhr.onload = function () {
    if (xhr.status === 200) {
      status.innerHTML = xhr.responseText;
    } else {
      status.innerHTML = 'Error getting sensor data';
    }
  };
  xhr.send();
}

setInterval(updateSensorData, 1000);
