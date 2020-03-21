import { singleton } from "tsyringe";

export interface IConfig {
    port: number;
    environment: string;
    saltRounds: number;
    privateKey: string;
}

@singleton()
export class ConfigService {
    private config: IConfig;

    constructor() {
        this.config = {
            port: 3000,
            environment: "DEVELOPMENT",
            saltRounds: 10,
            privateKey: "fake key"
        };
    }
    public getConfig(): IConfig {
        return this.config;
    }
}
