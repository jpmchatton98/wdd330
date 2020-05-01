const rainbow = ["red","orange","yellow","green","blue","indigo","purple"];

function changeColor()
{
	document.body.style.background = rainbow[Math.floor(7 * Math.random())];
}