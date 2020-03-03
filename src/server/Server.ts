import { container } from "tsyringe";

export interface RouterAdapter {
    build: (_routers: any[]) => void;
    getInstance: () => any;
}

export abstract class SocketEngine {
    build(): void {}
}

export interface Server {
    routers: any[];
    models: any[];
    socket: typeof SocketEngine;
    adapter: any;
}

export const Server = (metadata: Server): ClassDecorator => {
    return (target: any): void => {
        const adapterInstance = container.resolve(metadata.adapter);
        console.log('used class decoartor for Server', target, "with metadata", metadata);
    };
} 