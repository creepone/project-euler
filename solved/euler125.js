function sumSquares(a, b) {
	return (b * (b+1) * (2*b+1) - a * (a-1) * (2*a-1)) / 6;
}

function isPalindrome(n) {
	var str = n.toString();
	return str === str.split("").reverse().join("");
}

function main() {
	
	var map = {};
	
	for (var a = 1; a < 10000; a++) {
		for (var b = a+1; b < 10000; b++) {
			var s = sumSquares(a,b);
			
			if (s > 100000000)
				continue;
				
			if (isPalindrome(s))
				map[s] = true;
		}
	}
	
	var sum = BigInteger.ZERO;
	Object.keys(map).forEach(function (nr) {
		sum = sum.add(BigInteger(nr));
	});
	
	console.log(sum.toString());
}

setTimeout(main, 2000);