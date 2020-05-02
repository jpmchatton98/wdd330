function displayText()
{
	const textInput = document.getElementById("textInput").value;
	document.getElementById("textDisplay").innerHTML = textInput;
}

function sumUp()
{
	const numInput = Number(document.getElementById("numInput").value);
	
	var endNumber = 0;
	for(var i = numInput; i > 0; i--)
	{
		endNumber += i;
	}
	
	document.getElementById("numberDisplay").innerHTML = endNumber;
}

function add()
{	
	document.getElementById("calcResult").innerHTML = Number(document.getElementById("num1").value) + Number(document.getElementById("num2").value);
}

subtract = function()
{
	document.getElementById("calcResult").innerHTML = Number(document.getElementById("num1").value) - Number(document.getElementById("num2").value);
}

multiply = () => 
{
	document.getElementById("calcResult").innerHTML = Number(document.getElementById("num1").value) * Number(document.getElementById("num2").value);
}