var fs = require('fs');
var content = fs.readFileSync('home.html');

function render(){
	return content;
}

exports.render = render
