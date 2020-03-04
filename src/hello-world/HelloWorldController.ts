import { injectable } from "tsyringe";
import {
  Path,
  RequestMethod,
  RestController
} from "../router/ControllerDecorators";
import { ErrorService } from "../error/ErrorService";

@injectable()
@RestController("/")
export class HelloWorldController {

  constructor(private errorService: ErrorService){}

  @Path("/")
  @RequestMethod("get")
  public printMessage() {
    return { message: "Hello World" };
  }

  @Path("/error")
  @RequestMethod("all")
  public throwError() {
    throw this.errorService.getErrorMessage(10)
  }

}
