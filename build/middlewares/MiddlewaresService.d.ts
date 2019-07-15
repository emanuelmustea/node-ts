import { NextFunction, Request, Response } from "express";
export declare class MiddlewaresService {
    constructor();
    middleware: (req: Request, _res: Response, next: NextFunction) => void;
}
