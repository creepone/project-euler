function solutions(n) {
	var res = 0;
	for (var x = n; x <= 2*n; x++) {
		if ((n * x) % (x - n) == 0)
			res++;
	}
	return res;
}

function main() {
	var n = 4;
	while (true) {
		var s = solutions(n);
		if (s > 1000) {
			console.log("n = " + n + ", s = " + s);
			break;
		}		
		n++;
	}
}

setTimeout(main, 2000);