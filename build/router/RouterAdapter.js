"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var RouterAdapter = (function () {
    function RouterAdapter() {
        var _this = this;
        this.connectRouteToExpress = function (_a) {
            var props = _a.props, app = _a.app, expressRouter = _a.expressRouter;
            console.log("Added route", props.path);
            expressRouter[props.method](props.path, props.controller);
            console.log("RECIEVED PROPS", props, app, expressRouter);
        };
        this.buildRoute = function (_a) {
            var Router = _a.Router, app = _a.app, expressRouter = _a.expressRouter;
            var routerInstance = tsyringe_1.container.resolve(Router);
            console.log("ROUTER INSTANCE IS", Router);
            for (var route in routerInstance) {
                console.log("ROUTER IS", route);
                var buildFunction = routerInstance[route].build;
                if (typeof buildFunction !== 'function') {
                    continue;
                }
                var routeProps = buildFunction();
                _this.connectRouteToExpress({ props: routeProps, app: app, expressRouter: expressRouter });
            }
            app.use("/", expressRouter);
        };
    }
    RouterAdapter = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [])
    ], RouterAdapter);
    return RouterAdapter;
}());
exports.RouterAdapter = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map