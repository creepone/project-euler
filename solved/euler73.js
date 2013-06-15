var gcd = function (a,b) {
	if (a < b)
		return gcd(b,a);
	if (a==b)
		return a;
	if (b==1)
		return 1;
	if (b==0)
		return a;

	return gcd(a % b, b);
}

function main() {

	var res = 0;
	
	for (var d = 4; d <= 12000; d++) {		
		var upper, lower;
		
		if (d % 2 == 0) {
			upper = d / 2 - 1;
		}
		else {
			upper = Math.floor(d / 2);
		}
		
		if (d % 3 == 0) {
			lower = d / 3 + 1;
		}
		else {
			lower = Math.ceil(d / 3);
		}
		
		for (var n = lower; n <= upper; n++) {
			if (gcd(n, d) == 1)
				res++;
		}
	}

	console.log("res = " + res);
}

setTimeout(main, 2000);