import { HelloWorldController } from "./hello-world/HelloWorldController";

interface IRoute {
  basePath: string;
  router: any;
}

export const Routes: IRoute[] = [
  { basePath: "/", router: HelloWorldController }
];
