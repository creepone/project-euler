function isReversible(a) {
	// leading zeros not allowed
	if (a % 10 == 0)
		return false;
	
	var rev = +a.toString().split("").reverse().join("");
	var sum = (a + rev).toString().split("");
	
	var result = true;
	
	for (var i = 0; i < sum.length; i++) {
		if (["1","3","5","7","9"].indexOf(sum[i]) < 0) {
			result = false;
			break;
		}
	}
	
	return result;
}

function main() {
	var res = 0;
	
	for (var n = 1; n < 1000000000; n++) {
		if (n % 100000 == 0)
			console.log(n);
		
		if (isReversible(n))
			res++;
	}
	
	console.log("res = " + res);
}

setTimeout(main, 2000);