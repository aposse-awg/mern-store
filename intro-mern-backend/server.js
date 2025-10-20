require('dotenv').config();
const config = require('./config');
const { appConfig, dbConfig } = config;
const connectDB = require('./db/mongodb');
const app = require('./app');




async function initApp(appConfig, dbConfig) {
    try {
        await connectDB(dbConfig);
        app.listen(appConfig.port, () => {
            console.log(`Server running on port ${appConfig.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
initApp(appConfig, dbConfig);



