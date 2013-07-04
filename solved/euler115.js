var m = 50;
var ts = {}, qs = {};

function T(n) {
	if (n in ts)
		return ts[n];
	
	var res;
	if (n < m) {
		res = 1;
	}
	else {
		res = 2;
		for (var i = m; i <= n - 1; i++) 
			res += Q(i);
		for (var i = 0; i <= n - m - 1; i++)
			res += T(i);
	}
	
	ts[n] = res;
	return res;
}

function Q(n) {
	if (n in qs)
		return qs[n];
		
	var res;
	if (n < m) {
		res = 0;
	}
	else {
		res = 1;
		for (var i = 0; i <= n - m - 1; i++)
			res += T(i);
	}
	
	qs[n] = res;
	return res;
}


function main() {
	var i = 1, bound = Math.pow(10, 6);
	while (true) {
		if (T(i) > bound) {
			console.log("res = " + i);
			break;
		}
		i++;
	}
}

setTimeout(main, 2000);