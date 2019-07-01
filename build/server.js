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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importStar(require("express"));
var ConfigService_1 = require("./config/ConfigService");
var tsyringe_1 = require("tsyringe");
var RouterService_1 = require("./router/RouterService");
var Server = (function () {
    function Server(configService, router) {
        var _this = this;
        this.configService = configService;
        this.router = router;
        this.startApp = function () {
            var app = _this.app;
            app.listen(_this.config.port, function () { return console.log("App started on port *:" + _this.config.port); });
        };
        this.configRoutes = function () {
        };
        this.config = this.configService.getConfig();
        this.app = express_1.default();
        this.startApp();
        this.router.configureRoutes({ app: this.app, expressRouter: express_1.Router() });
    }
    Server = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [ConfigService_1.ConfigService,
            RouterService_1.RouterService])
    ], Server);
    return Server;
}());
tsyringe_1.container.resolve(Server);
//# sourceMappingURL=server.js.map