function main()
{
	var n = 50;
	var res = 0;
	
	for (var x1 = 0; x1 <= n; x1++)
	for (var y1 = 0; y1 <= n; y1++)
	for (var x2 = 0; x2 <= n; x2++)
	for (var y2 = 0; y2 <= n; y2++)
	{
		// rule out trivial cases
		if ((x1 == 0 && y1 == 0) || (x2 == 0 && y2 == 0))
			continue;
			
		if (x1 == 0) {
			if (x2 == 0)
				continue;
		}
		else if (y1 == 0) {
			if (y2 == 0)
				continue;
		}
		else if (x2 != 0 && y2 !=0) {
			if (x1 * y2 == x2 * y1) // linear dependent
				continue;
		}
		
		// find an orthogonal pair
		if (x1 * x2 + y1 * y2 == 0)
		{
			res++;
			continue;
		}
		
		if (x1 * (x2 - x1) + y1 * (y2 - y1) == 0)
		{
			res++;
			continue;
		}
			
		if (x2 * (x2 - x1) + y2 * (y2 - y1) == 0)
		{
			res++;
			continue;
		}
	}
	
	console.log("res = " + res / 2);
}

setTimeout(main, 2000);