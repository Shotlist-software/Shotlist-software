const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

function safePath(urlPath) {
  const cleaned = decodeURIComponent(urlPath.split('?')[0]);
  const relative = cleaned === '/' ? '/index.html' : cleaned;
  const absolute = path.normalize(path.join(ROOT, relative));
  if (!absolute.startsWith(ROOT)) return null;
  return absolute;
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url || '/');

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`StockVerse server running at http://localhost:${PORT}`);
});
