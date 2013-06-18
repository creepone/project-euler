function main() {
	var bound = BigInteger(Math.floor((Math.pow(10, 9) + 1) / 3));
	var res = BigInteger.ZERO;
	
	var counter = 0, cmp;
	var bSqrt = BigInteger.ONE, cSqrt = BigInteger.ONE;
	
	for (var a = BigInteger(3); a.compare(bound) < 0; a = a.add(2))
	{
		counter++;
		if (counter === 10000) {
			console.log("a = " + a.toString());
			counter = 0;
		}
	
		var o1 = a.multiply(3).next();
		var o2 = a.multiply(3).prev();
	
		var b = a.prev().multiply(o1);
		var c = a.next().multiply(o2);
		
		cmp = bSqrt.square().compare(b);
		while (cmp < 0) {
			bSqrt = bSqrt.next();
			cmp = bSqrt.square().compare(b);
		}
		if (cmp == 0)
			res = res.add(o1);
			
		cmp = cSqrt.square().compare(c);
		while (cmp < 0) {
			cSqrt = cSqrt.next();
			cmp = cSqrt.square().compare(c);
		}
		if (cmp == 0)
			res = res.add(o2);
	}

	console.log("res = " + res.toString());
}

setTimeout(main, 2000);