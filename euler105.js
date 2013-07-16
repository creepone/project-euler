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


function generate(indices, a, b) {
	return function (callback) {
		for (var i = a; i <= b; i++) {
			var res = indices.slice();
			res.unshift(i);
			callback(res);
		}
	}
}

function checkSubsets(set) {
	var n = set.length; // 7 .. 12
	
	// subsets of size 2
	for (var i1 = 0; i1 < n; i1++)
	for (var i2 = i1 + 1; i2 < n; i2++)
	{
		// (i1, i2) compare with all (i3, i4) where i1 < i3 but i2 > i4
		for (var i3 = i1 + 1; i3 < n; i3++)
		for (var i4 = i3 + 1; i4 < i2; i4++)
		{
			if (sumi(set, [i1,i2]) == sumi(set, [i3,i4]))
				return false;
		}
	}
	
	// subsets of size 3
	for (var i1 = 0; i1 < n; i1++)
	for (var i2 = i1 + 1; i2 < n; i2++)
	for (var i3 = i2 + 1; i3 < n; i3++)
	{
		// (i1, i2, i3) compare with all (i4, i5, i6) where i1 < i4 but either i2 > i5 or i3 > i6
		for (var i4 = i1 + 1; i4 < n; i4++)
		for (var i5 = i4 + 1; i5 < i2; i5++)
		for (var i6 = i5 + 1; i6 < n; i6++)
		{
			if (sumi(set, [i1, i2, i3]) == sumi(set, [i4, i5, i6]))
				return false;
		}
	
		for (var i4 = i1 + 1; i4 < n; i4++)
		for (var i5 = i4 + 1; i5 < n; i5++)
		for (var i6 = i5 + 1; i6 < i3; i6++)
		{
			if (sumi(set, [i1, i2, i3]) == sumi(set, [i4, i5, i6]))
				return false;
		}
	}
	
	return true;
}

function main() {
	var sets = input.split(";").map(function (s) { 
		return s.split(",").map(function (n) { return +n; }).sort(function (a,b) { return a-b; });
	});

	var res = [];
	sets.forEach(function (set) {
		if (!checkSize(set))
			return;
		
		if (!checkSubsets(set))
			return;

		res.push(set);
	});
	
	console.log(res.length + " out of " + sets.length);
}

setTimeout(main, 2000);