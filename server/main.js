const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.6.9';
const port = 3000;

const path = __filename.replaceAll("\\", "/").split("/").slice(0, -1).join("/") + "/data.json";

if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const upath = parsedUrl.pathname;
    const query = parsedUrl.query;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    switch (upath) {
        case "/get":
            console.log(`sent to ${req.socket.remoteAddress}`)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(fs.readFileSync(path));
            break;
        case "/set":
            console.log(`got from ${req.socket.remoteAddress}`)
            if (query.data)
                fs.writeFileSync(path, JSON.stringify(JSON.parse(query.data),null,"  "));
            res.writeHead(200, { 'Content-Type': 'application/text' });
            res.end("yipee");
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found :(');
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
