function main() {
	var res = 0;
	for (var a = 3; a <= 1000; a++) {
		var max = 2;
		for (var n = 1; n <= a; n++) {
			var r = (2 * a * n) % (a * a);
			if (r > max)
				max = r;
		}
		res += max;
	}
	console.log(res);
}

setTimeout(main, 2000);