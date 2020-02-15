const http = require('http');
const fs = require('fs');
const path = require('path')
const moment = require('moment');
const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

var subject;

function loadFiles() {
  console.log("Load Files...")
  fs.readFile('save.json', (err, data) => {
    console.log("Load Files Complete")
    if (err) throw err;
    subject = JSON.parse(data);
    console.log("Loaded", subject.historic.length, "records");
  });
}

function saveFiles() {
  let data = JSON.stringify(subject, null, '\t');

  fs.writeFile('save.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/vue.html'),)
})

app.get('/history.json', function (req, res) {
  res.type('application/json')
  res.send(JSON.stringify(subject.historic));
})

// Make the content directory visible for the server
app.use(express.static('dist'))

var server = app.listen(port, hostname, () => {
  loadFiles()
  console.log(`Server running at http://${hostname}:${port}/`);
});