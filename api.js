const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.json());

const map = new Map();

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
    console.log('Got body:', req.body);
    const data = req.body;
    console.log(data.sensorId);
    const date = new Date();
    res.send(200);  
});

app.listen(8000, () => {
  console.log("API server started on port 8000");
});