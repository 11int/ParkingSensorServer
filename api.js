const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.json());

function getSensorData() {
    // replace this with your code to read sensor data
    return Math.floor(Math.random() * 100);
}

const map = new Map();

app.get("/sensor/:id", (req, res) => {
    //const distance = getSensorData();
    const id = parseInt(req.params.id);
    const distance = map.get(id);
    if (distance == null) {
        res.send("No data found");
    } else {
        res.send(`Sensor ${id} - distance: ${distance} cm`);
    }
});

app.post("/sensor", (req, res) => {
    console.log('Got body:', req.body);
    const data = req.body;
    console.log(data.sensorId);
    const date = new Date();
    map.set(data.sensorId, data.distanceCm);
    res.send(200);
});

app.listen(8000, () => {
    console.log("API server started on port 8000");
});
