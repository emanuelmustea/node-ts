import { Router, Express } from "express";
import { injectable, container } from "tsyringe";
import { RouterBuilder } from "./RouterBuilder";

@injectable()
export class RouterAdapter {
    constructor( ) { }
    private connectRouteToExpress = ({props, app, expressRouter}: {props: any, app: Express, expressRouter: Router}) => {
        console.log("Added route", props.path);
        expressRouter[props.method](props.path, props.controller);
        console.log("RECIEVED PROPS", props, app, expressRouter);
    }
    public buildRoute = ({Router, app, expressRouter}: {Router: any, app: Express, expressRouter: Router} ) : void => {
       const routerInstance = container.resolve(Router) as Router;
       console.log("ROUTER INSTANCE IS", Router);
       for(let route in routerInstance){
           console.log("ROUTER IS", route)
           const buildFunction = routerInstance[route].build;
           if(typeof buildFunction !== 'function'){
               continue;
           }
           const routeProps = buildFunction();
           this.connectRouteToExpress({props: routeProps, app, expressRouter})
       }
       app.use("/", expressRouter);

    }
}