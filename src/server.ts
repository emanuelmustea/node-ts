import "reflect-metadata";
import { HelloWorldController } from "./hello-world/HelloWorldController";
import { ExpressAdapter } from "./router/ExpressAdapter";
import { Server } from "./server/Server";

@Server({
  adapter: ExpressAdapter,
  controllers: [HelloWorldController],
  models: []
})
export declare class AppServer {}
