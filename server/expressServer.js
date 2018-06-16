var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var port = 3000;
var ip = '127.0.0.1';

var messages = {
  results: [{
    username: "wonbok",
    text: "hi",
    roomname: "roomA",
    date: new Date()
  }]
};

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/classes/messages', function (req, res) {
  console.log('get log');

  res.send(messages.results);
});

app.post('/classes/messages', function (req, res) {
  var body = req.body;
  console.log(typeof body);
  
  messages.results.push(body);
  res.send(body);
});

app.listen(port, ip, function () {
  console.log('express server listening!');
});