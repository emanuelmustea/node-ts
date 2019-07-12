import { injectable } from "tsyringe";
import { RouterBuilder } from "../router/RouterBuilder";



@injectable()
export class PlaceholderRouter {
    constructor() { }
    login = new RouterBuilder()
        .query("count")
        .middlewares("print")
        .path("/login")
        .get(({count} : any) => {
            return {got_called: count};
        });
}
