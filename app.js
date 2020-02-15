const http = require('http');
const fs = require('fs');
const moment = require('moment');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log("URL: ", req.url);
  console.log("Method: ", req.method);
  res.end(JSON.stringify(req.url));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});