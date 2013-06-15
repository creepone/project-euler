#include <NTL/RR.h>
#include <cstring>

using namespace std;
using namespace NTL;

RR matrix[120][120];

int coor(int position, int doubles) {
	return doubles * 40 + position;
}

// assuming after the roll of die we initially end up at (position, doubles) with probability
// we derive all the possibilites of target position and doubles and increase their corresponding
// cells in the matrix 
void process(int column, int position, int doubles, RR probability) {
	
	int row = coor(position, doubles);

	// special cases 2 (CC1), 7 (CH1), 17 (CC2), 22 (CH2), 30 (G2J), 33 (CC3), 36 (CH3)
	
	// after three doubles we end up in jail
	if (doubles == 3) {
		process(column, 10, 0, probability);
		return;
	}
	
	// Go To Jail
	if (position == 30) {
		process(column, 10, doubles, probability);
		return;
	}
	
	// Community Chest
	if (position == 2 || position == 17 || position == 33) {
		process(column, 0, doubles, probability / 16.0);
		process(column, 10, doubles, probability / 16.0);
		matrix[column][row] += (14.0 * probability) / 16.0;
		return;
	}
	
	// Chance
	if (position == 7 || position == 22 || position == 36) {
		process(column, 0, doubles, probability / 16.0);
		process(column, 10, doubles, probability / 16.0);
		process(column, 11, doubles, probability / 16.0);
		process(column, 24, doubles, probability / 16.0);
		process(column, 39, doubles, probability / 16.0);
		process(column, 5, doubles, probability / 16.0);
		matrix[column][row] += (6.0 * probability) / 16.0;
		
		if (position == 7) {
			process(column, 12, doubles, probability / 16.0);
			process(column, 15, doubles, (2.0 * probability) / 16.0);
			process(column, 4, doubles, probability / 16.0);
		}
		if (position == 22) {
			process(column, 28, doubles, probability / 16.0);
			process(column, 25, doubles, (2.0 * probability) / 16.0);
			process(column, 19, doubles, probability / 16.0);
		}
		if (position == 36) {
			process(column, 12, doubles, probability / 16.0);
			process(column, 5, doubles, (2.0 * probability) / 16.0);
			process(column, 33, doubles, probability / 16.0);
		}
		return;
	}
	
	// ordinary square
	matrix[column][row] += probability;
}

int main()
{
	RR::SetPrecision(100);
	RR::SetOutputPrecision(10);
		
	RR vector[120];
	vector[0] = 1.0;
	
	// build up the markov chain matrix
	for (int pos = 0; pos < 40; pos++) {
		for (int dbl = 0; dbl < 3; dbl++) {
			
			// the source is (pos, doubles)
			int col = coor(pos, dbl);
			
			int tPos, tDbl;
			RR tProb;
			
			for (int sum = 2; sum <= 8; sum++) {
				int ways = sum < 5 ? sum - 1 : 9 - sum;
				
				if (ways % 2 == 0) {
					ways--;
					
					tPos = (pos + sum) % 40;
					tDbl = dbl + 1;
					tProb = 1.0 / 16.0; 
					process(col, tPos, tDbl, tProb);
				}
				
				tPos = (pos + sum) % 40;
				tDbl = 0;
				tProb = ways / 16.0;
				process(col, tPos, tDbl, tProb);
			}
			
			/*for (int sum = 2; sum <= 12; sum++) {
				int ways = sum < 7 ? sum - 1 : 13 - sum;
				
				if (ways % 2 == 0) {
					ways--;
					
					tPos = (pos + sum) % 40;
					tDbl = dbl + 1;
					tProb = 1.0 / 36.0; 
					process(col, tPos, tDbl, tProb);
				}
				
				tPos = (pos + sum) % 40;
				tDbl = 0;
				tProb = ways / 36.0;
				process(col, tPos, tDbl, tProb);
			}*/
		}
	}
	
	for (int i = 0; i < 1000; i++) {
		
		RR resVector[120];
		
		for (int row = 0; row < 120; row++) { 
			RR res;
			res = 0.0;
			
			for (int col = 0; col < 120; col++) {
				res += vector[col] * matrix[col][row];
			}
			resVector[row] = res;
		}
		
		for (int j = 0; j < 120; j++)
			vector[j] = resVector[j];
	}
	
	cout << "(";
	for (int i = 0; i < 40; i++) {
		RR x;
		x = vector[i] + vector[40 + i] + vector[80 +i];
		cout << i << " => " << x << "," << endl;
	}
	cout << ")" << endl;
}