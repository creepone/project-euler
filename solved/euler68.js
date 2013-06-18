function hasDuplicates(arr) {
	var sorted = arr.slice().sort();
	for (var i = 0; i < sorted.length - 1; i++) {
		if (sorted[i] == sorted[i+1])
			return true;
	}	
	return false;
}

function main() {
	
	var res = "";
	
	for (var a = 1; a <= 6; a++) {
		for (var d = a; d <= 10; d++)
		for (var f = a; f <= 10; f++)
		for (var h = a; h <= 10; h++)
		for (var j = a; j <= 10; j++)
		{
			// sanity checks, all must be different and contain 10
			if ([d,f,h,j].indexOf(10) < 0)
				continue;
			if (hasDuplicates([d,f,h,j]))
				continue;
		
			for (var e = 1; e <= 10; e++) {
				if ([a,d,f,h,j].indexOf(e) >= 0)
					continue;
				
				var b = d + e - a;
				var g = b + j - h;
				var c = f + g - d;
				var i = a + c - j;
				
				var sum = a + b + c;
				if ((d + c + e != sum) || (f + e + g != sum) || (g + h + i != sum) || (i + j + b != sum)) 
					continue;
					
				if (hasDuplicates([a,b,c,d,e,f,g,h,i,j]))
					continue;
				
				var arrangement = "" + a + b + c + d + c + e + f + e + g + h + g + i + j + i + b;
				if (arrangement > res)
					res = arrangement;
			}
		}
	}
	
	console.log("res = " + res);
}

setTimeout(main, 2000);