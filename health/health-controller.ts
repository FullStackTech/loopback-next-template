import { inject } from '@loopback/core';
import { HttpErrors, api } from '@loopback/rest';
import { authenticate } from '@loopback/authentication';

import { HealthControllerApiDefinition } from './health-controller.api';

import { HealthService } from './health-service';

import { ServiceResult } from '../common/service-result';

@api(HealthControllerApiDefinition)
export class HealthController {

    constructor(
        @inject('services.health') private healthService: HealthService
    ) { }

    @authenticate('Anonymous')
    async checkHealth(): Promise<ServiceResult | HttpErrors.HttpError> {
        return await this.healthService.checkHealth();
    }
}
