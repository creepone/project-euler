function gcd(a,b) {
	if (a < b)
		return gcd(b,a);
	if (a==b)
		return a;
	if (b==1)
		return 1;
	if (b==0)
		return a;

	return gcd(a % b, b);
}

// # of arrangements with a as highest member and the other two summing to b
function comp(a,b,M) {
	
	var res = 0;
	
	for (var c = a; c >= Math.ceil(b/2); c--) { 
		var d = b - c;
		
		if (d <= 0 || c > a || d > a)
			continue;

		res++;
	}
	
	return res;
}

function solutions(M) {
	var res = 0;
	
	for (var n = 1; n <= M; n++) {
		for (var m = n + 1; m*m <= 2*M + n*n; m+=2) {
			if (gcd(n,m) != 1)
				continue;
			
			for (var k = 1; k <= (M/(m*n)); k++) {
				
				var a = k * (m*m - n*n);
				var b = k * (2 * m * n);
								
				var sol = 0;
				
				if (a <= M && b <= 2 * a)
					sol += comp(a,b,M);
				if (b <= M && a <= 2 * b)
					sol += comp(b,a,M);
									
				res += sol;
			}
		}
	}
	
	return res;
}

function main()
{
	console.log(solutions(100));
}

setTimeout(main, 2000);