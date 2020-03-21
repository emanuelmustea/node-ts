import { app } from "firebase-admin";
import "reflect-metadata";
import { container, injectable } from "tsyringe";
import { AuthenticationController } from "./authentication/AuthenticationController";
import { FirebaseService } from "./firebase/FirebaseService";
import { ExpressAdapter } from "./router/ExpressAdapter";
import { Server } from "./server/Server";
import { UserController } from "./user/UserController";

@Server({
    adapter: ExpressAdapter,
    controllers: [UserController, AuthenticationController]
})
@injectable()
export class AppServer {
    constructor(protected firebaseService: FirebaseService, private expressAdapter: ExpressAdapter) {}

    public getApp() {
        return this.expressAdapter.ejectRouter();
    }
}

export const App = container.resolve(AppServer).getApp();
