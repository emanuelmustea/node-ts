"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var ErrorMessage_1 = require("./ErrorMessage");
var ErrorService = (function () {
    function ErrorService() {
    }
    ErrorService.prototype.getErrorMessage = function (code) {
        if (code === void 0) { code = 0; }
        var allMessages = this.getMessage();
        var message = allMessages.find(function (m) { return m.code === code; }) || allMessages[0];
        return new ErrorMessage_1.ErrorMessage(message);
    };
    ErrorService.prototype.getMessage = function () {
        return [
            {
                statusCode: 500,
                code: 0,
                message: "Server Error",
                detailedMessage: "Something's broken on the server side"
            },
            {
                statusCode: 404,
                code: 10,
                message: "The requested resource was not found",
                detailedMessage: "The requested resource was not found in the database. Please check the request parameters"
            },
            {
                statusCode: 401,
                code: 20,
                message: "Not enough permissions",
                detailedMessage: "You don't ahve enough permissions to access the requested resource"
            }
        ];
    };
    ErrorService = __decorate([
        tsyringe_1.injectable()
    ], ErrorService);
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=ErrorService.js.map