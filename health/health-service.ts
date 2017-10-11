import { ServiceResult } from '../common/service-result';
import { CheckHealthResponse } from './check-health-response';

export class HealthService {

    constructor() { }

    async checkHealth(): Promise<ServiceResult> {
        return new ServiceResult(true, 0, new CheckHealthResponse(true));
    }

}