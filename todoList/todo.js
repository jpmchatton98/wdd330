var toDoList;
var list;

function startup()
{
	toDoList = [];
	list = document.getElementById("list");
}

class toDo
{
	constructor(content)
	{
		this.content = content;
		this.timestamp = new Date().getTime();
		this.completed = false;
	}
	
	complete()
	{
		this.completed = !this.completed;
	}
}

function removeWarning()
{
	document.getElementById("warning").innerHTML = "";
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
		
		var newRow = list.insertRow(toDoList.length);
		newRow.insertCell(0).innerHTML = "<button id=" + newItem.content + "Complete" + ">O</button>";
		newRow.insertCell(1).innerHTML = "<div id=" + newItem.content + "Content" + ">" + newItem.content + "</div>";
		newRow.insertCell(2).innerHTML = "<button id=" + newItem.content + "Delete" + ">Delete</button>";
		
		var newItemComplete = document.getElementById(newItem.content + "Complete");
		var newItemDelete = document.getElementById(newItem.content + "Delete");
		
		newItemComplete.addEventListener("click", completeItem);
		newItemDelete.addEventListener("click", deleteItem);
		
		toDoList[toDoList.length] = newItem;
		
		newItemBox.value = "";
		
		document.getElementById("warning").innerHTML = "";
	}
	else
	{
		document.getElementById("warning").innerHTML = "Item Already Exists";
	}
}

function completeItem(e)
{
	var button = e.target;
	var content = document.getElementById(button.id.replace("Complete", "Content"));
	var itemName = button.id.replace("Complete", "");
	
	var item = null;
	for(var i = 0; i < toDoList.length; i++)
	{
		if(toDoList[i].content === itemName)
		{
			item = toDoList[i];
			break;
		}
	}
	
	if(item == null)
	{
		return -1;
	}
	
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
	
	item.complete();
}

function deleteItem(e)
{
	var button = e.target;
	
	var row = button.parentElement.parentElement;
	var rowIndex = row.rowIndex;
	
	row.parentElement.parentElement.deleteRow(rowIndex);
	
	toDoList.splice(rowIndex, 1);
}