const express = require('express');
// -------------------------------
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is Inter Shop home page');
});

module.exports = app;
