function log(n) {
	return n.toString().length;
}

function trace(n) {
	return n.toString().split("").sort().join("");
}

var digits = 0, n = BigInteger(2), traces = {};

while(true) {
	var cube = n.pow(3),
		d = log(cube);
	
	if (d != digits) { 
		digits = d;
		traces = {};
	}
	
	var t = trace(cube);
	var similar = traces[t];
	
	if (!similar) {
		similar = [];
		traces[t] = similar;
	}
	
	similar.push(cube);
	
	if (similar.length == 5)
	{
		console.log(t);
		similar.forEach(function (s) { console.log(s.toString()); });
		break;
	}
	
	n = n.add(1);
}