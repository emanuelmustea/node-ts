
export class RouterBuilder {
    public state: any;
    public get: any;
    public post: any;
    public put: any;
    public patch: any;
    public delete: any;
    constructor(state: any = {}) {
        this.state = state;
        const methods = ["get", "post", "put", "patch", "delete"];
        for (const method of methods) {
            this[method] = (controller?: (any)) => {
                if (controller) {
                    return new RouterBuilder({...this.state, method, controller});
                } else {
                    return new RouterBuilder({...this.state});
                }
            };
        }
    }
    public path = (path: string) => {
        return new RouterBuilder({...this.state, path});
    }
    public build = () => {
        return this.state;
    }
    public query = (...keys: string[]) => {
        return new RouterBuilder({ ...this.state, query : [...(this.state.query || []), ...keys] });
    }
    public middlewares = (...middlewares: any[]) => {
      return new RouterBuilder({...this.state, middlewares});
    }
}
