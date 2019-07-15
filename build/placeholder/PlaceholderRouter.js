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
var RouterBuilder_1 = require("../router/RouterBuilder");
var PlaceholderRouter = (function () {
    function PlaceholderRouter() {
        this.login = new RouterBuilder_1.RouterBuilder()
            .query("count")
            .path("/login/:count")
            .get(function (_a) {
            var count = _a.count;
            return { status: 418, body: { inRouter: true, got_called: count } };
        });
    }
    PlaceholderRouter = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [])
    ], PlaceholderRouter);
    return PlaceholderRouter;
}());
exports.PlaceholderRouter = PlaceholderRouter;
//# sourceMappingURL=PlaceholderRouter.js.map