<Query Kind="Program">
  <Reference>&lt;RuntimeDirectory&gt;\System.Numerics.dll</Reference>
  <Namespace>System.Numerics</Namespace>
</Query>

void Main()
{
	int sum = 0;
	for (int n = 2; n < 100; n++) {
		sum += Sqrt(n, 99);
	}
	
	Console.Write(sum);
}

// Define other methods and classes here

struct DecimalPlaces
{
	public int Exponent;
	public BigInteger Number;
}


int Sqrt(int number, int places)
{
	DecimalPlaces res = new DecimalPlaces { Exponent = 0, Number = 0 };
	
	// first calculate the integer part
	for (int i = 1; i <= 10; i++) {
		if (i * i > number) {
			res.Number = i - 1;
			break;
		}
	}
	
	int sum = (int)res.Number;
	bool nonzero = false;
	
	// now for the decimal part
	for (int p = 0; p < places; p++) {
		res.Exponent++;
	
		var digit = -1;
	
		for (int d = 1; d <= 9; d++) {
			var n = res.Number * 10 + d;
			
			if (n * n > number * BigInteger.Pow(10, 2 * res.Exponent)) {
				digit = d - 1;
				break;
			}
		}
		
		if (digit == -1)
			digit = 9;
			
		res.Number = res.Number * 10 + digit;
		sum += digit;
		
		if (digit != 0)
			nonzero = true;
	}
	
	if (nonzero)
		return sum;
	else
		return 0;
}