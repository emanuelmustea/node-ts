import { singleton } from "tsyringe";
import { ConfigService, IConfig } from "../config/ConfigService";
import { Router } from "./IRouterDecorators";

import { default as express, Express } from "express";
import { ErrorService } from "../error/ErrorService";
@singleton()
export class ExpressAdapter {
  private app: Express;
  private config: IConfig;
  private controllers: Router[];

  constructor(
    private configService: ConfigService,
    private errorService: ErrorService
  ) {
    this.config = this.configService.getConfig();
    this.app = express();
  }

  public addControllers(controllers: Router[]): void {
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

  private registerController(controller: any): void {
    const routerMetadata = this.getRouterMetadata(controller);
    if (!routerMetadata.isRestController) {
      throw new Error(
        `Skipped '${controller.name}'! Controllers that are not marked with the RestController decorator will be skipped`
      );
    }

    for (const method of controller) {
      console.log("we have method", method);
    }
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

  private getRouterMetadata(router: any): { [key: string]: any } {
    const metadataKeys = Reflect.getMetadataKeys(router);
    return metadataKeys.reduce(
      (metadata, metadataKey: string) => ({
        ...metadata,
        [metadataKey]: Reflect.getMetadata(metadataKey, router)
      }),
      {}
    );
  }
}
