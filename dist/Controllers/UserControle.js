"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _params = require("../Decorators/params");

var _Controller = require("../Decorators/Controller");

var _Route = require("../Decorators/Route");

var _UserService = _interopRequireDefault(require("../Services/UserService"));

var _dec, _dec2, _class, _class2, _temp, _temp2, _temp3, _temp4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let UserController = (_dec = (0, _Controller.Controller)('/Users'), _dec2 = (0, _Route.Post)('/'), _dec(_class = (_class2 = (_temp4 = (_temp3 = (_temp2 = (_temp = class UserController {
  constructor() {
    this.User = new _UserService.default();
  }

  index(body, res) {
    console.log(body);
  }

}, _temp), (0, _params.Body)()(_temp.prototype, "index", 0), _temp2), _temp3), (0, _params.Response)()(_temp3.prototype, "index", 1), _temp4), (_applyDecoratedDescriptor(_class2.prototype, "index", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "index"), _class2.prototype)), _class2)) || _class);
exports.default = UserController;