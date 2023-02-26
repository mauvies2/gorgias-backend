const config = {
  // here we should use env variables
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000,
};

module.exports = config;
