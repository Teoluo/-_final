var express = require('express')
var bodyParser = require('body-parser')
var fs = require("fs")
var controller = require('./controllers/controller.js')

var app = express()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

controller(app)

app.listen(8080)

console.log('listening to port 8080')