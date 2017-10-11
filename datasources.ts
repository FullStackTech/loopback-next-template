export const datasources: DataSourceConfig = {
    local: {
        name: 'local',
        connector: 'loopback-connector-mysql',
        host: 'localhost',
        port: 3306,
        database: 'fullstack',
        user: 'root',
        password: 'root'
    },

    qa: {
        name: 'qa',
        connector: 'loopback-connector-mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },

    production: {
        name: 'production',
        connector: 'loopback-connector-mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
};

export interface DataSourceConfig {
    [datasource: string]: DataSourceDefinition
}

/**
 * The parameters required to define a MySQL datasource.
 * 
 * @export
 * @interface DataSourceDefinition
 */
export interface DataSourceDefinition {
    /**
    * The name of the connection (for programmatic reference).
    * 
    * @type {string}
    * @memberof DataSourceDefinition
    */
    name: string;
    /**
     * The identifying name of the legacy connector module used to interact with
     * the datasource.
     * (ex. "mysql", "mongodb", "db2", etc...) 
     * 
     * @type {string}
     * @memberof DataSourceDefinition
     */
    connector: string;
    /**
     * 
     * The accessible machine name, domain address or IP address of the
     * datasource.
     * @type {string}
     * @memberof DataSourceDefinition
     */
    host: string;
    /**
     * The port number on which the datasource is listening for connections.
     * 
     * @type {number}
     * @memberof DataSourceDefinition
     */
    port: number;
    // Allow arbitrary extension of object.
    [extras: string]: any;
}
