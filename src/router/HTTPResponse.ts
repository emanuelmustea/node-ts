
export interface IHTTPResponse{
  body?: any;
  headers?: { [key: string]: string };
  status?: number;
}

export class HTTPResponse implements IHTTPResponse{
  public isHTTPResponse: boolean = true;
  headers = {};
  status = 200;
  body = {};
  
  constructor(properties: IHTTPResponse){
    Object.assign(this, properties)
  }
}
