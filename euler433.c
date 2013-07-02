#include <NTL/ZZ.h>
#include <math.h>

using namespace std;
using namespace NTL;

int E(int x, int y) {
	if (y == 0)
		return 0;
	else
		return 1 + E(y, x % y);
}

int main()
{
	ZZ res;
	res = 0;
	
	long bound = 5000000;
	//long bound = 100;

	for (int y = 1; y < bound; y++) {
		cout << "y = " << y << endl;
		
		// for r = 0, E is always 1
		res += bound / y - 1;
		
		for (int r = 1; r < y; r++) {
			int len = E(y, r) + 1;
			res += len * ((bound - r) / y);
		}
	}
	
	cout << "res = " << res << endl;
}