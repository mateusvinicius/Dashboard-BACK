"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMeta = getMeta;
exports.ParameterType = void 0;

/**
 * All possible parameter decorator types
 *
 * @export
 * @enum {number}
 */
let ParameterType;
/**
 * Cached(meta) parameter configuration
 *
 * @export
 * @interface ParameterConfiguration
 */

exports.ParameterType = ParameterType;

(function (ParameterType) {
  ParameterType[ParameterType["REQUEST"] = 0] = "REQUEST";
  ParameterType[ParameterType["RESPONSE"] = 1] = "RESPONSE";
  ParameterType[ParameterType["PARAMS"] = 2] = "PARAMS";
  ParameterType[ParameterType["QUERY"] = 3] = "QUERY";
  ParameterType[ParameterType["BODY"] = 4] = "BODY";
  ParameterType[ParameterType["HEADERS"] = 5] = "HEADERS";
  ParameterType[ParameterType["COOKIES"] = 6] = "COOKIES";
  ParameterType[ParameterType["NEXT"] = 7] = "NEXT";
})(ParameterType || (exports.ParameterType = ParameterType = {}));

/**
 * Get or initiate metadata on a target
 *
 * @param {ExpressClass} target
 * @returns {ExpressMeta}
 */
function getMeta(target) {
  if (!target.__express_meta__) {
    target.__express_meta__ = {
      url: '',
      routes: {},
      params: {}
    };
  }

  return target.__express_meta__;
}