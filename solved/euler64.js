var sequence = function (n, bound) {
	var sqrt = Math.floor(Math.sqrt(n));
	if (sqrt * sqrt == n)
		return;
	
	var result = [sqrt], a = 1, b = sqrt;
	var coeffs = [], period;
	
	for (var i = 0; i < bound; i++) {
		var res = iteration(a,b,n);
		
		result.push(res.result);
		a = res.a;
		b = res.b;
		
		var found = null;
		coeffs.forEach(function (coeff, index) {
			if (coeff.a == res.a && coeff.b == res.b)
				found = index;
		});
		
		if (found)
		{
			period = coeffs.length - found;
			break;
		}
		
		coeffs.push(res);
	}
	
	return period;
}

var iteration = function (a,b,n) {
	c = Math.round((n-b*b)/a);
	k = Math.floor((Math.sqrt(n) + b) / c);
	d = k*c - b;
	return { result: k, a: c, b: d };
}

var res = 0;
for (var n = 2; n <= 10000; n++) {
	var p = sequence(n, 100000);
	if (p && p % 2 == 1)
		res++;
}

console.log(res);