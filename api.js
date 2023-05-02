const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.json());

const map = new Map();
const prevReadings = {
  1: [],
  2: []
};
function isWithinRange(sensorId, distanceCm) {
    const prev = prevReadings[sensorId];
    if (prev.length < 2) {
      return true;
    }
    const [prev1, prev2] = prev;
    if (distanceCm > prev1 + 300 && distanceCm > prev2 + 300) {
      const now = new Date().getTime();
      const prevTime = now - 2000;
      const prevPrevTime = prevTime - 1000;
      const prev1Time = now - 3000;
      const prev2Time = now - 4000;
      return !map.has(sensorId) || 
             map.get(sensorId) < prev1 ||
             map.get(sensorId)  < prev2 ||
             map.get(sensorId) < prev1 + (now - prevTime) / 1000 * 34300 ||
             map.get(sensorId) < prev2 + (prevTime - prevPrevTime) / 1000 * 34300 ||
             map.get(sensorId) < prev1 + (now - prev1Time) / 1000 * 34300 ||
             map.get(sensorId) < prev2 + (prev1Time - prev2Time) / 1000 * 34300;
    }
    return true;
}

app.get("/sensor/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const distance = map.get(id);
    if (distance == null) {
        res.json({error: "No data found"});
    } else {
        res.json({sensorId: id, distanceCm: distance});
    }
});

app.post("/sensor", (req, res) => {
    const data = req.body;
    if (isWithinRange(data.sensorId, data.distanceCm)) {
        console.log('Got body:', data);
        map.set(data.sensorId, data.distanceCm);
        prevReadings[data.sensorId].unshift(data.distanceCm);
        if (prevReadings[data.sensorId].length > 2) {
            prevReadings[data.sensorId].pop();
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(8000, () => {
    console.log("API server started on port 8000");
});
