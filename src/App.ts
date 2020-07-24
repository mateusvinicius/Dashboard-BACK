import express, {
  Application, Router, Request, Response, NextFunction,
} from 'express';
import AllController from '@Controllers/index';
import {
  ExpressMeta, Route, ParameterType, ParameterConfiguration,
} from '@Decorators/meta';

class App {
    app:Application;

    constructor() {
      this.app = express();
      this.app.use(express.json());
      this.LoadControllers();
    }

    LoadControllers() {
      AllController.forEach((Controllers) => {
        const meta: ExpressMeta = Reflect.getOwnPropertyDescriptor(Controllers.prototype, '__express_meta__').value;
        const router: Router = Router(meta.routerOptions);

        const { routes } = meta;
        const { url } = meta;
        const { params } = meta;
        const instancied = new Controllers();
        for (const methodName of Object.keys(routes)) {
          const route: Route = routes[methodName];

          const handle = (req, res, next) => {
            const args = this.extractParameters(req, res, next, params[methodName]);

            const handler = instancied[methodName].apply(instancied, args);
            if (handler instanceof Promise) {
              handler.catch(next);
            }
            return handler;
          };

          router[route.method].apply(router, [
            route.url, handle,
          ]);
          this.app.use(url, router);
        }
      });
    }

    extractParameters(req: Request, res: Response, next: NextFunction, params: ParameterConfiguration[]): any[] {
      if (!params || !params.length) {
        return [req, res, next];
      }

      const args = [];

      for (const { name, index, type } of params) {
        switch (type) {
          case ParameterType.RESPONSE:
            args[index] = res;
            break;
          case ParameterType.REQUEST:
            args[index] = this.getParam(req, null, name);
            break;
          case ParameterType.NEXT:
            args[index] = next;
            break;
          case ParameterType.PARAMS:
            args[index] = this.getParam(req, 'params', name);
            break;
          case ParameterType.QUERY:
            args[index] = this.getParam(req, 'query', name);
            break;
          case ParameterType.BODY:
            args[index] = this.getParam(req, 'body', name);

            break;
          case ParameterType.HEADERS:
            args[index] = this.getParam(req, 'headers', name);
            break;
          case ParameterType.COOKIES:
            args[index] = this.getParam(req, 'cookies', name);
            break;
        }
      }

      return args;
    }

    getParam(source: any, paramType: string, name: string): any {
      const param = source[paramType] || source;
      return name ? param[name] : param;
    }
}

export default new App().app;
