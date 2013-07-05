var ts = { 0: 0, 1: 1, 2: 2, 3: 4, 4: 8 }, 
    qs = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 4 };

function T(n) {
	if (n in ts)
		return ts[n];
	
	var res= 0;
	for (var i = 2; i <= n - 1; i++) 
		res += Q(i);
	res += T(n - 2) + T(n - 3) + T(n - 4) + 1;
	
	ts[n] = res;
	return res;
}

function Q(n) {
	if (n in qs)
		return qs[n];
		
	var res = T(n - 2) + T(n - 3) + T(n - 4);
	
	qs[n] = res;
	return res;
}


function main() {
	console.log("res = " + T(50));
}

setTimeout(main, 2000);