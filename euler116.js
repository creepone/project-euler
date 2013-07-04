var ts = { 2: {}, 3: {}, 4: {}}, qs = { 2: {}, 3: {}, 4: {}};

function T(n, m) {
	if (n in ts[m])
		return ts[m][n];
	
	var res;
	if (n < m) {
		res = 0;
	}
	else if (n == m) {
		res = 1;
	}
	else {
		res = 0;
		for (var i = m; i <= n - 1; i++) 
			res += Q(i, m);
		res += T(n - m, m);
	}
	
	ts[m][n] = res;
	return res;
}

function Q(n, m) {
	if (n in qs[m])
		return qs[m][n];
		
	var res;
	if (n < m) {
		res = 0;
	}
	else if (n == m) {
		res = 1;
	}
	else {
		res = T(n - m, m);
	}
	
	qs[m][n] = res;
	return res;
}


function main() {
	console.log("res = " + (T(5, 2) + T(5, 3) + T(5, 4)));
}

setTimeout(main, 2000);