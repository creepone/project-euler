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

function binSearch(arr, x) {

	function search(i, j) {
		if (j - i < 2)  {
			if (arr[j] <= x)
				return j;
			else
				return i;
		}
		
		var k = Math.floor((i + j) / 2);
		
		if (arr[k] > x)
			return search(i, k);
		else
			return search(k, j);
	}
	
	return search(0, arr.length - 1);
}

function main() {
	var n = 100000000;
	//var n = 30;
	
	var primes = sieve(n / 2);
	var res = 0;
	
	for (var i = 0; i < primes.length; i++) {
		
		var p1 = primes[i];
		
		var upper = Math.floor(n / p1);
		
		if (upper < p1)
			break;
		
		var j = binSearch(primes, upper);
		
		res += (j - i + 1);
	}
	
	console.log("res = " + res);
}

setTimeout(main, 2000);