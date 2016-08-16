//Made By bene 2016.8.11
var express = require('express');

var mongoose = require('mongoose');

var app = express();

var bodyParser = require('body-parser');

var randomString = require('randomstring');

app.use(bodyParser.urlencoded({
    extended : true
}));

var server = require('http').Server(app);

var https = require('https');

var schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/kkobugi", function (err) {
    if(err){
        console.log("MongoDB Error!");

        throw err;
    }
});


var userSchema = new schema({
    _id : {
        type : String
    }
});

var User = mongoose.model('user', userSchema);

server.listen(8080);

console.log("Server Running At Port 8080");

require('./route/oauth')(app, User), randomString;
