const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Always set CORS headers first
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Handle preflight request
        res.writeHead(204);
        res.end();
        return;
    }

    if (path === '/ip/get') {
        const ip = req.socket.remoteAddress;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ip }));
        return;
    }

    // Fallback for unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
