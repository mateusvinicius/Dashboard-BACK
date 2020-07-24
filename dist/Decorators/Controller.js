"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = Controller;

var _meta = require("./meta");

function Controller(url, routerOptions) {
  return target => {
    const meta = (0, _meta.getMeta)(target.prototype);
    meta.url = url;
    meta.routerOptions = Array.isArray(routerOptions) ? null : routerOptions;
  };
}