// setting up app/server
var express = require('express');
var calc = require('./calculatorApp/Calculator_2');
var weather = require('./weatherApp/Weather_2');
var home = require('./home_2');
var bodyParser= require("body-parser");


var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// listen for http request from port 8080
app.listen(8080, function(){
	console.log('Server Started...');
});

// get request for calculator
app.get('/calc', function(req, resp){
	resp.send(calc.render());
});

// get request for calculator
app.get('/fact', function(req,resp){
  if (parseFloat(req.query.num) >= 0 & Number.isInteger(parseFloat(req.query.num))){
  	resp.send(calc.computeFactorial(req.query.num));
  }
  else {
    resp.send("Enter integer greater or equal to zero.");
  }
});

// get request for calculator
app.get('/sum', function(req, resp){
	if (parseFloat(req.query.num) >= 0 & Number.isInteger(parseFloat(req.query.num))){
		resp.send(calc.computeSummation(req.query.num));
		}
	else {
		resp.send("Enter integer greater or equal to zero.");
	}
});

// get request for Weather page
app.get('/weather', function(req, resp){
	resp.send(weather.render());
});

// get request for Weather calculation
var w = new weather.Weather();
app.post('/getWeather', function(req, resp){
	w.once('connection', function(msg){
		resp.send(msg);
	});
	w.getWeather(req.body['zip']);
});

// get request for home page
app.get('/home', function(req, resp){
	resp.send(home.render());
});

// sending html file to client
app.get("/", function(req,res){
  res.sendFile(__dirname + '/' +'index.html');
});

// catch favicon.ico error
app.get('/favicon.ico', (req, res) => res.status(204));
