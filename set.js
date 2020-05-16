class Set
{
	constructor()
	{
		this.data = [];
	}
	
	has(data)
	{
		for(var i = 0; i < this.data.length; i++)
		{
			if(this.data[i] === data)
			{
				return true;
			}
		}
		return false;
	}
	
	from(data)
	{
		this.data = data;
		
		return this;
	}
	
	add(data)
	{
		if(!this.has(data))
		{
			var dataLength = this.data.length;
			this.data[dataLength] = data;
		}
	}
	
	delete(data)
	{
		for(var i = 0; i < this.data.length; i++)
		{
			if(this.data[i] === data)
			{
				this.data.splice(i, 1);
				break;
			}
		}
	}
}

function main()
{	
	var set = new Set();
	set = set.from([10, 20]);
	
	console.log(set.data);
	
	console.log(set.has(10));
	console.log(set.has(30));
	
	set.add(10);
	console.log(set.data);
	
	set.delete(10);
	console.log(set.data);
	
	console.log(set.has(10));
}