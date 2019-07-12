import { injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";


@injectable()
export class MiddlewaresService{
  constructor( ){}

  print = (req: Request, _res: Response, next: NextFunction) => {
    if(req.query.test){
      console.log(req.query.test);
      return next();
    }
  }

}
