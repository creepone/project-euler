function phi(n) {
	var comp = decompose(n);

	var res = 1;
	Object.keys(comp).forEach(function (p) {
		var a = comp[p];
		res *= (Math.pow(p, a) - Math.pow(p, a - 1));
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

function arePermutations(a, b) {
	var d1 = JSON.stringify(a.toString().split("").sort());
	var d2 = JSON.stringify(b.toString().split("").sort());
	return d1 == d2;
}


setTimeout(function () {
	var min = 10000, N = 0;
	for (var n = 2; n < 10000000; n++) {
		if (n % 1000 == 0)
			console.log(n);
		
		var phiN = phi(n);
		
		if (!arePermutations(n, phiN))
			continue;
		
		var cur = n / phiN;
		if (cur < min) {
			min = cur;
			N = n;
		}
	}
	
	console.log("result = " + N);
}, 2000)