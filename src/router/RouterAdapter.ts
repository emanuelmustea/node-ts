import { Express, Router, Request, Response, NextFunction } from "express";
import { container, injectable } from "tsyringe";
import url from "url"
import { MiddlewaresService } from "../middlewares/MiddlewaresService";

@injectable()
export class RouterAdapter {
    constructor(private middlewaresService: MiddlewaresService) {}
    public buildRoute = ({
        basePath,
        Router,
        app,
        expressRouter
    }: {
        basePath: string,
        Router: any,
        app: Express,
        expressRouter: Router
    }): void => {
        const routerInstance = container.resolve(Router) as Router;
        for (const route in routerInstance) {
            const buildFunction = routerInstance[route].build;
            if (typeof buildFunction !== "function") {
                continue;
            }
            const routeProps = buildFunction();
            this.connectRouteToExpress({
                props: routeProps,
                expressRouter,
                basePath
            })
        }
        app.use("/", expressRouter);
    }
    private filterQuery = (query: any, keys: string[]) => keys.reduce((queryParams: Object, param: string) => ({
        ...queryParams,
        [param]: query[param]
    }), {});
    private resolveMiddlewares = (middlewares:any[]) => {
      return middlewares.map(middleware => this.middlewaresService[middleware])
    }
    private prepareExpressFunction = (props: any): any => (req: Request, res: Response, next: NextFunction): void => {
        (async () => {
            const controllerParams = {
                req,
                ...req.params,
                ...props
            };
            if (props.query.length) {
                controllerParams.query = this.filterQuery(req.query, props.query);
            }
            if (['put', 'patch', 'post'].includes(props.method)) {
                controllerParams.body = req.body || {};
            }
            try {
                const controllerResponse = await props.controller(controllerParams);
                console.log("response is", controllerResponse);
                if (controllerResponse.isHTTPResponse) {
                    console.log("requested is HTTP");
                }
                if (!controllerResponse) {
                    res.status(204).send();
                }
                res.status(200).json(controllerResponse);
            } catch (e) {
                next(e);
            }
        })();
    }
    private prepareExpressMiddlewares = (props: any) =>{
      const resolvedMiddlewares = this.resolveMiddlewares(props.middlewares || []);
      return resolvedMiddlewares.map(
          middleware =>
          (req: Request, res: Response, next: NextFunction) =>{
            const query = props.query ? this.filterQuery(req.query, props.query) : {};
            return middleware({
                req,
                res,
                next,
                ...query,
                ...req.params
            })
          }
      )
    }

    private connectRouteToExpress = ({
        props,
        expressRouter,
        basePath
    }: {
        props: any,
        expressRouter: Router,
        basePath: string
    }) => {
        const controller = this.prepareExpressFunction(props);
        const middlewares = this.prepareExpressMiddlewares(props);
        const relativePath = url.resolve(basePath, props.path);
        
        expressRouter[props.method](relativePath, ...middlewares, controller);
        console.info(`Added route ${props.method.toUpperCase()} ${relativePath}`);
    }
}
