/* eslint-disable */
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(__dirname + '/dist/'));

app.get(/.*/, function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);
