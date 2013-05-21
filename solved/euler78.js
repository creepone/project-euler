var cache = {
	0: BigInteger(1),
	1: BigInteger(1)
};

function p(n) {
	if (n in cache)
		return cache[n];
		
	var res = BigInteger(0), 
		k = 1;
	
	while (true) {
		var changed = false,
			fn = (k % 2 == 0) ? "subtract" : "add",
			m = k * (3 * k - 1) / 2;

		if (m <= n) {
			res = res[fn](p(n - m));
			changed = true;
		}
		
		// case -k
		k = -k;
		m = k * (3 * k - 1) / 2;
		
		if (m <= n) {
			res = res[fn](p(n - m));
			changed = true;
		}
		
		if (!changed)
			break;
		k = -k;
		k++;
	}

	cache[n] = res;
	return res;
}

/*function p(n, k) {
	if (n == 0)
		return BigInteger(1);
	if (typeof k == "undefined" || k > n)
		return p(n, n);
		
	if (cache[n] && typeof cache[n][k] != "undefined")
		return cache[n][k];
		
	var res = BigInteger(0);
	for (var i = 1; i <= k; i++) {
		res = res.add(p(n - i, i));
	}
	
	cache[n] = cache[n] || {};
	cache[n][k] = res;
	return res;
}*/

setTimeout(function () {

var number = 1, milion = BigInteger(1000000);
while (true) {
	number++;
	
	var pp = p(number);
	if (pp.remainder(milion).isZero()) {
		console.log("result = " + number);
		break;
	}
	
	if (number % 1000 == 0)
		console.log(number + ": " + pp.toString());
}

}, 2000);