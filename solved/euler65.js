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

var reduce = function (fraction) {
	var g = gcd(fraction.p, fraction.q);
	
	return {
		p: fraction.p / g,
		q: fraction.q / g
	};
}

var add = function (a, frac) {
	return reduce({
		p: a * frac.q + frac.p,
		q: frac.q
	});
}

var evalSeq = function (sequence) {

	var res = sequence.shift();

	while (sequence.length > 0) {
		var a = sequence.shift();
		var b = typeof res == "object" ? { p: res.q, q: res.p } : { p: 1, q: res };
		
		res = add(a, b);
	}

	return reduce(res);
}

var input = [];
for (var k = 33; k >= 1; k--) {
	input.push(1);
	input.push(2 * k);
	input.push(1);
}
input.push(2);

console.log(evalSeq(input));