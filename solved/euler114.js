var ts = { 0: 1, 1: 1, 2: 1 }, qs = { 0: 0, 1: 0, 2: 0, 3: 1, 4: 2};

function T(n) {
	if (n in ts)
		return ts[n];
	
	var res = 2;
	
	for (var i = 3; i <= n - 1; i++) 
		res += Q(i);
		
	for (var i = 0; i <= n - 4; i++)
		res += T(i);
		
	ts[n] = res;
	return res;
}

function Q(n) {
	if (n in qs)
		return qs[n];
		
	var res = 1;
	
	for (var i = 0; i <= n - 4; i++)
		res += T(i);

	qs[n] = res;
	return res;
}


function main() {
	console.log("T(50) = " + T(50));
}

setTimeout(main, 2000);