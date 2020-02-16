const http = require('http');
const fs = require('fs');
const path = require('path')
const moment = require('moment');
const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

var subject;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

function loadFiles() {
  console.log("Load Files...")
  fs.readFile('save.json', (err, data) => {
    console.log("Load Files Complete")
    if (err) {
      console.log("Unable to load save.json");
      subject = {historic: []}
    } else {
      subject = JSON.parse(data);
    }
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
  res.sendFile(path.join(__dirname, 'dist/vue.html'))
})

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/favicon.ico'))
})

app.get('/history.json', function (req, res) {
  res.type('application/json')
  res.send(JSON.stringify(subject.historic));
  loadFiles();
})

app.post('/historyByDate.json', function (req, res) {
  console.log("Got start date:", req.body.startDate)
  res.type('application/json')
  res.send(JSON.stringify(subject.historic.filter(function (element) {
    return moment(element.x).isAfter(req.body.startDate)
  })));
  loadFiles();
})

app.post('/newEntry', function (req, res, next) {
  console.log(req.body)
  if (req.body.date && req.body.weight) {
    subject.historic.push({ x: req.body.date, y: req.body.weight });
    saveFiles();
    res.json({ status: 'success' })
  } else {
    res.json({
      status: 'error',
      error: 'Insufficient data provided',
      errorDetails: req.body
    })
  }
})

// Make the content directory visible for the server
app.use(express.static('dist'))


var server = app.listen(port, hostname, () => {
  loadFiles()
  console.log(`Server running at http://${hostname}:${port}/`);
});