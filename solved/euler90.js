function covers(cube1, cube2) {
	if ((cube1.indexOf(0) < 0 || cube2.indexOf(1) < 0) && (cube2.indexOf(0) < 0 || cube1.indexOf(1) < 0))
		return false;
	if ((cube1.indexOf(0) < 0 || cube2.indexOf(4) < 0) && (cube2.indexOf(0) < 0 || cube1.indexOf(4) < 0))
		return false;
	if ((cube1.indexOf(0) < 0 || cube2.indexOf(9) < 0) && (cube2.indexOf(0) < 0 || cube1.indexOf(9) < 0))
		return false;
	if ((cube1.indexOf(1) < 0 || cube2.indexOf(6) < 0) && (cube2.indexOf(1) < 0 || cube1.indexOf(6) < 0))
		return false;
	if ((cube1.indexOf(2) < 0 || cube2.indexOf(5) < 0) && (cube2.indexOf(2) < 0 || cube1.indexOf(5) < 0))
		return false;
	if ((cube1.indexOf(3) < 0 || cube2.indexOf(6) < 0) && (cube2.indexOf(3) < 0 || cube1.indexOf(6) < 0))
		return false;
	if ((cube1.indexOf(4) < 0 || cube2.indexOf(9) < 0) && (cube2.indexOf(4) < 0 || cube1.indexOf(9) < 0))
		return false;
	if ((cube1.indexOf(6) < 0 || cube2.indexOf(4) < 0) && (cube2.indexOf(6) < 0 || cube1.indexOf(4) < 0))
		return false;
	if ((cube1.indexOf(8) < 0 || cube2.indexOf(1) < 0) && (cube2.indexOf(8) < 0 || cube1.indexOf(1) < 0))
		return false;
	return true;
}

function iterateCubes(callback) {
	
	// case 1 : 6/9 not present at all
	for (var a = 0; a <= 8; a++)
	for (var b = a + 1; b <= 8; b++)
	{
		if (a == 6 || b == 6)
			continue;
		
		var res = [];
		for (var i = 0; i <= 8; i++)
			if (i != a && i != b && i != 6)
				res.push(i);
		
		callback(res);
	}
	
	// case 2: one of 6/9 originally present
	for (var a = 0; a <= 8; a++)
	for (var b = a + 1; b <= 8; b++)
	for (var c = b + 1; c <= 8; c++)
	{
		if (a == 6 || b == 6 || c == 6)
			continue;
		
		var res = [];
		for (var i = 0; i <= 9; i++)
			if (i != a && i != b && i != c)
				res.push(i);

		// process twice because of the symmetry
		callback(res);
		callback(res);
	}
	
	// case 3: both 6/9 originally present
	for (var a = 0; a <= 8; a++)
	for (var b = a + 1; b <= 8; b++)
	for (var c = b + 1; c <= 8; c++)
	for (var d = c + 1; d <= 8; d++)
	{
		if (a == 6 || b == 6 || c == 6 || d == 6)
			continue;
		
		callback([a, b, c, d, 6, 9]);
	}
}

function main() {
	
	var res = 0;
	
	iterateCubes(function (cube1) {
		iterateCubes(function (cube2) {
			if (covers(cube1, cube2)) {
				res++;
			}
		});
	});
	
	console.log("res = " + res);
}

setTimeout(main, 2000);