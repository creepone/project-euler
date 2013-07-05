function main() {
	var N = 1000000;
	var bound = N/4 - 1;
	
	var res = 0;
	for (var i = 1; i <= bound; i++) {
		var B = Math.floor(Math.sqrt(N + i * i));
		res += Math.floor((B - i) / 2);
	}
	
	console.log("res = " + res);
}

setTimeout(main, 2000);