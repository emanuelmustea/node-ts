"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var RouterBuilder = (function () {
    function RouterBuilder(state) {
        var e_1, _a;
        var _this = this;
        if (state === void 0) { state = {}; }
        this.path = function (path) {
            return new RouterBuilder_1(__assign({}, _this.state, { path: path }));
        };
        this.build = function () {
            return _this.state;
        };
        this.state = state;
        var methods = ['get', 'post', 'put', 'patch', 'delete'];
        var _loop_1 = function (method) {
            this_1[method] = function (controller) {
                if (controller) {
                    return new RouterBuilder_1(__assign({}, _this.state, { method: method, controller: controller }));
                }
                else {
                    return new RouterBuilder_1(__assign({}, _this.state));
                }
            };
        };
        var this_1 = this;
        try {
            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                var method = methods_1_1.value;
                _loop_1(method);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (methods_1_1 && !methods_1_1.done && (_a = methods_1.return)) _a.call(methods_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    RouterBuilder_1 = RouterBuilder;
    var RouterBuilder_1;
    RouterBuilder = RouterBuilder_1 = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [Object])
    ], RouterBuilder);
    return RouterBuilder;
}());
exports.RouterBuilder = RouterBuilder;
//# sourceMappingURL=RouterBuilder.js.map