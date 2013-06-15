function radical(n) {
	var res = {};

	if (n == 1)
		return 1;

	for (var p = 2; p <= Math.sqrt(n); p++) {
		if (n % p == 0) {
			var a = 2;
			while (n % Math.pow(p, a) == 0)
				a++;
			a--;
			
			n /= Math.pow(p,a);
			return p * radical(n);
		}
	}

	return n;
}

function main() {
	
	var r = [];
	
	for (var n = 1; n <= 100000; n++) {
		r.push({ n: n, rad: radical(n) });
	}
	
	r.sort(function (a, b) {
		if (a.rad != b.rad)
			return a.rad - b.rad;
		
		return a.n - b.n;
	});
	
	console.log(r[9999]);
}

setTimeout(main, 2000);