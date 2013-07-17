function isUnique(res) {
	var all = res.first.slice();
	[].push.apply(all, res.second);
	all.sort();
	
	for (var i = 0; i < all.length - 1; i++) {
		if (all[i] == all[i+1])
			return false;
	}
	
	return true;
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


function test(res, size, n, swapIndex, callback) {
	var lower, upper;
	if (!res)
		res = { current: 0, first:[], second: [] };
		
	var current = res.current;
	if (current >= size * 2) {
		if (isUnique(res))
			return callback(res);
	}
	
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

function numberOfSubsets(n) {
	var count = 0;
	
	var found = [];
	
	for (var size = 2; size <= n / 2; size++) {
		for (var switchIndex = 1; switchIndex < size; switchIndex++) {
			test(null, size, n, switchIndex, function (res) {
				var str = strArr(res.first) + " " + strArr(res.second);
				
				if (found.indexOf(str) < 0)
					found.push(str);
			});
		}
	}
	
	return found.length;
}


function main() {
	console.log("nr(12) = " + numberOfSubsets(12));
}

setTimeout(main, 2000);