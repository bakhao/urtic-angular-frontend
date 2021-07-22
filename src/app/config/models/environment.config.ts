export class EnvironmentConfig {

    private apiServer: string = "";
    private tenant: string = "";

    constructor() {
    }

    getApiServer(): string {
        return this.apiServer;
    }

    setApiServer(apiServer: string) {
        this.apiServer = apiServer;
    }

    getTenant(): string {
        return this.tenant;
    }

    setTenant(tenant: string) {
        this.tenant = tenant;
    }

}
