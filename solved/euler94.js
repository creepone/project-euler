function main() {
	var bound = BigInteger(Math.pow(10, 9) / 2);
	var res = BigInteger.ZERO;
	
	var v = BigInteger(7);
	var z = BigInteger(4);
	
	while (v.compare(bound) < 0) {
		if (v.remainder(3).compare(1) == 0) {
			var perim = v.multiply(2).add(2);
			res = res.add(perim);
		}
		
		if (v.remainder(3).compare(2) == 0) {
			var perim = v.multiply(2).subtract(2);
			res = res.add(perim);
		}
		
		var nextV = v.multiply(2).add(z.multiply(3));
		var nextZ = z.multiply(2).add(v);
		v = nextV;
		z = nextZ;
	}
	
	console.log("res = " + res.toString());
}

setTimeout(main, 2000);