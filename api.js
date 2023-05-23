const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const moment = require('moment');
require('moment-timezone');
const fs = require('fs');
app.use(cors())

app.use(bodyParser.json());

const map = new Map();
app.get("/sensor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sensorData = map.get(id);
  if (sensorData == null) {
    res.json({ error: "No data found" });
  } else {
    res.json({ sensorId: id, sensorData: sensorData });
  }
});

const WINDOW_SIZE = 5;
const readingsMap = new Map();
function movingAverageFilter(sensorId, newValue) {
  let readings = readingsMap.get(sensorId);
  if (!readings) {
    readings = [];
    readingsMap.set(sensorId, readings);
  }
  readings.push(newValue); // Add the new reading to the array
  if (readings.length > WINDOW_SIZE) {
    readings.shift(); // Remove the oldest entry from the array
  }
  const sum = readings.reduce((acc, val) => acc + val, 0); // Calculate the sum of the readings
  return sum / readings.length; // Calculate and return the average
}

app.post("/sensor", (req, res) => {  
  const data = req.body;
  console.log({ data });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
  const sensorData = {
    distanceCm: data.distanceCm,
    timestamp: currentTime, 
  }

  // Apply moving average filter
  const filteredValue = movingAverageFilter(data.sensorId, data.distanceCm);
  console.log("Filtered Value:", filteredValue);
  map.set(data.sensorId, sensorData);
  res.sendStatus(200);
  fs.writeFile('./Date.txt', currentTime + "\t" + data.sensorId + "\n", { flag: 'a+' }, err => {
    if (err) {
      console.log("err");
    } else {
      console.log('File written successfully!');
    }
  });
});
app.listen(8000, () => {
  console.log("API server started on port 8000");
});

