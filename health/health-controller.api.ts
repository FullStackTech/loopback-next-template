import { OpenApiSpec } from '@loopback/openapi-spec';

export const HealthControllerApiDefinition = {
    basePath: '/',
    paths: {
        '/health': {
            get: {
                'x-operation-name': 'checkHealth',
                parameters: [],
                responses: {
                    200: {
                        examples: {
                            "application/json": {
                                success: true,
                                result: {
                                    healthy: true
                                }
                            }
                        }
                    },
                },
            },
        }
    }
};
