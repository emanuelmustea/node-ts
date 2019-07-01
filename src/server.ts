import "reflect-metadata";
import { Express, default as express, Router } from 'express';
import { ConfigService, IntConfig } from './config/ConfigService';
import { container, injectable } from 'tsyringe';
import { RouterService } from "./router/RouterService";

@injectable()
class Server {
    app: Express;
    config: IntConfig;

    constructor(
        private configService: ConfigService,
        private router: RouterService
    ) {
        this.config = this.configService.getConfig();
        this.app = express();
        this.startApp();
        this.router.configureRoutes({app: this.app, expressRouter: Router()});
     }

    private startApp = () : void => {
        const { app } = this;
        app.listen(this.config.port, () => console.log(`App started on port *:${this.config.port}`));
    }
    private configRoutes = () : void => {
       
    }
}
container.resolve(Server);