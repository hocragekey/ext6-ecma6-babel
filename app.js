'use strict';

var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    app = express();

app.use(express.static(__dirname + '/client'));
app.listen(3000);

app.get('/', function (req, res) {
    res.send(fs.readFileSync(__dirname + '/client/view/index.html').toString());
});
