"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = exports.Response = exports.Request = void 0;

var _meta = require("./meta");

function decoratorFactory(type) {
  return function (name) {
    return function (target, methodName, index) {
      const meta = (0, _meta.getMeta)(target);

      if (meta.params[methodName] === undefined) {
        meta.params[methodName] = [];
      }

      meta.params[methodName].push({
        index,
        type,
        name
      });
    };
  };
}
/**
 * Express req object
 */


const Request = decoratorFactory(_meta.ParameterType.REQUEST);
/**
 * Express res object
 */

exports.Request = Request;
const Response = decoratorFactory(_meta.ParameterType.RESPONSE);
exports.Response = Response;
const Body = decoratorFactory(_meta.ParameterType.BODY);
exports.Body = Body;