// sums the elements set[a]..set[b] (incl. bounds)
function sum(set, a, b) {
	var res = 0;
	for (var i = a; i <= b; i++)
		res += set[i];
	return res;
}

// sums the elements set[i] for all i in indices
function sumi(set, indices) {
	var res = 0;
	indices.forEach(function (i) {
		res += set[i];
	});
	return res;
}

function checkSize(set) {
	var n = set.length; // 7 .. 12
	
	// check size condition on relevant subsets
	for (var k = 1; k <= 5; k++)
		if (sum(set, 0, k) <= sum(set, n - k, n - 1))
			return false;
	
	return true;
}


function test(res, size, n, swapIndex, callback) {
	var lower, upper;
	if (!res)
		res = { current: 0, first:[], second: [] };
		
	var current = res.current;
	if (current >= size * 2)
		return callback(res);
	
	if (current == 0) {
		lower = 0;
		upper = n;
	}
	else if (current < size) {
		lower = res.first[current - 1] + 1;
		upper = n;
	}
	else if (current == size) {
		lower = res.first[0] + 1;
		upper = n;
	}
	else {
		lower = res.second[current - size - 1] + 1;
		if (swapIndex == current - size)
			upper = res.first[swapIndex];
		else
			upper = n;
	}

	for (var i = lower; i < upper; i++) {
		var newRes = { current: current+1, first: res.first.slice(), second: res.second.slice() };
		
		if (current < size)
			newRes.first.push(i);
		else
			newRes.second.push(i);
	
		test(newRes, size, n, swapIndex, callback);
	}
}

function checkSubsets(set) {
	var n = set.length; // 7 .. 12
	var pass = true;
	
	for (var size = 2; size <= n / 2; size++) {
		for (var switchIndex = 1; switchIndex < size; switchIndex++) {
			test(null, size, n, switchIndex, function (res) {
				if (sumi(set, res.first) == sumi(set, res.second))
					pass = false;
			});
		}
	}
	
	return pass;
}


function main() {
	var sets = input.split(";").map(function (s) { 
		return s.split(",").map(function (n) { return +n; }).sort(function (a,b) { return a-b; });
	});

	var res = [];
	sets.forEach(function (set, i) {
		console.log("checking set " + i);
	
		if (!checkSize(set))
			return;
		
		if (!checkSubsets(set))
			return;

		res.push(set);
	});
	
	console.log(res.length + " out of " + sets.length);
	
	var resSum = 0;
	res.map(function (set) { resSum += sum(set, 0, set.length - 1); });
	
	console.log("sum = " + resSum);
}

setTimeout(main, 2000);