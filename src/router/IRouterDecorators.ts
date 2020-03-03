import { HTTPResponse } from "./HTTPResponse";

export type RequestMethods = "get" | "post" | "put" | "delete" | "patch";

export interface Router {
    [key: string]: ({body: string}) => void | object | HTTPResponse;
}