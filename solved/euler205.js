function polySum() {
	var result = [];
	for (var i = 0; i < arguments.length; i++) {
		var p = arguments[i];
		
		for (var j = 0; j < p.length; j++) {
			result[j] = result[j] || 0;
			result[j] += p[j];
		}
	}
	return result;
}

function genPoly(n, k) {
	var a = [1];
	
	for (var i = 0; i < k; i++) {
		// multiply a by (x+x^2+x^3+x^4)
		
		var bs = [], b = a;
		
		for (var j = 0; j < n; j++) {
			bs[j] = b.slice();
			bs[j].unshift(0);
			b = bs[j];
		}
		
		a = polySum.apply(null, bs);
	}
	
	return a;
}

function main() {
	
	var a = genPoly(4, 9);
	var b = genPoly(6, 6);
	
	var res = 0;
	
	for (var i = 0; i <= 36; i++)
	for (var j = i + 1; j <= 36; j++)
	{
		res += b[i] * a[j];
	}
	
	console.log(res);
}

setTimeout(main, 2000);