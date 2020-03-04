import { singleton, container, InjectionToken } from "tsyringe";
import { ConfigService, IConfig } from "../config/ConfigService";
import { Controller, MethodMetadata } from "./RouterTypes";

import { default as express, Express, RequestHandler, NextFunction, Request, Response } from "express";
import { ErrorService } from "../error/ErrorService";

@singleton()
export class ExpressAdapter {
  private app: Express;
  private config: IConfig;
  private controllers: InjectionToken[];

  constructor(
    private configService: ConfigService,
    private errorService: ErrorService
  ) {
    this.config = this.configService.getConfig();
    this.app = express();
  }

  public addControllers(controllers: InjectionToken[]): void {
    this.controllers = controllers;
  }

  public build(): void {
    this.config = this.configService.getConfig();
    this.app = express();
    this.startApp();
    this.registerControllers();
    this.addErrorHandling();
  }

  private registerControllers() {
    for (const controller of this.controllers) {
      this.registerController(controller);
    }
  }

  private registerController(controller: any | InjectionToken): void {
    const controllerMetadata = this.getMetadataObject(controller);
    if (!controllerMetadata.isRestController) {
      throw new Error(
        `Skipped '${controller.name}'! Controllers not marked with the RestController decorator will throw an error`
      );
    }
    const controllerInstance: Controller = <Controller>container.resolve(controller);
    for (const methodName in controllerInstance) {
      const methodMetadata: MethodMetadata = this.getMetadataObject(controllerInstance, methodName);
      this.attachMethodToExpress(controllerInstance, methodName, methodMetadata);
    }
  }

  private attachMethodToExpress(controllerInstance: Controller, methodName: string, methodMetadata: MethodMetadata): void{
    const methodMetadataHasErrors = this.checkMethodMetadata(methodName, methodMetadata);
    if(methodMetadataHasErrors){
      return;
    }
    const controllerMethod = controllerInstance[methodName];
    const expressHandler = this.getExpressHandler(controllerInstance, controllerMethod);
    this.app[methodMetadata.requestMethod](methodMetadata.path, expressHandler);
    console.info(`Added route ${methodMetadata.requestMethod.toUpperCase()} ${methodMetadata.path}`);
  }

  private getExpressHandler(controllerInstance: Controller, controllerMethod: Controller[any]): RequestHandler{
    return (req: Request, res: Response, next: NextFunction): void => {
      const methodArguments = {
        body: {req},
        query: {req},
        path: {req}
      };
      try{
        (async () => {
          const responseObject = await controllerMethod.call(controllerInstance, methodArguments);
          res.status(205).json(responseObject);
        })();
      }
      catch(e){
        next(e);
      }

    }
  }

  private checkMethodMetadata(methodName: string, methodMetadata: MethodMetadata ): boolean{
    if(methodMetadata["design:type"] !== Function){
      return true;
    }
    if(!methodMetadata.path){
      throw new Error(`The method "${methodName}" doesn't have any path attached. Use the @Path decorator.`)
    }
    if(!methodMetadata.requestMethod){
      throw new Error(`The method "${methodName}" doesn't have any request method attached. Use the @RequestMethod decorator.`)
    }
    return false;
  }

  private startApp(): void {
    const { app } = this;
    app.listen(this.config.port, () =>
      console.info(`App started on port *:${this.config.port}`)
    );
  }

  private addErrorHandling(): void {
    this.app.use((err: any, _req: any, res: any, _next: any) => {
      const error = err.statusCode ? err : this.errorService.getErrorMessage(0);
      return res.status(error.statusCode).json(error);
    });
  }

  private getMetadataObject(...targetKeys: [Object, (string | symbol)?]): { [key: string]: any } {
    const metadataKeys = Reflect.getMetadataKeys(...targetKeys);
    return metadataKeys.reduce(
      (metadata, metadataKey: string) => ({
        ...metadata,
        [metadataKey]: Reflect.getMetadata(metadataKey, ...targetKeys)
      }),
      {}
    );
  }
}
