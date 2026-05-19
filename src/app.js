const express = require('express');
// -------------------------------
const router = require('./routers/index');
// -------------------------------

const app = express();
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('This is Inter Shop home page');
});

module.exports = app;
