import math

results = [0]*16

# PMF of the 1st step
results[0] = 0.5
results[1] = 0.5

for round in range(2,16):
	pWin = 1.0 / (round + 1.0)
 	pLose = 1.0 - pWin

	modified = [0]*16
	for i in range(0, round):
		modified[i] += results[i] * pLose
		modified[i + 1] += results[i] * pWin
	
	results = modified
	
total = 1 / sum(results[8:])
print total