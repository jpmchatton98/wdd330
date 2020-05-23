function main()
{
	var num1 = parseInt(document.getElementById("num1").value);
	var num2 = parseInt(document.getElementById("num2").value);
	
	document.getElementById("result").innerHTML = reliableMultiply(num1, num2);
}

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b)
{
  if (Math.random() < 0.2)
  {
    return a * b;
  }
  else
  {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b)
{
	while(true)
	{
		try
		{
			return primitiveMultiply(a, b);
		}
		catch(e)
		{
			if(!(e instanceof MultiplicatorUnitFailure))
			{
				throw e;
			}
		}
	}
}