const http = require('http');
const projects = require('./data-store');

function handleGetReq(req, res) {
  res.setHeader('Content-Type', 'application/json;charset=utf-8');

  if (req.url === '/projects') {
    return res.end(JSON.stringify(projects));
  }

  return handleError(res, 404);
}

function handleError(res, code) {
  res.statusCode = code;
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

module.exports = { handleGetReq };
