//MODULE IMPORTS
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //this line is importing mongoose.
var passport = require('passport'); //this line is importing passport.
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//MODELS AND STRATEGIES
require("./models/userModel");
require("./models/botleModel");
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//DATABASE CONNECTION
mongoose.connect('mongodb://localhost/Bar');
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//ROUTES VARIABLES
var userRoutes = require('./routes/userRoutes');
var botleRoutes = require('./routes/botleRoutes');

//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//PORT VARIABLE
var app = express();
var port = process.env.PORT || 3000;
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//RENDERING ENGINE
app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//MIDDLEWARE
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});
//---------------------------------------------------------------------------------------------------------------------------------
//ROUTES VARIABLES


//---------------------------------//
//BASE ROUTE PATHS
app.use("/api/BotleUser", botleRoutes);
app.use("/api/Users", userRoutes);
app.use("/api/botle", botleRoutes);
app.use("/api/deleteBotle", botleRoutes);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//SERVER PORT
var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
