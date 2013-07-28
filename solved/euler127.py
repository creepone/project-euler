# construct a map of all the factorizations by an extended sieve
N = 120000
factors = [{} for i in range(N)]

for p in range(2, N):
    if factors[p] != {}: continue

    pp = p
    while pp < N:
        m = pp

        while m < N:
            if p in factors[m]:
                factors[m][p] += 1
            else:
                factors[m][p] = 1
            m += pp

        pp *= p


# determines whether given a has at least one higher power prime divisor
def hasHigher(a):
    return bool([x for x in a.values() if x > 1])

# determines whether given a and b are coprime
def areCoprime(a, b):
    return not set(a.keys()).intersection(set(b.keys()))

# calculates the radical of abc
def radical(a, b, c):
    allPrimes = set(a.keys()).union(set(b.keys())).union(set(c.keys()))
    return reduce(lambda x,y: x*y, allPrimes)

result = 0

for c in range(3, N):
    fC = factors[c]
    if not hasHigher(fC): continue

    for b in range(c / 2, c):
        fB = factors[b]
        if not hasHigher(fC) or not areCoprime(fB, fC): continue
        a = c - b
        fA = factors[a]
        if radical(fA, fB, fC) < c:
            print a, b, c
            result += c

print result

