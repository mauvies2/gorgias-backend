const { handleError } = require('./utils/handleHttpError');

class Router {
  _getRoutes = [];

  constructor() {}

  async routeRequest(req, res) {
    if (req.method === 'GET') {
      for (const route of this._getRoutes) {
        const routesMatch = this._matchRoutes(req.url, route.path);

        if (routesMatch) {
          const params = this._parseUrlParams(req.url, route.path);

          if (params) {
            req.params = params;
          }

          return await route.controller(req, res);
        }
      }
    }

    handleError(res, 404, 'Not found');
  }

  get(path, controller) {
    const params = this._getParamsFromRoute(path);
    this._getRoutes.push({ path, params, controller });
  }

  _getParamsFromRoute(route) {
    if (!route.includes(':')) {
      return null;
    }

    return route
      .split('/')
      .filter((val) => val.includes(':'))
      .map((param) => param.substr(1));
  }

  _matchRoutes(reqUrl, routePath) {
    const urlPathSplitted = reqUrl.split('/');
    const routePathSplitted = routePath.split('/');

    if (urlPathSplitted.length > routePathSplitted.length) {
      return false;
    }

    return urlPathSplitted.every((segment, i) =>
      routePathSplitted[i] && routePathSplitted[i].includes(':') ? true : segment === routePathSplitted[i]
    );
  }

  _parseUrlParams(reqUrl, routePath) {
    const urlPathSplitted = reqUrl.split('/');
    const routeSplitted = routePath.split('/');

    return urlPathSplitted.reduce((acc, segment, i) => {
      if (routeSplitted[i] && routeSplitted[i].includes(':')) {
        const param = routeSplitted[i].substr(1);
        acc[param] = segment;
      }

      return acc;
    }, {});
  }
}

module.exports = Router;
