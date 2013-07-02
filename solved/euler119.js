function test(b, a) {
	var digitSum = b.toString().split("").map(function(a) { return +a; }).reduce(function (a,b) {return a + b;}, 0);
	return digitSum == a;
}

function main() {
	
	var bound = BigInteger(2).pow(50);
	var logBound = 50 * Math.log(2);
	
	var res = [];
	var counter = 0;
	
	for (var e = 3; e <= 50; e++) {
		for (var a = 2; e * Math.log(a) <= logBound; a++) {
			var n = BigInteger(a).pow(e);
			if (test(n, a)) {
				res.push(n);
				counter++;
			}
		}
	}
	
	res.sort(function (a,b) { return a.compare(b); });
	console.log(res.map(function (a) { return a.toString(); }));
}

setTimeout(main, 2000);