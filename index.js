require('dotenv').config();
// -------------------------
const http = require('http');
// -------------------------
const app = require('./src/app');
// -------------------------
const HOST_NAME = process.env.HOST_NAME || 'localhost';
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () => {
    console.log(`Server is running on http://${HOST_NAME}:${PORT}`);
});
