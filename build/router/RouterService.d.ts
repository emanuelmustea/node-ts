import { Router, Express } from "express";
import { RouterAdapter } from "./RouterAdapter";
import { ErrorService } from "../error/ErrorService";
export declare class RouterService {
    private routerAdapter;
    private errorService;
    constructor(routerAdapter: RouterAdapter, errorService: ErrorService);
    configureRoutes: ({ app, expressRouter }: {
        app: Express;
        expressRouter: Router;
    }) => void;
}
