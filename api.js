const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.json());

const map = new Map();
let lastDistanceCm = null;
let lastTimestamp = null;

function distanceChecker(req, next) {
  const distanceCm = req.body.distanceCm;

  if (typeof distanceCm === 'number' && !isNaN(distanceCm)) {
    const timestamp = Date.now();

    if (lastDistanceCm === null) {
      lastDistanceCm = distanceCm;
      lastTimestamp = timestamp;
    } else {
      const deltaDistanceCm = distanceCm - lastDistanceCm;
      const deltaTimeMs = timestamp - lastTimestamp;

      if (deltaDistanceCm > 500 && deltaTimeMs < 2000) {
        console.warn(`Warning: distanceCm changed too quickly! Delta distanceCm: ${deltaDistanceCm}, Delta time: ${deltaTimeMs} ms`);
      }
      lastDistanceCm = distanceCm;
      lastTimestamp = timestamp;
    }
  }

  next();
}

app.get("/sensor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const distance = map.get(id);
  if (distance == null) {
    res.json({ error: "No data found" });
  } else {
    res.json({ sensorId: id, distanceCm: distance });
  }
});

app.post("/sensor", (req, res) => {
    if(distanceChecker){
        console.log('Got body:', req.body);
        const data = req.body;
        console.log(data.sensorId);
        const date = new Date();
        res.send(200);
    } else {
        res.send(400);
    }
    
});

app.listen(8000, () => {
  console.log("API server started on port 8000");
});