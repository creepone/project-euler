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

function pairable(primes) {
	
	var res = {};
	for (var i = 0; i < primes.length; i++) {
		var p = primes[i], list = [];
		
		for (var j = 0; j < i; j++) {
			var q = primes[j];
			if (isPair(p, q))
				list.push(q);
		}

		if (list.length > 0)
			res[p] = list;
			
		console.log("processed " + p);
	}

	return res;
}

// p: BigInteger
function isPrime(p) {
	for (var a = BigInteger(2); a.multiply(a).compare(p) < 1; a = a.next()) {
		if (p.remainder(a).isZero())
			return false;
	}
	return true;
}

function isPair(p,q) {
	if (p != 3 && q != 3 && (p % 3 != q % 3))
		return false;
	
	var pp = BigInteger(p);
	var qq = BigInteger(q);
	
	if (!isPrime(BigInteger(pp.toString() + qq.toString())))
		return false;
	if (!isPrime(BigInteger(qq.toString() + pp.toString())))
		return false;
		
	return true;
}

function intersect(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

function f(arr, pairables) {
	if (arr.length <= 1)
		return arr;
	
	var a = [].slice.apply(arr),
		q = a.pop();
	
	var resWhenExcluded = f(a, pairables);
	var resWhenIncluded = [q].concat(f(intersect(a, pairables[q] || []), pairables));
	
	return (resWhenExcluded.length > resWhenIncluded.length) ? resWhenExcluded : resWhenIncluded;
}

setTimeout(function() {

var pairables = pairable(sieve(10000));
var results = {};

Object.keys(pairables).forEach(function (p) {
	var r = f(pairables[p], pairables);
	
	if (r.length > 2) {
		console.log(p);
		console.log(r);
	}
	
});

}, 1000);