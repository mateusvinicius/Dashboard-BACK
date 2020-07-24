"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.All = All;
exports.Get = Get;
exports.Post = Post;

var _meta = require("./meta");

function decoratorFactory(method, url) {
  return (target, key, descriptor) => {
    const meta = (0, _meta.getMeta)(target);
    meta.routes[key] = {
      method,
      url
    };
    return descriptor;
  };
}

function All(url) {
  return decoratorFactory('all', url);
}

function Get(url) {
  return decoratorFactory('get', url);
}

function Post(url) {
  return decoratorFactory('post', url);
}