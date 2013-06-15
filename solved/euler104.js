var firstNine = JSON.stringify(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

function startTest(a) {
	var str = a.toString();
	if (str.length < 9)
		return false;
	
	var prefix = str.substr(0, 9);
	return JSON.stringify(prefix.split("").sort()) == firstNine;
}

function endTest(a) {
	var str = a.toString();
	if (str.length < 9)
		return false;
		
	var suffix = str.substr(str.length - 9, 9);
	return JSON.stringify(suffix.split("").sort()) == firstNine;
}


function main()
{
	var f_i = BigInteger(1);
	var f_j = BigInteger(1);
	var k = 2;
	
	while (true) {
		// advance fib.
		k++;
		f_k = f_i.add(f_j);
		f_i = f_j;
		f_j = f_k;
		
		if (k % 1000 == 0)
			console.log(k);
		
		if (startTest(f_k) && endTest(f_k))
		{
			console.log("result = " + k);
			return;
		}
	}
}

setTimeout(main, 2000);