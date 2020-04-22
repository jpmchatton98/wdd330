function loadStory()
{
	var storyName = document.getElementById("storyName").value';
	var storyHTML = localStorage.getItem(storyName);
	document.getElementById("story").value = storyHTML;
}
function saveStory()
{
	var storyName = document.getElementById("storyName").value';
	var storyHTML = document.getElementById("story").value';
	localStorage.setItem(storyName, storyHTML);
}
function displayStory()
{
	var storyHTML = document.getElementById("story").value';
	document.getElementById("storyDisplay").innerHTML = storyHTML;
}