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

        buildRoute({basePath: "/", Router: PlaceholderRouter, app, expressRouter});

        app.use((_req, res)=> res.status(404).json({error:'not_found'}));
    }
}