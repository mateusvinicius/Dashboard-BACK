import { RouterOptions } from 'express';

/**
 * All possible parameter decorator types
 *
 * @export
 * @enum {number}
 */
export enum ParameterType {
  REQUEST,
  RESPONSE,
  PARAMS,
  QUERY,
  BODY,
  HEADERS,
  COOKIES,
  NEXT
}

/**
 * Cached(meta) parameter configuration
 *
 * @export
 * @interface ParameterConfiguration
 */
export interface ParameterConfiguration {
  index: number;
  type: ParameterType;
  name ?: string|Array<any>;
  data?: any;
}

/**
 * Cached(meta) route configuration
 *
 * @export
 * @interface Route
 */
export interface Route {
  method: string;
  url: string;
}

/**
 * Express decorators controller metadata
 *
 * @export
 * @interface ExpressMeta
 */
export interface ExpressMeta {
  url: string;

  routerOptions?: RouterOptions;

  routes: {
    [key: string]: Route;
  };

  params: {
    [key: string]: ParameterConfiguration[];
  };
}

/**
 * Express decorators controller
 *
 * @export
 * @interface ExpressMeta
 */
export interface ExpressClass {
  // eslint-disable-next-line camelcase
  __express_meta__?: ExpressMeta;
}

/**
 * Get or initiate metadata on a target
 *
 * @param {ExpressClass} target
 * @returns {ExpressMeta}
 */
export function getMeta(target: ExpressClass): ExpressMeta {
  if (!target.__express_meta__) {
    // eslint-disable-next-line no-param-reassign
    target.__express_meta__ = {
      url: '',
      routes: {},
      params: {},
    };
  }
  return target.__express_meta__;
}

export interface Type extends Function {
  new (...args: any[]);
}
