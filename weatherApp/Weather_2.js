var fs = require('fs');
var content = fs.readFileSync('weatherApp/Weather.html');
var keys = JSON.parse(fs.readFileSync('weatherApp/keys.txt'));
const request = require('request');
var EventEmitter = require('events').EventEmitter;

function render(){
	return content;
}


class Weather extends EventEmitter{constructor(){super();}

	getWeather(req){

		var clientID = keys['clientID'];
		var secret_key = keys['secret_key'];


		var self = this;
		var URL = "https://api.aerisapi.com/forecasts/" + req + "?&format=json&filter=day&limit=7&fields=periods.dateTimeISO,periods.maxTempF,periods.minTempF,periods.weather&client_id=" + clientID + "&client_secret="+ secret_key;


		console.log('Zip Code:' + req);
		if (req != undefined) {
			// request to aerisapi
			request(URL, { json: true }, (err, res, body) => {
				console.log('Sucessful Connection:'+ body.success);
				if (body.success == true){
					if (err) { return console.log(err); }
					var json = body.response[0].periods;
					// Adding Table Headers
					var myTable = '<tr><td>Date</td><td>MaxTemp</td><td>MinTemp</td><td>Weather</td></tr>';
					for (var i = 0; i < json.length; i++) {
						var date = json[i].dateTimeISO.split("T")[0]
						var maxTemp = json[i].maxTempF
						var minTemp = json[i].minTempF
						var weather = json[i].weather
						myTable += '<tr><td>'+ date +'</td><td>'+ maxTemp +'</td><td>'+ minTemp +'</td><td>'+ weather +'</td></tr>';
					}
					self.emit('connection', myTable);
				}
				else {
					console.log('Error: Please Enter Valid Zip Code')
					self.emit('connection', 'Error: Please Enter Valid Zip Code');
				}
			});
		}
		else {
			console.log('Error: Please Enter Valid Zip Code')
			self.emit('connection', 'Error: Please Enter Valid Zip Code');
		}
	}
}

exports.render = render;
exports.Weather = Weather;
