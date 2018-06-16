const http = require('http');
const messages = [];

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-hyper': 'application/json'
  });
  res.end(JSON.stringify('test'));
});

console.log('Listening on http://localhost:3000');
server.listen(3000, 'localhost');