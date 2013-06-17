// square root by binary search
function sqrt(n) {	
	function search(a, b) {
		if (a.square().compare(n) == 0)
			return a;
		if (b.square().compare(n) == 0)
			return b;
			
		if (a.compare(b) == 0 || a.add(1).compare(b) == 0)
			return a; // not really a sqr root, but the best approx.
			
		var m = a.add(b).quotient(2);
		var pos = m.square().compare(n);
		
		if (pos == 0)
			return m; // we were lucky
		else if (pos < 0)
			return search(m, b);
		else
			return search(a, m);
	}
	
	return search(BigInteger.ONE, n);
}

function main() {
	var x = BigInteger(3), 
		y = BigInteger(4), 
		z = BigInteger(5),
		bound = BigInteger("1000000000000");
	
	while (x.compare(bound) < 0){
		var b = x.add(z);
		x = b.square().add(b.multiply(2)).quotient(y);
		y = x.next();
		z = sqrt(x.square().add(y.square()));
	};
	
	console.log(x.toString());
}

setTimeout(main, 2000);