var cache = {};

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

function multiply(a,b) {
	var res = $.extend({}, a);
	
	Object.keys(b).forEach(function (p) {
		if (p in res)
			res[p] += b[p];
		else
			res[p] = b[p];
	});
	
	return res;
}

function divide(a, b) {
	var res = $.extend({}, a);
	
	Object.keys(b).forEach(function (p) {
		res[p] -= b[p];
	});
	
	return res;
}

function isSquareFree(n, k) {
	var res = {};
	for (var num = n; num >= n - k + 1; num--)
		res = multiply(res, cache[num]);
	for (var den = 1; den <= k; den++)
		res = divide(res, cache[den]);

	var hasSquare = false;
	Object.keys(res).forEach(function (p) {
		if (res[p] >= 2)
			hasSquare = true;
	});
	return !hasSquare;
}

function choose(n, k) {
	var res = BigInteger.ONE;
	for (var num = n; num >= n - k + 1; num--)
		res = res.multiply(num);
	for (var den = 1; den <= k; den++)
		res = res.quotient(den);
	return res;
}

function main() {
	for (var i = 1; i <= 50; i++)
		cache[i] = decompose(i);
	
	var combs = [];
	
	for (var n = 1; n <= 50; n++)
	for (var k = 0; k <= Math.ceil(n / 2); k++) {
		if (isSquareFree(n, k))
			combs.push({ n: n, k: k });
	}
	
	var vals = [];
	
	combs.forEach(function (comb) {
		var c = choose(comb.n, comb.k).toString();
		if (vals.indexOf(c) < 0)
			vals.push(c);
	});
	
	var res = BigInteger.ZERO;
	
	vals.forEach(function (val) {
		res = res.add(BigInteger(val));
	});
	
	console.log(res.toString());
}

setTimeout(main, 2000);