const localConfig = require('./config.json');

module.exports = {
    type: 'postgres',
    host: localConfig.dbHost || process.env.SAYONIKA_DB_HOST || 'localhost',
    port: localConfig.dbPort || process.env.SAYONIKA_DB_PORT || 5432,
    username: localConfig.dbUser.username || process.env.SAYONIKA_DB_USERNAME || 'postgres',
    password: localConfig.dbUser.password || process.env.SAYONIKA_DB_PASSWORD || 'postgres',
    database: localConfig.dbName || process.env.SAYONIKA_DB_NAME || 'postgres',
    synchronize: process.env.NODE_ENV !== 'production',
    entities: [
        'src/models/db/*.ts'
    ]
};
