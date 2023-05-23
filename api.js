const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const moment = require('moment');
require('moment-timezone');
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

app.post("/sensor", (req, res) => {  
  console.log('Got body:', req.body);
  const data = req.body;
  console.log(data.sensorId);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');
  const sensorData = {
    distanceCm: data.distanceCm,
    timestamp: currentTime, 
  }
    map.set(data.sensorId, sensorData);
    res.sendStatus(200);  
});


app.listen(8000, () => {
  console.log("API server started on port 8000");
});
