const config = {
    appConfig: {
        port: process.env.APP_PORT || 5000,
    },
    dbConfig: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 27017,
        dbName: process.env.DB_NAME || 'test',
    },
};

module.exports = config;