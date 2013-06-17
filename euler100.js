function main() {
	var s = BigInteger("1000000000000");
	var s1 = s.prev();
	
	var a = BigInteger("1414213562372");
	var as = a.square();
	
	var ss1 = s1.square();
	var ss = s.square();
	var t = ss1.add(ss);
	
	
	var counter = 0;
	
	while(true)
	{
		counter++;
		if (counter == 100000)
		{
			console.log("a = " + a);
			counter = 0;
		}
	
		// increase s until a^2 is reached
		while (t.compare(as) < 0) {
			s1 = s;
			s = s1.next();
			
			ss1 = ss;
			ss = s.square();
			
			t = ss1.add(ss);
		}
	
		if (t.compare(as) == 0)
			break;
			
		// increase a until t is reached
		while (as.compare(t) < 0) {
			a = a.next();
			as = a.square();
		}
		
		if (t.compare(as) == 0)
			break;
	} 
	
	console.log("s = " + s);
}

setTimeout(main, 2000);