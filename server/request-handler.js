var messages = {
  results: []
};

var requestHandler = function (request, response) {

  // var fs = require('fs');

  // fs.readFile('../im06-2018-03-chatterbox-server/client/index.html', 'utf-8', function (error, data) {});
  var statusCode = 200;
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages.results));
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    var postdata = '';
    request.on('data', (data) => {
      postdata += data;
    });
    request.on('end', () => {
      var parseData = JSON.parse(postdata);
      messages.results.push(parseData);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages.results));
    });

  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    statusCode = 201;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages.results));
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages.results));
  }

};

exports.requestHandler = requestHandler;