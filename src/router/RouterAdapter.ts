import { Express, NextFunction, Request, Response, Router } from "express";
import { container, injectable } from "tsyringe";
import url from "url";
import { IMiddleware } from "../middlewares/IMiddleware";

@injectable()
export class RouterAdapter {
    public buildRoute = ({
        basePath,
        Router,
        app,
        expressRouter,
    }: {
        basePath: string,
        Router: any,
        app: Express,
        expressRouter: Router,
    }): void => {
        const routerInstance = container.resolve(Router) as Router;
        for (const propertyKey in routerInstance) {
            const controller = routerInstance[propertyKey];
            if (typeof controller !== "function") {
                continue;
            }
            console.log("controller is", propertyKey, controller);
            const metadataKeys = Reflect.getMetadataKeys(routerInstance, propertyKey);
            console.log("keys are", metadataKeys);
            const keys = ["path", "method", "query"];
            const metadataFilteredKeys = metadataKeys.filter((key) => keys.includes(key));
            const routeProps = metadataFilteredKeys.reduce((metadataValues, currentMetadataKey) => {
                const keyValue = Reflect.getMetadata(currentMetadataKey, routerInstance, propertyKey);
                return {...metadataValues, [currentMetadataKey]: keyValue};
            }, {});
            // console.log("values", getValues);
            this.connectRouteToExpress({
                basePath,
                expressRouter,
                props: routeProps,
            });
        }
        app.use("/", expressRouter);
    }

    private filterQuery = (query: any, keys: string[]) => keys.reduce((queryParams: object, param: string) => ({
        ...queryParams,
        [param]: query[param],
    }), {})
    private resolveMiddlewares = (middlewares: IMiddleware[]) => {
      return middlewares.map((middleware: any) => (container.resolve(middleware) as IMiddleware).middleware);
    }
    private prepareExpressFunction = (props: any): any => (req: Request, res: Response, next: NextFunction): void => {
        (async () => {
            let controllerParams = {
                req,
                ...req.params,
                ...props,
            };
            if (props.query && props.query.length) {
              const filteredQuery = this.filterQuery(req.query, props.query);
              controllerParams = {
                ...filteredQuery,
                ...controllerParams,
              };
            }
            if (["put", "patch", "post"].includes(props.method)) {
                controllerParams.body = req.body || {};
            }
            try {
                const controllerResponse = await props.controller(controllerParams);
                if ((controllerResponse || {}).isHTTPResponse) {
                    const {body, headers, status} = controllerResponse;
                    return res.set(headers).status(status).json(body);
                }
                if (!controllerResponse) {
                    return res.status(204).send();
                }
                return res.status(200).json(controllerResponse);
            } catch (e) {
                next(e);
            }
        })();
    }
    private prepareExpressMiddlewares = (props: any) => {
      const resolvedMiddlewares = this.resolveMiddlewares(props.middlewares || []);
      return resolvedMiddlewares.map(
          (middleware: any) =>
          (req: Request, res: Response, next: NextFunction) => {
            const query = props.query ? this.filterQuery(req.query, props.query) : {};
            return middleware({
              ...query,
              ...req.params,
                next,
                req,
                res,
            });
          },
      );
    }

    private connectRouteToExpress = ({
        props,
        expressRouter,
        basePath,
    }: {
        props: any,
        expressRouter: Router,
        basePath: string,
    }) => {
        const controller = this.prepareExpressFunction(props);
        const middlewares = this.prepareExpressMiddlewares(props);
        const relativePath = url.resolve(basePath, props.path);

        expressRouter[props.method](relativePath, ...middlewares, controller);
        console.info(`Added route ${props.method.toUpperCase()} ${relativePath}`);
    }
}
