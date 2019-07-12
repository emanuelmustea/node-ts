import { Express, Router } from "express";
import { MiddlewaresService } from "../middlewares/MiddlewaresService";
export declare class RouterAdapter {
    private middlewaresService;
    constructor(middlewaresService: MiddlewaresService);
    buildRoute: ({ basePath, Router, app, expressRouter }: {
        basePath: string;
        Router: any;
        app: Express;
        expressRouter: Router;
    }) => void;
    private filterQuery;
    private resolveMiddlewares;
    private prepareExpressFunction;
    private prepareExpressMiddlewares;
    private connectRouteToExpress;
}
