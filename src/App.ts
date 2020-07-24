import express, {
  Application, Router, Request, Response, NextFunction,
} from 'express';
import AllController from '@Controllers/index';
import {
  ExpressMeta, Route, ParameterType, ParameterConfiguration,
} from '@Decorators/meta';
import { isString, isArray } from 'util';

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
        // eslint-disable-next-line no-restricted-syntax
        for (const methodName of Object.keys(routes)) {
          const route: Route = routes[methodName];

          const handle = (req:Request, res:Response, next:NextFunction) => {
            const args = this.extractParameters(req, res, next, params[methodName]);

            // eslint-disable-next-line prefer-spread
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

      // eslint-disable-next-line no-restricted-syntax
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
          default:
        }
      }

      return args;
    }

    getParam(source: any, paramType: string, name: string |Array<any>): any {
      const param = source[paramType] || source;
      if (isString(name)) {
        return name ? param[name] : param;
      }
      if (isArray(name)) {
        const array_temp = {};
        name.map((value:string) => {
          array_temp[value] = param[value];
        });

        return array_temp;
      }
    }
}
export default new App().app;
