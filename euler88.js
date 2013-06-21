function product(comp) {
	var res = 1;
	
	Object.keys(comp).forEach(function (key) {
		if (+key == 1)
			return;
		
		res *= Math.pow(+key, comp[key]);
	});

	return res;
}

// k >= 2
function search(k) {
	var level = [{ 1: k }];
	var sum = k;
	
	while (true) {
		var nextLevel = [];
		sum++;
		
		var found = false;
		
		// iterate level, generate all members of next level
		level.forEach(function (comp) {

			Object.keys(comp).forEach(function(key) {
				key = +key;
			
				// take the composition, increase one in this key
				var nextComp = $.extend({}, comp);
				
				nextComp[key] = nextComp[key] - 1;
				if (nextComp[key] == 0)
					delete nextComp[key];
					
				if ((key+1) in nextComp)
					nextComp[key+1] = nextComp[key+1] + 1;
				else
					nextComp[key+1] = 1;
					
				
				var pr = product(nextComp);
				if (pr == sum)
					found = true;
				else if (pr < sum)
					nextLevel.push(nextComp);
			});
			
			if (found)
				return;
		});
	
		if (found)
			return sum;
			
		level = nextLevel;
	}
}

var cache = { 1: {} };

function decompose(n) {
	if (n in cache)
		return cache[n];

	var res = {};

	for (var p = 2; p <= Math.sqrt(n); p++) {
		if (n % p == 0) {
			var a = 2;
			while (n % Math.pow(p, a) == 0)
				a++;
			a--;

			res[p] = a;

			n /= Math.pow(p,a);
			
			var x = $.extend(res, decompose(n));
			cache[n] = x;
			return x;
		}
	}

	res[n] = 1;
	cache[n] = res;
	return res;
}

// iterate all decompositions of n into a product with k members (some of them ones)
function iterDec(n, k, callback) {
	// p1^a1 * p2^a2 * ... pi^ai
	var d = cache[n];
	
	var bound = 0; // maximal number of non-one members
	Object.keys(d).forEach(function (p) { bound += d[p]; });
	bound = Math.min(bound, k);
	
	// fix m non-ones
	for (var m = 1; m <= bound; m++) {
		
		// a1, a2, .., ai
		
		var res = {};
		
		if (m < k) 
			res[1] = k - m;
		callback(res);
	}
}


function main() {
	var res = [];
	
	for (var k = 2; k <= 12000; k++) {
		console.log("k = " + k);
		var r = search(k);
		
		if (res.indexOf(r) < 0)
			res.push(r);
	}
	
	console.log("res = " + res.length);
}

setTimeout(main, 2000);