import { ExpressMeta, ParameterType, getMeta } from './meta';

function decoratorFactory(type: ParameterType) {
  return function (name?: string): ParameterDecorator {
    return function (target: any, methodName: string, index: number) {
      const meta: ExpressMeta = getMeta(target);

      if (meta.params[methodName] === undefined) {
        meta.params[methodName] = [];
      }

      meta.params[methodName].push({ index, type, name });
    };
  };
}

/**
 * Express req object
 */
export const Request = decoratorFactory(ParameterType.REQUEST);

/**
 * Express res object
 */
export const Response = decoratorFactory(ParameterType.RESPONSE);

export const Body = decoratorFactory(ParameterType.BODY);
