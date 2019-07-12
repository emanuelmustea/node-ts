import { injectable } from "tsyringe";

@injectable()
export class ErrorService {
    public getError(code: number) {
        return {code};
    }
}
