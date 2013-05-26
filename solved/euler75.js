// executes given callback for all pairs of a, b where
// a < b, a=b (mod 2), ab=x^2
function factorize(x, callback) {
	var sq = x * x;
	for (var a = 1; a < x; a++) {
		if (sq % a != 0) 
			continue;
			
		var b = sq / a;
		if ((a-b) % 2 != 0)
			continue;
		
		callback(a, b);
	}
}

var solutions = {};
var upperBound = 1500000, xBound = 440000;

setTimeout(function () {

for (var x = 1; x <= xBound; x++) {
	
	if (x % 1000 == 0)
		console.log("calculating " + x);
	
	factorize(x, function (a, b) {
		var y = (b - a) / 2;
		var z = (b + a) / 2;
		
		if (x > y)
			return;
		
		var L = x + y + z;
		if (L > upperBound)
			return;
		
		var s = solutions[L] || 0;
		
		s++;
		solutions[L] = s;
	});
}

var res = 0;
for (var L = 1; L <= upperBound; L++) {
	if (solutions[L] === 1)
		res++;
}
console.log("result = " + res);

}, 2000);