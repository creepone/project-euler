function phi(n) {
	var comp = decompose(n);

	var res = 1;
	Object.keys(comp).forEach(function (p) {
		var a = comp[p];
		res *= (Math.pow(p, a) - Math.pow(p, a - 1));
	});

	return res;
}

function decompose(n) {
	var res = {};

	if (n == 1)
		return {};

	for (var p = 2; p <= Math.sqrt(n); p++) {
		if (n % p == 0) {
			var a = 2;
			while (n % Math.pow(p, a) == 0)
				a++;
			a--;

			res[p] = a;

			n /= Math.pow(p,a);
			return $.extend(res, decompose(n));
		}
	}

	res[n] = 1;
	return res;
}

var sum = 0;
for (var d = 2; d <= 1000000; d++) {
	sum += phi(d);
}

$(function () {
	$("#result").text(sum);
})