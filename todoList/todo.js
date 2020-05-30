var toDoList;
var list;
var storage;

var filter;

function startup()
{
	storage = window.localStorage;
	list = document.getElementById("list");
	toDoList = [];
	filter = 0;
	
	var jsonList = storage.getItem("list");
	if(jsonList != null)
	{
		toDoList = JSON.parse(jsonList);
		
		allFilter();
	}
	
	var input = document.getElementById("newItem");
	input.addEventListener("keyup", function(e)
						   {
								if(e.keyCode === 13)
								{
									e.preventDefault();
									document.getElementById("submit").click();
								}
						   });
}

function saveList()
{
	var jsonList = JSON.stringify(toDoList);
	
	storage.setItem("list", jsonList);
}

class toDo
{
	constructor(content)
	{
		this.content = content;
		this.timestamp = new Date().getTime();
		this.completed = false;
	}
}

function removeWarning()
{
	document.getElementById("warning").innerHTML = "";
}

function clearList()
{
	if(list.rows.length > 0)
	{
		for(var i = list.rows.length - 1; i >= 0; i--)
		{
			list.deleteRow(i);
		}
	}
	
	localStorage.clear();
	
	toDoList = [];
}

function clearTable()
{
	if(list.rows.length > 0)
	{
		for(var i = list.rows.length - 1; i >= 0; i--)
		{
			list.deleteRow(i);
		}
	}
}

function allFilter()
{
	clearTable();
	
	for(var i = 0; i < toDoList.length; i++)
	{
		addExistingItem(toDoList[i].content, toDoList[i].completed);
	}
	filter = 0;
}
function completeFilter()
{
	clearTable();
	
	for(var i = 0; i < toDoList.length; i++)
	{
		if(toDoList[i].completed)
		{
			addExistingItem(toDoList[i].content, toDoList[i].completed);
		}
	}
	filter = 1;
}
function incompleteFilter()
{
	clearTable();
	
	for(var i = 0; i < toDoList.length; i++)
	{
		if(!toDoList[i].completed)
		{
			addExistingItem(toDoList[i].content, toDoList[i].completed);
		}
	}
	filter = 2;
}

function addItem()
{
	var newItemBox = document.getElementById("newItem");
	var newItemContent = newItemBox.value;
	
	var exists = false;
	for(var i = 0; i < toDoList.length; i++)
	{
		if(toDoList[i].content === newItemContent)
		{
			exists = true;
		}
	}
	
	if(!exists)
	{
		var newItem = new toDo(newItemContent);
		
		var newRow = list.insertRow(list.rows.length);
		newRow.insertCell(0).innerHTML = "<button id=" + newItem.content.replace(" ", "") + "Complete" + ">O</button>";
		newRow.insertCell(1).innerHTML = "<div id=" + newItem.content.replace(" ", "") + "Content" + ">" + newItem.content + "</div>";
		newRow.insertCell(2).innerHTML = "<button id=" + newItem.content.replace(" ", "") + "Delete" + ">Delete</button>";
		
		var newItemComplete = document.getElementById(newItem.content.replace(" ", "") + "Complete");
		var newItemDelete = document.getElementById(newItem.content.replace(" ", "") + "Delete");
		
		newItemComplete.addEventListener("click", completeItem);
		newItemDelete.addEventListener("click", deleteItem);
		
		toDoList[toDoList.length] = newItem;
		
		newItemBox.value = "";
		
		document.getElementById("warning").innerHTML = "";
		
		if(filter == 0)
		{
			allFilter();
		}
		else if(filter == 1)
		{
			completeFilter();
		}
		else
		{
			incompleteFilter();
		}
	}
	else
	{
		document.getElementById("warning").innerHTML = "Item Already Exists";
	}
	
	saveList();
}

function addExistingItem(itemContent, complete)
{	
	var newRow = list.insertRow(list.rows.length);
	if(!complete)
	{
		newRow.insertCell(0).innerHTML = "<button id=" + itemContent.replace(" ", "") + "Complete" + ">O</button>";
	}
	else
	{
		newRow.insertCell(0).innerHTML = "<button id=" + itemContent.replace(" ", "") + "Complete" + ">Ø</button>";
	}
	
	newRow.insertCell(1).innerHTML = "<div id=" + itemContent.replace(" ", "") + "Content" + ">" + itemContent + "</div>";
	newRow.insertCell(2).innerHTML = "<button id=" + itemContent.replace(" ", "") + "Delete" + ">Delete</button>";
	
	var contentStyle = document.getElementById(itemContent.replace(" ", "") + "Content").style;
	
	if(!complete)
	{
		contentStyle.textDecoration = "";
	}
	else
	{
		contentStyle.textDecoration = "line-through";
	}
	
	var newItemComplete = document.getElementById(itemContent.replace(" ", "") + "Complete");
	var newItemDelete = document.getElementById(itemContent.replace(" ", "") + "Delete");
	
	newItemComplete.addEventListener("click", completeItem);
	newItemDelete.addEventListener("click", deleteItem);
}

function completeItem(e)
{
	var button = e.target;
	var content = document.getElementById(button.id.replace("Complete", "Content"));
	var itemName = button.id.replace("Complete", "");
	
	var item = null;
	for(var i = 0; i < toDoList.length; i++)
	{
		if(toDoList[i].content.replace(" ", "") === itemName)
		{
			item = toDoList[i];
			break;
		}
	}
	
	if(item == null)
	{
		return -1;
	}
	
	item.completed = !item.completed;
	
	if(button.innerHTML == "O")
	{
		button.innerHTML = "Ø";
	}
	else
	{
		button.innerHTML = "O";
	}
	
	var contentStyle = content.style;
	
	if(contentStyle.textDecoration == "")
	{
		contentStyle.textDecoration = "line-through";
	}
	else
	{
		contentStyle.textDecoration = "";
	}
	
	saveList();
}

function deleteItem(e)
{
	var button = e.target;
	
	var row = button.parentElement.parentElement;
	var rowIndex = row.rowIndex;
	
	row.parentElement.parentElement.deleteRow(rowIndex);
	
	toDoList.splice(rowIndex, 1);
	
	saveList();
}