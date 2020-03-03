import { injectable } from "tsyringe";
import {
  Path,
  RequestMethod,
  RestController
} from "../router/RouterDecorators";

@injectable()
@RestController("/")
export class HelloWorldController {
  @Path("/")
  @RequestMethod("get")
  public printMessage() {
    return { message: "Hello World" };
  }
}
