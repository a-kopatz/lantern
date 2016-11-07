var constants = require('./constants');
var arrayExtensions = require('./arrayExtensions');

// Object constructor
function World() {
    this.rooms = [];
 	this.players = [];
 	this.npcs = [];
 	this.items = [];
	this.zones = [];
	this.shops = [];
	this.time = null;
}

// // Public Properties
World.prototype.rooms;
World.prototype.players;
World.prototype.npcs;
World.prototype.zones;
World.prototype.shops;
World.prototype.items;
World.prototype.time;


World.prototype.getRoom = function(id) {
	for(var i = 0; i < this.rooms.length; i++) {
		if(this.rooms[i].id === id) {
			return this.rooms[i];
		}
	}
	
	return null;
};

World.prototype.getStartRoom = function() {
    return this.getRoom(global.START_ROOM);
};

World.prototype.getShop = function(id) {
	for(var i = 0; i < this.shops.length; i++) {
		if(this.shops[i].roomId === id) {
			return this.shops[i];
		}
	}
	
	return null;
};

World.prototype.addCharacter = function(character) {
	if(character.isNpc()) {
		this.npcs.push(character);
	}
	else {
		this.players.push(character);
	}
	
	character.world = this;
};

World.prototype.removeCharacter = function(character) {
	if(character.isNpc()) {
		this.npcs.splice(this.npcs.indexOf(character), 1);
	}
	else {
		this.players.splice(this.players.indexOf(character), 1);
	}	
	
	character.world = null;
};

World.prototype.getNPC = function(npcId) {
	for(var i = 0; i < this.npcs.length; i++) {
		if(this.npcs[i].id === npcId) {
			return this.npcs[i];
		}
	}
	
	return null;
};

World.prototype.countNPCs = function(npcId) {
	var count = 0;
	
	for(var i = 0; i < this.npcs.length; i++) {
		if(this.npcs[i].id === npcId) {
				count++;
		}
	}
	
	return count;
};

World.prototype.addItem = function(item) {
	this.items.push(item);
	item.world = this;
};

World.prototype.removeItem = function(item) {
	this.items.splice(this.items.indexOf(item), 1);
	item.world = null;
};

World.prototype.countItem = function(itemId) {
	var count = 0;
	
	for(var i = 0; i < this.items.length; i++) {
		if(this.items[i].id === itemId) {
			count++;
		}
	}
	
	return count;
};

World.prototype.getCharacter = function(searchParameter) {
	var name = searchParameter;
	var member = 1;
	
	if(searchParameter.indexOf(".") > -1) {
		var tokens = searchParameter.split(".");
		
		member = parseInt(tokens[0], 10);
		name = tokens[1];
	}
	
	if(member === 0) {
		return this.getPlayer(name);
	}
	else {
		var counter = 0;
		var player = this.getPlayer(name);

		if(player !== null) {
			counter++;
			
			if(counter === member) {
				return player;
			}
		}
		
		var key = name.toLowerCase();
		
		for (var i = 0; i < this.npcs.length; i++) {
			for (var j = 0; j < this.npcs[i].keywords.length; j++) {
				if (this.npcs[i].keywords[j].toLowerCase() === key) { 
					counter++;
					break;
				}
			}
			
			if(counter === member) {
				return this.npcs[i];
			}
		}
	}
	
	return null;
};

World.prototype.getPlayer = function(name) {
	var key = name.toLowerCase();	
	
	for(var i = 0; i < this.players.length; i++)	{
		if(this.players[i].name.toLowerCase() === key) {
			return this.players[i];
		}
	}
	
	return null;
};

// TODO: Time and Weather?
// TODO: Maybe shops too?


World.prototype.updateNPCs = function() {
	for(var i = 0; i < this.npcs.length; i++) {
// 		this.mobs[i].performActivity();
	}
};

World.prototype.hourElapsed = function() {
 //   this.time.advanceHour();
 //   this.time.save(function(err) {
 //   	console.log(err);
 //   });
    
 //   if(this.time.hour % 24 === 0) {
	// 	for(var i = 0; i < this.players.length; i++) {
	// 		this.players[i].dailyUpdate();
	// 	}
 //   }
    
	for(var i = 0; i < this.players.length; i++) {
		this.players[i].hourlyUpdate();
	}
	
	// for(var i = 0; i < this.mobs.length; i++) {
	// 	this.mobs[i].hourlyUpdate();
	// }
};



// Exports
module.exports = World;
