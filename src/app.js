const express = require('express');
// -------------------------------
const router = require('./routers/index');
const { errorHandlers } = require('./middleware/index');
// -------------------------------

const app = express();
app.use(express.json());

app.use('/api', router);

const { errorHandler, validationErrorHandler } = errorHandlers;

app.use(validationErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('This is Inter Shop home page');
});

module.exports = app;
