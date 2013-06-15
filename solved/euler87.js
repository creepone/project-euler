function sieve(n) {
	var res = [], resMap = {}, primes = {}, p = 2;
	while (p < n) {
		res.push(p);
		
		for (var i = 2 * p; i < n; i += p) {
			primes[i] = false;
		}
		
		p++;
		while (primes[p] === false)
			p++;
	}
	return res;
}

function main()
{
	var p1s = sieve(7071);
	var p2s = sieve(368);
	var p3s = sieve(84);
	
	var expressibles = {};
	
	for (var i = 0; i < p1s.length; i++)
	for (var j = 0; j < p2s.length; j++)
	for (var k = 0; k < p3s.length; k++)
	{
		var p1 = p1s[i], p2 = p2s[j], p3 = p3s[k];
		var n = p1*p1 + p2*p2*p2 + p3*p3*p3*p3;
		
		if (n <= 50000000)
			expressibles[n] = true;
	}
	
	console.log("result = " + Object.keys(expressibles).length);
}

setTimeout(main, 2000);