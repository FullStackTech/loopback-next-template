import { Application } from '@loopback/core';
import { RestComponent, RestServer, RestBindings } from '@loopback/rest';
import { AuthenticationComponent, AuthenticationBindings } from '@loopback/authentication';
import { DefaultCrudRepository, DataSourceConstructor, juggler } from '@loopback/repository';

import { config } from './config';
import { datasources } from './datasources';

import { Sequence } from './sequence';

import { HealthController } from './health/health-controller';
import { HealthService } from './health/health-service';

import { AuthStrategyProvider } from './authentication/auth-strategy-provider';

class FullStackApplication extends Application {

    constructor() {
        super({
            components: [
                AuthenticationComponent,
                RestComponent
            ],
            rest: {
                port: process.env.PORT || 3000,
                sequence: Sequence
            }
        });

        this.bind('configuration').to(config[process.env.NODE_ENV]);
        this.bind('dataSources.database').to(new DataSourceConstructor('database', datasources[process.env.NODE_ENV]));

        this.controller(HealthController);

        this.bind(AuthenticationBindings.STRATEGY).toProvider(AuthStrategyProvider);

        this.bind('services.health').toClass(HealthService);
    }

}

async function main(): Promise<void> {
    const app = new FullStackApplication();
    await app.start();
    console.log('Service running: http://127.0.0.1:3000');
}

main().catch(err => {
    console.log('Cannot start the app.', err);
    process.exit(1);
});