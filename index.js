const http = require('http');

const config = require('./config');
const projectsController = require('./projects/controller');
const Router = require('./router');

const { host, port } = config;

// routes
const router = new Router();
router.get('/projects/:id', projectsController.getProject);

// listener
const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  router.routeRequest(req, res);
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
