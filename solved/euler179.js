function tau(n) {
	var comp = decompose(n);

	var res = 1;
	Object.keys(comp).forEach(function (p) {
		var a = comp[p];
		res *= (a + 1);
	});

	return res;
}

function decompose(n) {
	var res = {};

	if (n == 1)
		return {};

	for (var p = 2; p <= Math.sqrt(n); p++) {
		if (n % p == 0) {
			var a = 2;
			while (n % Math.pow(p, a) == 0)
				a++;
			a--;

			res[p] = a;

			n /= Math.pow(p,a);
			return $.extend(res, decompose(n));
		}
	}

	res[n] = 1;
	return res;
}

function main() {
	var prev = 0, res = 0;
	
	for (var n = 2; n < 10000000; n++) {
		if (n % 10000 == 0)
			console.log(n);
	
		var t = tau(n);
		if (t == prev)
			res++;
			
		prev = t;
	}
	
	console.log("res = " + res);
}

setTimeout(main, 2000);