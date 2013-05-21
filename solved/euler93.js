var operations = [
	function (a,b) { return a + b; },
	function (a,b) { return a - b; },
	function (a,b) { return a * b; },
	function (a,b) { if (b == 0) return NaN;	
	return a / b; }
];

var shapes = [
	function (a,b,c,d,op1,op2,op3) { return op2(op1(a,b),op3(c,d)); },
	function (a,b,c,d,op1,op2,op3) { return op3(op2(op1(a,b),c),d); },
	function (a,b,c,d,op1,op2,op3) { return op1(op2(a,op3(b,c)),d); },
	function (a,b,c,d,op1,op2,op3) { return op1(a,op2(op3(b,c),d)); },
	function (a,b,c,d,op1,op2,op3) { return op1(a,op2(b,op3(c,d))); }
];


var max = 0;

for (var x = 0; x <= 9; x++)
for (var y = x + 1; y <= 9; y++)
for (var z = y + 1; z <= 9; z++)
for (var w = z + 1; w <= 9; w++) {

	var nrs = [x,y,z,w];
	var res = [];

	for (var i1 = 0; i1 < 4; i1++)
	for (var i2 = 0; i2 < 4; i2++)
	for (var i3 = 0; i3 < 4; i3++)
	{
		var op1 = operations[i1];
		var op2 = operations[i2];
		var op3 = operations[i3];

		for (var j1 = 0; j1 < 4; j1++)
		for (var j2 = 0; j2 < 4; j2++)
		for (var j3 = 0; j3 < 4; j3++)
		for (var j4 = 0; j4 < 4; j4++)
		{
			if (j1 == j2 || j1 == j3 || j1 == j4 || j2 == j3 || j2 == j4 || j3 == j4)
				continue;
		
			var a = nrs[j1], b = nrs[j2], c = nrs[j3], d = nrs[j4];
			
			for (i = 0; i < 5; i++) {
				var shape = shapes[i];
				var value = shape(a,b,c,d,op1,op2,op3);
				
				// not an integer
				if (Math.abs(Math.floor(value) - value) > 0.00001)
					continue;
					
				if (!isNaN(value) && value > 0 && res.indexOf(value) == -1)
					res.push(value);
			}
		}
	}

	res.sort(function (a,b) { return a-b; });
	
	var current = 0;
	for (var i = 0; i < res.length; i++) {
		if (i + 1 == res[i])
			current++;
		else
			break;
	}
	
	if (current > max) {
		max = current;
		console.log("max = " + max + " for " + x + "," + y + "," + z + "," + w);
	}
}
