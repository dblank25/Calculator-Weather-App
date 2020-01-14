var fs = require('fs');
var content = fs.readFileSync('calculatorApp/Calculator.html');

function render(){
	return content;
}

function computeFactorial(n){
	var fact = 1;
	for (var i = n; i > 1; i--) {
	 fact = fact*i;
	}
	return "Fact value is " + fact;
	}

function computeSummation(n){
	var sum = 0;
	for (var i = 1; i <= n; i++) {
	 sum = sum+i;
	}
	return "Summation value is " + sum;
	}


exports.render = render;
exports.computeFactorial = computeFactorial;
exports.computeSummation= computeSummation;
