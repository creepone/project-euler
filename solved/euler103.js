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

function strArr(arr) {
	var res = "[";
	
	arr.forEach(function (m, i) {
		if (i) res += ",";
		res += m;
	});
	
	res += "]";
	return res;
}


function findMin(a, bound) {
	var min, minSet;
	
	for (var d1 = 1; d1 < bound; d1++)
	for (var d2 = 1; d2 < a; d2++)
	for (var d3 = 1; d3 < a - d2; d3++)
	for (var d4 = 1; d4 < a - d2 - d3; d4++)
	for (var d5 = 1; d5 < a - d2 - d3 - d4; d5++)
	for (var d6 = 1; d6 < a - d2 - d3 - d4 - d5; d6++)
	{
		var set = [a, a + d1, a + d1 + d2, a + d1 + d2 + d3, a + d1 + d2 + d3 + d4, a + d1+ d2 + d3 + d4 + d5, a + d1+ d2 + d3 + d4 + d5 + d6];
		if (checkSize(set) && checkSubsets(set))
		{
			var val = sum(set, 0, set.length - 1);
			if (!min || val < min) {
				min = val;
				minSet = set;
			}
		}
	}
	
	return { set: minSet, value: min };
}


function main() {
	for (var a = 5; a < 100; a++) {
		var res = findMin(a, 200);
		if (res.set)
			console.log(strArr(res.set) + " = " + res.value);
		else
			console.log("tried " + a);
	}
}

setTimeout(main, 2000);