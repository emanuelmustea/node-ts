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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var url_1 = __importDefault(require("url"));
var RouterAdapter = (function () {
    function RouterAdapter() {
        var _this = this;
        this.buildRoute = function (_a) {
            var basePath = _a.basePath, Router = _a.Router, app = _a.app, expressRouter = _a.expressRouter;
            var routerInstance = tsyringe_1.container.resolve(Router);
            for (var route in routerInstance) {
                var buildFunction = routerInstance[route].build;
                if (typeof buildFunction !== "function") {
                    continue;
                }
                var routeProps = buildFunction();
                _this.connectRouteToExpress({
                    props: routeProps,
                    expressRouter: expressRouter,
                    basePath: basePath
                });
            }
            app.use("/", expressRouter);
        };
        this.filterQuery = function (query, keys) { return keys.reduce(function (queryParams, param) {
            var _a;
            return (__assign({}, queryParams, (_a = {}, _a[param] = query[param], _a)));
        }, {}); };
        this.resolveMiddlewares = function (middlewares) {
            return middlewares.map(function (middleware) { return tsyringe_1.container.resolve(middleware).middleware; });
        };
        this.prepareExpressFunction = function (props) { return function (req, res, next) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var controllerParams, filteredQuery, controllerResponse, body, headers, status_1, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            controllerParams = __assign({ req: req }, req.params, props);
                            if (props.query.length) {
                                filteredQuery = this.filterQuery(req.query, props.query);
                                controllerParams = __assign({}, filteredQuery, controllerParams);
                            }
                            if (['put', 'patch', 'post'].includes(props.method)) {
                                controllerParams.body = req.body || {};
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, props.controller(controllerParams)];
                        case 2:
                            controllerResponse = _a.sent();
                            if ((controllerResponse || {}).isHTTPResponse) {
                                body = controllerResponse.body, headers = controllerResponse.headers, status_1 = controllerResponse.status;
                                return [2, res.set(headers).status(status_1).json(body)];
                            }
                            if (!controllerResponse) {
                                return [2, res.status(204).send()];
                            }
                            return [2, res.status(200).json(controllerResponse)];
                        case 3:
                            e_1 = _a.sent();
                            next(e_1);
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            }); })();
        }; };
        this.prepareExpressMiddlewares = function (props) {
            var resolvedMiddlewares = _this.resolveMiddlewares(props.middlewares || []);
            return resolvedMiddlewares.map(function (middleware) {
                return function (req, res, next) {
                    var query = props.query ? _this.filterQuery(req.query, props.query) : {};
                    return middleware(__assign({}, query, req.params, { req: req,
                        res: res,
                        next: next }));
                };
            });
        };
        this.connectRouteToExpress = function (_a) {
            var props = _a.props, expressRouter = _a.expressRouter, basePath = _a.basePath;
            var controller = _this.prepareExpressFunction(props);
            var middlewares = _this.prepareExpressMiddlewares(props);
            var relativePath = url_1.default.resolve(basePath, props.path);
            expressRouter[props.method].apply(expressRouter, __spread([relativePath], middlewares, [controller]));
            console.info("Added route " + props.method.toUpperCase() + " " + relativePath);
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