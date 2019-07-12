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
var RouterAdapter_1 = require("./RouterAdapter");
var PlaceholderRouter_1 = require("../placeholder/PlaceholderRouter");
var ErrorService_1 = require("../error/ErrorService");
var RouterService = (function () {
    function RouterService(routerAdapter, errorService) {
        var _this = this;
        this.routerAdapter = routerAdapter;
        this.errorService = errorService;
        this.configureRoutes = function (_a) {
            var app = _a.app, expressRouter = _a.expressRouter;
            var buildRoute = _this.routerAdapter.buildRoute;
            buildRoute({ basePath: "/", Router: PlaceholderRouter_1.PlaceholderRouter, app: app, expressRouter: expressRouter });
            app.use(function (_req, res) { return res.status(404).json({ error: 'not_found' }); });
        };
    }
    RouterService = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [RouterAdapter_1.RouterAdapter, ErrorService_1.ErrorService])
    ], RouterService);
    return RouterService;
}());
exports.RouterService = RouterService;
//# sourceMappingURL=RouterService.js.map