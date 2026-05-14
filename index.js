require('dotenv').config();
// -------------------------
const http = require('http');
// -------------------------
const db = require('./src/db/models/index');
const app = require('./src/app');
// -------------------------

// Create server with HTTP module
const HOST_NAME = process.env.HOST_NAME || 'localhost';
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Check connection to DB
const dbCheck = async () => {
    try {
        await db.sequelize.authenticate();
        console.log(
            `Connection to DB <<<${process.env.DB_NAME.toUpperCase()}>>> has been established successfully`,
        );
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};

dbCheck();

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is running on http://${HOST_NAME}:${PORT}`);
});
