function sieve(n) {
	var map = {}, res = [];
	
	var p = 2;
	while (p <= n) {
		for (var kp = 2 * p; kp <= n; kp += p)
			map[kp] = false;
	
		res.push(p);
		
		while(p <= n) {
			p++;
			if (map[p] !== false)
				break;
		}
	}
	
	return res;
}

var cache = {
	2: { 0: 0, 1: 0, 2: 1 }
};

var primes = sieve(1000);

// # of ways to express n as a sum of primes <= k
function count(n, k) {
	if (k > n || typeof k == "undefined")
		return count(n, n);

	if (cache[n] && typeof cache[n][k] != "undefined")
		return cache[n][k];
		
	var res = 0;
	
	if (k < 2)
		res = n == 0 ? 1 : 0;
	else if (k == 2)
		res = n % 2 == 0 ? 1 : 0;
	else {
		// for all primes q <= k
		for (var i = 0; i < primes.length; i++) {
			var q = primes[i];
			if (q > k)
				break;
			res += count(n - q, q);
		}
	}
	
	cache[n] = cache[n] || {};
	cache[n][k] = res;
	return res;
}

setTimeout(function () {
	for (var n = 2; n <= 1000; n++)
		console.log("count(" + n + ") = " + count(n));
}, 2000);