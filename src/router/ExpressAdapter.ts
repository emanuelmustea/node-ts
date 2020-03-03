import { singleton } from "tsyringe";
import { Router } from "./IRouterDecorators";

@singleton()
export class ExpressAdapter {
    build(routers: Router[]){
        console.log("GOT ROUTERS", routers);
    }
}