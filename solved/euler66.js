function iter(a, b, n) {
	var c = (n - b * b) / a;
	var k = Math.floor((Math.sqrt(n) + b) / c);
	var d = k * c - b;
	
	return { a: c, b: d, result: (b+d)/c };
}

function cf(n, prec) {
	var a = 1,
		b = Math.floor(Math.sqrt(n));
		
	var res = [b];
	
	for (var i = 0; i < prec; i++) {
		var d = iter(a, b, n);
		a = d.a;
		b = d.b;
		res.push(d.result);
	}
	
	return res;
}

// a, b : BigInteger
function gcd(a,b) {
	if (b.isZero())
		return a;
	if (b.isUnit())
		return 1;
	if (a.compare(b) == 0)
		return a;
	if (b.compare(a) == 1)
		return gcd(b, a);
		
	return gcd(a.remainder(b), b);
}

// frac = { p : BigInteger, q : BigInteger } 
function reduce(frac) {
	var g = gcd(frac.p, frac.q);
	return { p: frac.p.quotient(g), q: frac.q.quotient(g) };
}

function partial(seq, i) {
	var res = { p: BigInteger(seq[i]), q: BigInteger(1) };

	while (i > 0) {
		i--;
		var a = BigInteger(seq[i]);
	
		res = reduce({
			p: a.multiply(res.p).add(res.q),
			q: res.p
		});
	}
	
	return res;
}


setTimeout(function() {

var maxX = BigInteger(0), maxD = 0;

for (var d = 2; d <= 1000; d++) {
	var sqrt = Math.floor(Math.sqrt(d));
	if (sqrt * sqrt == d)
		continue;
	
	// x^2 - d * y^2 = 1 ?
	
	var seq = cf(d, 1000);
	for (var i = 0; i < 1000; i++) {
		var r = partial(seq, i);
		
		if (r.p.multiply(r.p).subtract(BigInteger(d).multiply(r.q.multiply(r.q))).compare(BigInteger(1)) == 0) {
			if (r.p.compare(maxX) > 0) {
				maxX = r.p;
				maxD = d;
			}
			
			console.log("breaking for d = " + d + " with x = " + r.p.toString());
			break;
		}
	}
}

console.log("max. d = " + maxD);

}, 2000);
