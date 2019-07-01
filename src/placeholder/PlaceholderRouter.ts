import { injectable } from "tsyringe";
import { RouterBuilder } from "../router/RouterBuilder";

@injectable()
export class PlaceholderRouter{
    constructor() {}
    login = new RouterBuilder().path("/login").get(() => console.log("get called"));
}
