import {injectable} from "tsyringe";

export interface IntConfig {
    port: number;
}

@injectable()
export class ConfigService {
    constructor() {}
    public getConfig(): IntConfig {
        return {
            port: 3000
        }
    }
}
