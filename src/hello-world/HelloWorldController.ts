import { injectable } from "tsyringe";
import { Path, RequestMethod } from "../router/RouterDecorators";

@injectable()
export class HelloWorldController {

  @Path("/")
  @RequestMethod("get")
  public printMessage() {
    return { message: "Hello World" };
  }
}
