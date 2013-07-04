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

var primes;

function main() {
	primes = sieve(1000000);
	
	var res;
	for (var n = primes.length; n > 0; n--) {
		
		if (2 * n * primes[n - 1] < Math.pow(10,10))
		{
			res = n + 1;
			break;
		}
	}
	
	console.log("res = " + res);
}

setTimeout(main, 2000);