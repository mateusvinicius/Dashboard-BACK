import { ExpressMeta, getMeta } from '@Decorators/meta';

function decoratorFactory(method: string, url: string) {
  return (target: any, key: string, descriptor: any) => {
    const meta: ExpressMeta = getMeta(target);

    meta.routes[key] = { method, url };

    return descriptor;
  };
}

export function All(url: string) {
  return decoratorFactory('all', url);
}

export function Get(url: string) {
  return decoratorFactory('get', url);
}

export function Post(url: string) {
  return decoratorFactory('post', url);
}
