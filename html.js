const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {};
let status = document.getElementById("status");

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    status.innerHTML = "Hello World";

});