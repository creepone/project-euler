function product(comp) {
	var res = 1;
	
	Object.keys(comp).forEach(function (key) {
		if (+key == 1)
			return;
		
		res *= Math.pow(+key, comp[key]);
	});

	return res;
}

var cache = { 1: {} };

function decompose(n) {
	if (n in cache)
		return cache[n];
	var d = dec(n);
	cache[n] = d;
	return d;
}

function dec(n) {
	var res = {};
	if (n == 1)
		return res;

	for (var p = 2; p <= Math.sqrt(n); p++) {
		if (n % p == 0) {
			var a = 2;
			while (n % Math.pow(p, a) == 0)
				a++;
			a--;

			res[p] = a;

			n /= Math.pow(p,a);
			
		 	return $.extend(res, dec(n));
		}
	}

	res[n] = 1;
	return res;
}

function q(product, sum) {
	var res = [];
	
	if (sum > product) {
		// we can also use product as a member
		res.push(sum - product + 1);
	}
	else if (sum == 2 && product == 2) {
		res.push(1);
	}
	
	var divs = divisors(product);
	
	divs.forEach(function (divisor) {
		if (divisor == 1 || divisor == product) return;
		
		var rec = q(product / divisor, sum - divisor);
		rec.forEach(function (r) {
			if (res.indexOf(r+1) < 0)
				res.push(r+1);
		});
	});

	return res;
}

function divisors(n) {
	if (n == 1)
		return [1];
		
	var res = [];
	
	var d = decompose(n);
	var p = +Object.keys(d)[0];
	var rest = n / Math.pow(p, d[p]);
	
	var rec = divisors(rest);
	
	for (var i = 0; i < rec.length; i++)
		for (var j = 0; j <= d[p]; j++)
			res.push(rec[i] * Math.pow(p, j));
			
	return res;
}


function main() {
	var res = [];
	
	var done = {}, rem = 11999, n = 4;
	
	while (rem > 0) {
		
		var lens = q(n, n);
		lens.forEach(function (len) {
			if (len <= 12000 && !done[len]) {
				done[len] = true;
				rem--;
				
				if (res.indexOf(n) < 0)
					res.push(n)
			}
		});
		
		n++;
		console.log("n = " + n + ", rem = " + rem);
	}
	
	var sum = 0;
	for (var i = 0; i < res.length; i++)
		sum += res[i];
	
	console.log("result = " + sum);
}

setTimeout(main, 2000);



