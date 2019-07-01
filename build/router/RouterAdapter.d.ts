import { Router, Express } from "express";
export declare class RouterAdapter {
    constructor();
    private connectRouteToExpress;
    buildRoute: ({ Router, app, expressRouter }: {
        Router: any;
        app: Express;
        expressRouter: Router;
    }) => void;
}
