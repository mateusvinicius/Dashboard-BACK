import { ExpressMeta, getMeta } from '@Decorators/meta';
import { RouterOptions } from 'express';

export function Controller(url:string, routerOptions?:RouterOptions) {
  return (target:any):void => {
    const meta: ExpressMeta = getMeta(target.prototype);
    meta.url = url;
    meta.routerOptions = Array.isArray(routerOptions) ? null : routerOptions;
  };
}
