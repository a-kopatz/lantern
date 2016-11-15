var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extra = require('./extra').schema;
var arrayExtensions = require('./arrayExtensions');
var constants = require('./constants');
var utility = require("./utility");
var Output = require("./output");

var exitSchema = new schema({
	direction: String,
	description: String,
	keyId: Number,
	keywords: [],
	isClosable: Boolean,
	isClosed: Boolean,
	isLockable: Boolean,
	isLocked: Boolean,
	isPickproof: Boolean,
	toRoomId: Number
});

exitSchema.methods.getDescription = function() {
	var result = [];
	
	if(this.description.length > 0) {
		result.push(this.description);
	}
	else {
		result.push("You see nothing special in that direction.");
	}
	
	return result;
};

var roomSchema = new schema({
	id: Number,
	title: String,
	description: String,
	exits: [ exitSchema ],
	players: [],
	npcs: [],
	contents: [],
	extras: [ extra ]
});

roomSchema.methods.addItem = function(item) {
	this.contents.push(item);
	item.room = this;
};

roomSchema.methods.removeItem = function(item) {
	this.contents.splice(this.contents.indexOf(item), 1);
	item.room = null;
};

roomSchema.methods.contains = function(item) {
	for (var i = 0; i < this.contents.length; i++) {
		if (this.contents[i] === item) {
			return true;
		}
	}

	return false;
};

roomSchema.methods.addCharacter = function(character) {

	if(character.isNpc()) {
		this.npcs.push(character);
	}
	else {
		this.players.push(character);
	}
	
	character.room = this;
};

roomSchema.methods.removeCharacter = function(character) {
	if(character.isNpc()) {
		this.npcs.splice(this.npcs.indexOf(character), 1);
	}
	else {
		this.players.splice(this.players.indexOf(character), 1);
	}
	character.room = null;
};

roomSchema.methods.getCharacter = function(parameter) {
	var name = parameter;
	var member = 1;

	if (parameter.indexOf(".") > -1) {
		var tokens = parameter.split(".");

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

roomSchema.methods.getPlayer = function(name) {
	var key = name.toLowerCase();

	for (var i = 0; i < this.players.length; i++) {
		if (this.players[i].name.toLowerCase() === key) {
			return this.players[i];
		}
	}

	return null;
};

roomSchema.methods.getPlayers = function() {
	return this.players;
};

roomSchema.methods.getExit = function(direction) {
	var formattedDirection = direction.substr(0, 1).toLowerCase();
	
	for(var i = 0; i < this.exits.length; i++) {
		if(this.exits[i].direction.toLowerCase() === formattedDirection) {
			return this.exits[i];
		}
	}
	
	return null;
};

roomSchema.methods.listExits = function(character) {
	var output = new Output(character);
	
	// TODO: Blind, Dark

	output.toActor.push( { text: "Obvious Exits:" } );
	
	for(var i = 0; i < this.exits.length; i++) {
		if(this.exits[i].isClosed === false) {
			var connectedRoom = character.world.getRoom(this.exits[i].toRoomId);
			
			if(connectedRoom !== null) {
				output.toActor.push ( { text: "  " + this.exits[i].direction + " - " + connectedRoom.title } );
			}
		}
	}
	
	return output;
};

roomSchema.methods.getAdjacentRoom = function(exit) {
	if(exit !== null) {
		if(exit.isClosed !== null) {
			var adjacentRoom = this.world.getRoom(exit.toRoomId);
			
			if(adjacentRoom !== null) {
				return adjacentRoom;
			}
		}
	}
	
	return null;
};

roomSchema.methods.getAdjacentRooms = function() {
	var rooms = [];
	
	for(var i = 0; i < this.exits.length; i++) {
		var room = this.getAdjacentRoom(this.exits[i]);
		
		if(room !== null) {
			rooms.push(room);
		}
	}

	return rooms;
};

roomSchema.methods.getContentsExtras = function() {
	var result = [];
	
	for(var i = 0; i < this.contents.length; i++) {
		for(var j = 0; j < this.contents[i].extras.length; j++) {
			result.push(this.contents[i].extras[j]);
		}
	}
	
	return result;
};

roomSchema.methods.showRoomToCharacter = function(character) {
	var output = new Output(character);

// // 	// TODO: Dark room, blind character

	output.toActor.push( { text: this.title, color: "Cyan" } );
	
	output.toActor.push( { text: utility.getFormattedLongString(this.description, true), color: "Gray" } );

	var exitsMessage = "";

	for(var i = 0; i < this.exits.length; i++) {
		var exit = this.exits[i];
		
		if(exit.isClosed) {
			exitsMessage = exitsMessage + " " + exit.direction.toLowerCase();
		}
		else {
			exitsMessage = exitsMessage + " " + exit.direction.toUpperCase();
		}
	}
	
	if(exitsMessage === "") {
		exitsMessage = " None!";
	}
	
	output.toActor.push( { text: "[ Exits:" + exitsMessage + " ]", color: "Cyan" } );

// FIXME: This feels broken -- it's different than almost everything else
//        But it would mean that each 'text' of the output would have its own TARGET
 	for (var i = 0; i < this.players.length; i++) {
 		if (this.players[i] !== character) {
 			// TODO: if character.canSee(this.players[i])
 			
 			switch(this.players[i].position) {
 				case global.POS_SITTING:
 					if(this.players[i].using === undefined || this.players[i].using === null) {
 						output.toActor.push( { text: this.players[i].getDescription() + " is sitting on the floor here.", color: "Orange" } );
 					}
 					else {
 						output.toActor.push( { text: this.players[i].getDescription() + " is sitting on " + this.players[i].using.shortDescription + ".", color: "Orange" } );
 					}
 					break;
 				case global.POS_RESTING:
 					if(this.players[i].using === undefined || this.players[i].using === null) {
 						output.toActor.push( { text: this.players[i].getDescription() + " is resting on the floor here.", color: "Orange" } );
 					}
 					else {
 						output.toActor.push( { text: this.players[i].getDescription() + " is resting on " + this.players[i].using.shortDescription + ".", color: "Orange" } );
 					}
 					break;
 				case global.POS_SLEEPING:
 					if(this.players[i].using === undefined || this.players[i].using === null) {
 						output.toActor.push( { text: this.players[i].getDescription() + " is sleeping on the floor here.", color: "Orange" } );
 					}
 					else {
 						output.toActor.push( { text: this.players[i].getDescription() + " is sleeping on " + this.players[i].using.shortDescription + ".", color: "Orange" } );
 					}
 					break;
 				default:
 					output.toActor.push( { text: this.players[i].getDescription() + " is here.", color: "Orange" } );
 					break;
 			}
 		}
 	}
 	
 	for(var j = 0; j < this.npcs.length; j++) {
 		// TODO: if character.canSee(this.npcs[i])
 		output.toActor.push( { text: this.npcs[j].getDescription(), color: "Orange" } );
 	}

	var itemMapResult = utility.buildItemMap(this, this.contents, null, Number.POSITIVE_INFINITY, function() { return false; }, "", "");

	for (var value of itemMapResult.map.values()) {
		if(value.quantity === 1) {
			output.toActor.push( { text: value.long, color: "Green" } );
		}
		else {
	 		output.toActor.push( { text: value.quantity + " " + value.plural + " are on the floor here.", color: "Green" } );
		}
	}
		
	return output;
};


roomSchema.methods.isShop = function() {
	return false;
}
function load(callback) {
	roomModel.find({}, function(err, docs) {
		// TODO: log error
		console.log(err);
		callback(docs);
	});
}

var exitModel = mongoose.model('exit', exitSchema);
var roomModel = mongoose.model('room', roomSchema);

module.exports = {
	roomSchema: roomSchema,
	room: roomModel,
	exitSchema: exitSchema,
	exit: exitModel,
	load: load
};