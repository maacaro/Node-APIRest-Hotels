const express = require('express')
const app = express();
const data = require('../data/data.json');


app.get('/', (req, res) => 
    res.status(200).type('application/json').json(data));

module.exports = app;
