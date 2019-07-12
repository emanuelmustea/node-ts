export declare class RouterBuilder {
    state: any;
    get: any;
    post: any;
    put: any;
    patch: any;
    delete: any;
    constructor(state?: any);
    path: (path: String) => RouterBuilder;
    build: () => any;
    query: (...keys: string[]) => RouterBuilder;
    middlewares: (...middlewares: any[]) => RouterBuilder;
}
