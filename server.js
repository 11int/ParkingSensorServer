const http = require("http");
const fs = require("fs");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    if (req.url === '/') {
        fs.readFile(__dirname + '/index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    } else if (req.url === '/script.js') {
        fs.readFile(__dirname + '/script.js', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
