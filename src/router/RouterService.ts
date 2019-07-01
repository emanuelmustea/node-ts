import { injectable } from "tsyringe";
import { Router, Express } from "express";
import { RouterAdapter } from "./RouterAdapter";
import { PlaceholderRouter } from "../placeholder/PlaceholderRouter";
import { ErrorService } from "../error/ErrorService";

@injectable()
export class RouterService {
 
    constructor(private routerAdapter: RouterAdapter, private errorService: ErrorService) {}

    public configureRoutes = ({app, expressRouter}: {app: Express, expressRouter: Router}): void => {
        const { buildRoute } = this.routerAdapter;
        buildRoute({Router: PlaceholderRouter, app, expressRouter});

        app.use("*", (_req, res)=> res.json({error:true}));
    }
}