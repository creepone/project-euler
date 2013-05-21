var values = {
	"I": 1,
	"V": 5,
	"X": 10,
	"L": 50,
	"C": 100,
	"D": 500,
	"M": 1000
};

var romanToDecimal = function (roman) {
	var prev, sum = 0;
	for (var i = roman.length - 1; i >= 0; i--) {
		var current = roman[i];
		var value = values[current];
		
		if (prev && value < values[prev])
			sum -= value;
		else
			sum += value;
		
		prev = current;
	}
	return sum;
};

var decimalToRoman = function (decimal) {
	var res = "";
	while (decimal >= 1000) {
		res += "M";
		decimal -= 1000;
	}
	
	if (decimal >= 900) {
		res += "CM";
		decimal -= 900;
	}
	
	if (decimal >= 500) {
		res += "D";
		decimal -= 500;
	}
	
	if (decimal >= 400) { 
		res += "CD";
		decimal -= 400;
	}
	
	while (decimal >= 100) {
		res += "C";
		decimal -= 100;
	}
	
	if (decimal >= 90) {
		res += "XC";
		decimal -= 90;
	}
	
	if (decimal >= 50) {
		res += "L";
		decimal -= 50;
	}
	
	if (decimal >= 40) {
		res += "XL";
		decimal -= 40;
	}
	
	while (decimal >= 10) {
		res += "X";
		decimal -= 10;
	}
	
	switch (decimal) {
		case 9:
			res += "IX"; break;
		case 8:
			res += "VIII"; break;
		case 7:
			res += "VII"; break;
		case 6:
			res += "VI"; break;
		case 5:
			res += "V"; break;
		case 4:
			res += "IV"; break;
		case 3:
			res += "III"; break;
		case 2:
			res += "II"; break;
		case 1:
			res += "I"; break;
	}
	
	return res;
}

$(function () {
	$.ajax({
		url : "roman.txt",
		dataType: "text",
		success : function (data) {
			window.numbers = data.split("\n");
		}
	});
});

