import { injectable } from "tsyringe";

@injectable()
export class ErrorService {
    getError(code: number){
        return {code};
    }
}