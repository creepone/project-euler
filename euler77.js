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

// # of ways to express n as a sum of primes <= k
function p(n, k) {
	if (k > n || typeof k == "undefined")
		return p(n, n);

	if (cache[n] && typeof cache[n][k] != "undefined")
		return cache[n][k];
		
	var res = 0;
	
	// idea: 
	// fix is the biggest prime in the sum, e.g. "23"
	// now there are p(n - 23, 23) ways to express the rest
	
	cache[n] = cache[n] || {};
	cache[n][k] = res;
	return res;
}