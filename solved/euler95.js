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
	var ds = {};
	
	for (var n = 2; n < 1000000; n++) {
	
		if (n % 10000 == 0)
			console.log("1st n = " + n);
	
		var d = decompose(n);
		
		var sum = 1;
		Object.keys(d).forEach(function (p) {
			var alpha = d[p];
			sum *= (Math.pow(+p, alpha + 1) - 1) / (+p - 1);
		});
		
		ds[n] = sum - n;
	}
	
	var max = 0, res = 0;
	
	for (var n = 2; n < 1000000; n++) {
		var chain = [n], len = 0;
		
		if (n % 1000 == 0)
			console.log("2nd n = " + n);
		
		while (true) {
			var c = ds[chain[0]];
			if (c == 1)
				break;
				
			if (c == chain[chain.length - 1]) {
				len = chain.length;
				break;
			}
			
			if (chain.indexOf(c) >= 0)
				break;

			chain.unshift(c);
		}
	
		if (len > max) {
			max = len;
			res = n;
		}
	}
	
	console.log("res = " + res);
}

setTimeout(main, 5000);