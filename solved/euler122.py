results = [None]*201
results[1] = 0
results[2] = 1

bound = 10

def process(s):
	depth = len(s)	
	if depth > bound: 
		return
		
	if depth == 5:
		print s
		
	for e1 in s:
		for e2 in s:
			if e1 > e2: continue
			n = e1 + e2
			if n > 200 or n < max(s): continue
			if results[n] is None:
				results[n] = depth
			else:
				results[n] = min(depth, results[n])
			if n not in s:
				process(s | set([n]))
	
process(set([1]))
	
print results
