import { RequestMethods } from "./IRouterDecorators";

export const RestController = (path: string): ClassDecorator => (target: any) => {
  Reflect.defineMetadata("path", path, target);
  Reflect.defineMetadata("isRestController", true, target);
};

export const Path = (path: string): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
) => {
  Reflect.defineMetadata("path", path, target, propertyKey);
};

export const RequestMethod = (method: RequestMethods): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
) => {
  Reflect.defineMetadata("method", method, target, propertyKey);
};

export const Query = (...keys: string[]): MethodDecorator => (
  target: any,
  propertyKey: string | symbol,
) => {
  Reflect.defineMetadata("query", keys, target, propertyKey);
};
