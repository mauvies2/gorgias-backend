const http = require('http');

const { handleGetReq } = require('./routes');

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  if (req.method === 'GET') {
    return handleGetReq(req, res);
  }
  // rest of request methods...
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
