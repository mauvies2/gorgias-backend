const http = require('http');

function handleError(res, code, msg) {
  res.statusCode = code;
  const message = `${http.STATUS_CODES[code].toUpperCase()}`;
  console.error({ status: code, message: `${message}${msg ? ' - ' + msg : ''}` });
  res.end(`{"message": "${message}"}`);
}

module.exports = { handleError };
