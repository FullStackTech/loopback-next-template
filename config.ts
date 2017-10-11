export const config: ApplicationConfiguration = {
    local: {
        authentication: {
            jwtSecret: 'shh',
            jwtIssuer: 'auth.fullstack.technology',
            jwtAudience: 'fullstack.technology'
        }
    },

    qa: {
        authentication: {
            jwtSecret: process.env.JWT_SECRET,
            jwtIssuer: process.env.JWT_ISSUER,
            jwtAudience: process.env.JWT_AUDIENCE
        }
    },

    production: {
        authentication: {
            jwtSecret: process.env.JWT_SECRET,
            jwtIssuer: process.env.JWT_ISSUER,
            jwtAudience: process.env.JWT_AUDIENCE
        }
    }
};


export interface ApplicationConfiguration {
    [configuration: string]: ApplicationConfigurationDefinition
}

export interface ApplicationConfigurationDefinition {
    authentication: AuthenticationConfigurationDefinition;
}

export interface AuthenticationConfigurationDefinition {
    jwtSecret: string;
    jwtIssuer: string;
    jwtAudience: string;
}