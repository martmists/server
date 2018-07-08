module.exports = {
    type: 'postgres',
    host: process.env.SAYONIKA_DB_HOST || 'localhost',
    port: process.env.SAYONIKA_DB_PORT || 5432,
    username: process.env.SAYONIKA_DB_USERNAME || 'postgres',
    password: process.env.SAYONIKA_DB_PASSWORD || 'postgres',
    database: process.env.SAYONIKA_DB_NAME || 'postgres',
    synchronize: process.env.NODE_ENV !== 'production',
    entities: [
        'src/models/db/*.ts'
    ]
};
