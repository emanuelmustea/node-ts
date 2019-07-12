export interface IConfig {
    port: number;
}
export declare class ConfigService {
    private config;
    constructor();
    getConfig(): IConfig;
}
