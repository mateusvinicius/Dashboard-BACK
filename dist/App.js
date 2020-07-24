"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _Controllers = _interopRequireDefault(require("./Controllers"));

var _meta = require("./Decorators/meta");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class App {
  constructor() {
    this.app = (0, _express.default)();
    this.app.use(_express.default.json());
    this.LoadControllers();
  }

  LoadControllers() {
    _Controllers.default.forEach(Controllers => {
      const meta = Reflect.getOwnPropertyDescriptor(Controllers.prototype, '__express_meta__').value;
      const router = (0, _express.Router)(meta.routerOptions);
      const {
        routes
      } = meta;
      const {
        url
      } = meta;
      const {
        params
      } = meta;
      const instancied = new Controllers();

      for (const methodName of Object.keys(routes)) {
        const route = routes[methodName];

        const handle = (req, res, next) => {
          const args = this.extractParameters(req, res, next, params[methodName]);
          const handler = instancied[methodName].apply(instancied, args);

          if (handler instanceof Promise) {
            handler.catch(next);
          }

          return handler;
        };

        router[route.method].apply(router, [route.url, handle]);
        this.app.use(url, router);
      }
    });
  }

  extractParameters(req, res, next, params) {
    if (!params || !params.length) {
      return [req, res, next];
    }

    const args = [];

    for (const {
      name,
      index,
      type
    } of params) {
      switch (type) {
        case _meta.ParameterType.RESPONSE:
          args[index] = res;
          break;

        case _meta.ParameterType.REQUEST:
          args[index] = this.getParam(req, null, name);
          break;

        case _meta.ParameterType.NEXT:
          args[index] = next;
          break;

        case _meta.ParameterType.PARAMS:
          args[index] = this.getParam(req, 'params', name);
          break;

        case _meta.ParameterType.QUERY:
          args[index] = this.getParam(req, 'query', name);
          break;

        case _meta.ParameterType.BODY:
          args[index] = this.getParam(req, 'body', name);
          break;

        case _meta.ParameterType.HEADERS:
          args[index] = this.getParam(req, 'headers', name);
          break;

        case _meta.ParameterType.COOKIES:
          args[index] = this.getParam(req, 'cookies', name);
          break;
      }
    }

    return args;
  }

  getParam(source, paramType, name) {
    const param = source[paramType] || source;
    return name ? param[name] : param;
  }

}

var _default = new App().app;
exports.default = _default;