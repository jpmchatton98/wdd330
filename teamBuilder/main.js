const pokedex = [];
var builtPokedex = [];

const typeIds = ['', 'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
const excluded = ['Raticate-totem-alola', 'Pikachu-partner-cap', 'Pikachu-alola-cap', 'Pikachu-kalos-cap', 'Pikachu-unova-cap', 'Pikachu-sinnoh-cap', 'Pikachu-hoenn-cap', 'Pikachu-original-cap', 'Pikachu-cosplay', 'Pikachu-libre', 'Pikachu-phd', 'Pikachu-pop-star', 'Pikachu-belle', 'Pikachu-rock-star', 'Marowak-totem',
				 'Pumpkaboo-super', 'Pumpkaboo-large', 'Pumpkaboo-small', 'Gourgeist-super', 'Gourgeist-large', 'Gourgeist-small', 'Gumshoos-totem', 'Vikavolt-totem', 'Ribombee-totem', 'Rockruff-own-tempo', 'Araquanid-totem', 'Lurantis-totem', 'Salazzle-totem',
				 'Minior-violet', 'Minior-indigo', 'Minior-blue', 'Minior-green', 'Minior-yellow', 'Minior-orange', 'Minior-red', 'Minior-violet-meteor', 'Minior-indigo-meteor', 'Minior-blue-meteor', 'Minior-green-meteor', 'Minior-yellow-meteor', 'Minior-orange-meteor', 'Mimikyu-totem-busted',
				 'Mimikyu-totem-disguised', 'Mimikyu-busted', 'Kommo-o-totem', 'Magearna-original', 'Greninja-battle-bond', 'Floette-eternal', 'Aegislash-blade', 'Zygarde-50', 'Togedemaru-totem'];
const orasMegas = ['beedrill-mega', 'pidgeot-mega', 'slowbro-mega', 'steelix-mega', 'sceptile-mega', 'swampert-mega', 'sableye-mega', 'sharpedo-mega', 'camperupt-mega', 'altaria-mega', 'glalie-mega', 'salamence-mega', 'metagross-mega', 'rayquaza-mega', 'lopunny-mega', 'gallade-mega', 'audino-mega', 'diancie-mega'];

var mode = "original-kanto";
var typeMode = 0;

var megas = true; //Whether to include mega evolutions
var regionals = true; //Whether to include regional forms
var fairies = true; //Whether to include the Fairy type
var gen1 = false; //Whether to use Gen 1 typings
var oras = true; //Whether the include mega evolutions added in ORAS

var team = [];
var teamSize = 0;

var preFairies = [];

class pokemon
{
	constructor(number, name, formid)
	{
		this.number = number;
		this.name = name;
		this.formid = formid;
	}
}

function createPreFairies()
{
	preFairies[0] = new pokemon(35, "clefairy", 35);
	preFairies[0].type1 = "normal";
	
	preFairies[1] = new pokemon(36, "clefable", 36);
	preFairies[1].type1 = "normal";
	
	preFairies[2] = new pokemon(39, "jigglypuff", 39);
	preFairies[2].type1 = "normal";
	
	preFairies[3] = new pokemon(40, "wigglytuff", 40);
	preFairies[3].type1 = "normal";
	
	preFairies[4] = new pokemon(122, "mr-mime", 122);
	preFairies[4].type1 = "psychic";
	
	preFairies[5] = new pokemon(173, "cleffa", 173);
	preFairies[5].type1 = "normal";
	
	preFairies[6] = new pokemon(174, "igglybuff", 174);
	preFairies[6].type1 = "normal";
	
	preFairies[7] = new pokemon(175, "togepi", 175);
	preFairies[7].type1 = "normal";
	
	preFairies[8] = new pokemon(176, "togetic", 176);
	preFairies[8].type1 = "normal";
	preFairies[8].type2 = "flying";
	
	preFairies[9] = new pokemon(183, "marill", 183);
	preFairies[9].type1 = "water";
	
	preFairies[10] = new pokemon(184, "azumarill", 184);
	preFairies[10].type1 = "water";
	
	preFairies[11] = new pokemon(209, "snubbull", 209);
	preFairies[11].type1 = "normal";
	
	preFairies[12] = new pokemon(210, "granbull", 210);
	preFairies[12].type1 = "normal";
	
	preFairies[13] = new pokemon(280, "ralts", 280);
	preFairies[13].type1 = "psychic";
	
	preFairies[14] = new pokemon(281, "kirlia", 281);
	preFairies[14].type1 = "psychic";
	
	preFairies[15] = new pokemon(282, "gardevoir", 282);
	preFairies[15].type1 = "psychic";
	
	preFairies[16] = new pokemon(298, "azurill", 298);
	preFairies[16].type1 = "normal";
	
	preFairies[17] = new pokemon(303, "mawile", 303);
	preFairies[17].type1 = "steel";
	
	preFairies[18] = new pokemon(439, "mime-jr", 439);
	preFairies[18].type1 = "psychic";
	
	preFairies[19] = new pokemon(468, "togekiss", 468);
	preFairies[19].type1 = "normal";
	preFairies[19].type2 = "flying";
	
	preFairies[20] = new pokemon(546, "cottonee", 546);
	preFairies[20].type1 = "grass";
	
	preFairies[21] = new pokemon(547, "whimsicott", 547);
	preFairies[21].type1 = "grass";
}

function addToTeam(i)
{
	if(teamSize < 6)
	{
		team[teamSize] = builtPokedex[i];
		teamSize++;
		
		for(let i = 0; i < teamSize; i++)
		{
			document.getElementById(i + "img").src = "./art/" + team[i].name + ".png";
			document.getElementById(i + "img").style.opacity = 100;
		}
	}
}
function removeFromTeam(id)
{
	if(teamSize > 0 && id + 1 >= teamSize)
	{
		team.splice(id, 1);
		
		for(let i = 0; i < 6; i++)
		{
			if(i + 1 >= teamSize)
			{
				document.getElementById(i + "img").src = "./art/" + "bulbasaur" + ".png";
				document.getElementById(i + "img").style.opacity = 0;
			}
			else
			{
				document.getElementById(i + "img").src = "./art/" + team[i].name + ".png";
				document.getElementById(i + "img").style.opacity = 100;
			}
		}
		
		teamSize--;
	}
}

function saveTeam()
{
	let teamName = document.getElementById("teamName").value;
	let jsonTeam = JSON.stringify(team);
	
	window.localStorage.setItem(teamName, jsonTeam);
	window.alert("Team saved as: " + teamName);
}
function loadTeam()
{
	let teamName = document.getElementById("teamName").value;
	
	if(window.localStorage.getItem(teamName) != null)
	{
		team = JSON.parse(window.localStorage.getItem(teamName));
		teamSize = team.length;
		
		for(let i = 0; i < 6; i++)
		{
			if(i + 1 > teamSize)
			{
				document.getElementById(i + "img").src = "./art/" + "bulbasaur" + ".png";
				document.getElementById(i + "img").style.opacity = 0;
			}
			else
			{
				document.getElementById(i + "img").src = "./art/" + team[i].name + ".png";
				document.getElementById(i + "img").style.opacity = 100;
			}
		}
	}
	else
	{
		window.alert("Team: " + teamName + " not found");
	}
}
function deleteTeam()
{
	let teamName = document.getElementById("teamName").value;
	let newTeam = window.localStorage.getItem(teamName);
	if(newTeam != null)
	{
		window.localStorage.removeItem(teamName);
		window.alert("Team: " + teamName + " deleted");
	}
	else
	{
		window.alert("Team: " + teamName + " not found");
	}
}
function clearTeams()
{
	window.localStorage.clear();
	window.alert("All saved teams deleted.");
}

function selectDex()
{
	mode = document.getElementById("pokedexSelect").value;
	formatList();
	
	for(let i = 0; i < 6; i++)
	{
		removeFromTeam(i);
	}
}

function formatList()
{
	typeMode = parseInt(document.getElementById("typeSelect").value);
	
	let masterList = document.getElementById("masterList");
	builtPokedex = [];
	
	let selecter = document.getElementById("pokedexSelect");
	let dexMode = selecter.options[selecter.selectedIndex].text;
	
	switch(dexMode)
	{
		case "National":
		{
			gen1 = false;
			fairies = true;
			megas = true;
			regionals = true;
			oras = true;
			
			break;
		}
		case "RBGY":
		{
			gen1 = true;
			fairies = false;
			megas = false;
			regionals = false;
			oras = false;
			
			break;
		}
		case "XY":
		{
			gen1 = false;
			fairies = true;
			megas = true;
			regionals = false;
			oras = false;
			
			break;
		}
		case "ORAS":
		{
			gen1 = false;
			fairies = true;
			megas = true;
			regionals = false;
			oras = true;
			
			break;
		}
		case "SM":
		{
			gen1 = false;
			fairies = true;
			megas = true;
			regionals = true;
			oras = true;
			
			break;
		}
		case "USUM":
		{
			gen1 = false;
			fairies = true;
			megas = true;
			regionals = true;
			oras = true;
			
			break;
		}
		case "Let's Go":
		{
			gen1 = false;
			fairies = true;
			megas = true;
			regionals = true;
			oras = true;
			
			break;
		}
		default: //GSC - B2W2
		{
			gen1 = false;
			fairies = false;
			megas = false;
			regionals = false;
			oras = false;
			
			break;
		}
	}
	
	switch(mode)
	{		
		case "national":
		{
			if(typeMode != 0)
			{
				builtPokedex = filterTypes(pokedex, typeMode);
			}
			else
			{
				builtPokedex = pokedex;
			}
			break;
		}
		case "original-kanto":
		{
			mode = "kanto";
			
			builtPokedex = buildDex();
			break;
		}
		case "kalos":
		{
			builtPokedex = buildKalosDex();
			break;
		}
		default:
		{
			builtPokedex = buildDex();
			break;
		}
	}
	
	masterList.innerHTML = null;
	
	for(let i = 0; i < builtPokedex.length; i++)
	{		
		masterList.innerHTML += `<img class="icon" src="./sprites/${builtPokedex[i].name}.png" onClick="addToTeam(${i})">`;
	}
}

function buildKalosDex()
{
	var innerpokedex = [];
	
	mode = "kalos-central";
	innerpokedex.push.apply(innerpokedex, buildDex());
	mode = "kalos-coastal";
	innerpokedex.push.apply(innerpokedex, buildDex());
	mode = "kalos-mountain";
	innerpokedex.push.apply(innerpokedex, buildDex());
	
	return innerpokedex;
}

function buildDex()
{
	getPokedex();
	
	let innerpokedex = [];
	let primitive = JSON.parse(document.getElementById("pokedex").innerHTML).pokemon_entries;
	
	for(let i = 0; i < primitive.length; i++)
	{
		let url = primitive[i].pokemon_species.url.split("/");
		let pokedexNum = url[url.length - 2];
		
		let newPokemon = 0;
		let currPokemon = 0;
		
		if(!megas && !regionals)
		{
			currPokemon = pokedex.filter(element => (element.number === pokedexNum && !element.name.includes("-mega") && !element.name.includes("-alola")));
		}
		else if(megas && !regionals)
		{
			currPokemon = pokedex.filter(element => (element.number === pokedexNum && !element.name.includes("-alola")));
		}
		else if(!megas && regionals)
		{
			currPokemon = pokedex.filter(element => (element.number === pokedexNum && !element.name.includes("-mega")));
		}
		else
		{
			currPokemon = pokedex.filter(element => element.number === pokedexNum);
		}
		
		for(let j = 0; j < currPokemon.length; j++)
		{
			newPokemon = new pokemon(currPokemon[j].number, currPokemon[j].name, currPokemon[j].formid);
			newPokemon.type1 = currPokemon[j].type1;
			newPokemon.type2 = currPokemon[j].type2;
			
			innerpokedex[innerpokedex.length] = newPokemon;
		}
	}
	
	if(!fairies)
	{
		for(let i = 0; i < preFairies.length; i++)
		{
			let currPokemon = innerpokedex.findIndex(element => (element.formid == preFairies[i].formid));
			
			if(currPokemon != -1)
			{
				innerpokedex[currPokemon].type1 = preFairies[i].type1;
				innerpokedex[currPokemon].type2 = preFairies[i].type2;
			}
		}
	}
	
	if(!oras)
	{
		for(let i = 0; i < orasMegas.length; i++)
		{
			let id = innerpokedex.findIndex(element => (element.name == orasMegas[i]));
			
			if(id != -1)
			{
				innerpokedex.splice(id, 1);
			}
		}
	}
	
	if(gen1)
	{
		innerpokedex[innerpokedex.findIndex(element => (element.name == "magnemite"))].type2 = "empty";
		innerpokedex[innerpokedex.findIndex(element => (element.name == "magneton"))].type2 = "empty";
	}
	
	if(typeMode != 0)
	{
		innerpokedex = filterTypes(innerpokedex, typeMode);
	}
	
	return innerpokedex;
}

function filterTypes(builtPokedex, type)
{
	let filteredPokedex = [];
	
	for(let i = 0; i < builtPokedex.length; i++)
	{
		if(builtPokedex[i].type1 === typeIds[type] || builtPokedex[i].type2 === typeIds[type])
		{
			filteredPokedex[filteredPokedex.length] = builtPokedex[i];
		}
	}
	
	return filteredPokedex;
}

function getPokedex()
{
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			document.getElementById("pokedex").innerHTML = this.responseText;
		}
	};
	
	xmlHttp.open("GET", "https://pokeapi.co/api/v2/pokedex/" + mode, false);
	xmlHttp.send();
}

function getPokemon()
{
	getList();
	let primitive = JSON.parse(document.getElementById("pokemonList").innerHTML);
	
	for(let i = 0; i < primitive.results.length; i++)
	{
		let poke = null;
		
		let url = primitive.results[i].url.split("/");
		let pokedexNum = url[url.length - 2];
		
		poke = new pokemon(pokedexNum, primitive.results[i].name, pokedexNum);
		
		let otherIndex = pokedex.findIndex(element => (poke.name.includes(element.name.split("-")[0]) &&
													   (element.name != "paras" &&
														element.name != "abra" &&
														element.name != "nidoran-f" &&
														element.name != "ho-oh" &&
														poke.name != "pyukumuku" &&
														element.name != "porygon" &&
														!element.name.includes("tapu") &&
														poke.name != "klinklang") &&
													    poke.name != "volcarona") &&
														poke.name != "kabutops");
		
		if(excluded.find(element => (poke.name === unCapitalize(element))) == undefined)
		{
			if(otherIndex != -1)
			{
				poke.number = pokedex[otherIndex].number;
				pokedex.splice(otherIndex + 1, 0, poke);
			}
			else
			{
				pokedex[i] = poke;
			}
		}
	}
	
	for(let i = 1; i <= 18; i++)
	{
		getType(i);
		let typeListing = JSON.parse(document.getElementById("types").innerHTML);
		
		for(let j = 0; j < typeListing.length; j++)
		{
			let url = typeListing[j].pokemon.url.split("/");
			let formNum = url[url.length - 2];
			
			let index = pokedex.findIndex(element => element.formid == formNum);
			
			if(index != -1)
			{				
				if(typeListing[j].slot == "2")
				{
					pokedex[index].type2 = typeIds[i];
				}
				else
				{
					pokedex[index].type1 = typeIds[i];
				}
			}
		}
	}
	
	formatList();
}

function getList()
{
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			document.getElementById("pokemonList").innerHTML = this.responseText;
		}
	};
	
	xmlHttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?limit=1000000000", false);
	xmlHttp.send();
	
	createPreFairies();
}

function getType(number)
{
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			document.getElementById("types").innerHTML = JSON.stringify(JSON.parse(this.responseText).pokemon);
		}
	};
	
	xmlHttp.open("GET", "https://pokeapi.co/api/v2/type/" + number, false);
	xmlHttp.send();
}

function capitalize(input)
{
	return input.charAt(0).toUpperCase() + input.slice(1);
}
function unCapitalize(input)
{
	return input.charAt(0).toLowerCase() + input.slice(1);
}