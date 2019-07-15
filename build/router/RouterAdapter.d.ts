import { Express, Router } from "express";
export declare class RouterAdapter {
    constructor();
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
