var rules = [
	function (n) { return n * (n+1) / 2; },
	function (n) { return n * n; },
	function (n) { return n * (3*n-1) / 2; },
	function (n) { return n * (2*n-1); },
	function (n) { return n * (5*n-3) / 2; },
	function (n) { return n * (3*n-2); }
];

var solve = function (a,b,c) {
	var d = b*b - 4*a*c;
	if (d < 0)
		return;
	
	var x1 = (-b + Math.sqrt(d)) / (2*a);
	var x2 = (-b - Math.sqrt(d)) / (2*a);
	return Math.max(x1, x2);
}

var permute = function (arr, callback) {
	if (arr.length == 0)
		return callback(arr);

	for (var i = 0; i < arr.length; i++) {
		var rest = [].slice.apply(arr);
	
		var first = arr[i];
		rest.splice(i, 1);

		permute(rest, function (permRest) {
			permRest.unshift(first);
			callback(permRest);
		});
	}
};

var rangeFor = function (number, index) {
	if (number % 100 < 10)
		return { lower: 0, upper: -1 };

	var lower = Math.floor(number % 100) * 100;
	var upper = Math.floor(number % 100) * 100 + 99;
	
	return {
		lower: rules[index].bound(lower, true),
		upper: rules[index].bound(upper, false)
	};
}


rules[0].bound = function (bound, lower) {
	var round = lower ? Math.ceil : Math.floor;
	return round(solve(1,1,-2*bound));
}

rules[1].bound = function (bound, lower) {
	var round = lower ? Math.ceil : Math.floor;
	return round(solve(1,0,-bound));
}

rules[2].bound = function (bound, lower) {
	var round = lower ? Math.ceil : Math.floor;
	return round(solve(3,-1,-2*bound));
}

rules[3].bound = function (bound, lower) {
	var round = lower ? Math.ceil : Math.floor;
	return round(solve(2,-1,-bound));
}

rules[4].bound = function (bound, lower) {
	var round = lower ? Math.ceil : Math.floor;
	return round(solve(5,-3,-2*bound));
}

rules[5].bound = function (bound, lower) {
	var round = lower ? Math.ceil : Math.floor;
	return round(solve(3,-2,-bound));
}

var search = function (number, indices) {
	if (indices.length == 0)
		return [];

	var index = indices.shift();
	var range = rangeFor(number, index);
	
	for (var x = range.lower; x <= range.upper; x++) {
		var n = rules[index](x);
	
		var found = search(n, indices);
		if (found) {
			found.unshift(n);
			return found;
		}
	}
}

var main = function() {

	for (var i = rules[5].bound(1000, true); i <= rules[5].bound(9999, false); i++) {
		var n = rules[5](i);
		
		permute([0,1,2,3,4], function (indices) {
			var res = search(n, indices);
			if (res && res.length == 5) {
				res.unshift(n);
				
				var last = res[5] % 100;
				var first = Math.floor(res[0] / 100);

				if (first == last)
					console.log(res);
			}
		});
	}

}