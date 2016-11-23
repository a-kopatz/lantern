var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extra = require('./extra').schema;
var arrayExtensions = require('./arrayExtensions');
var constants = require('./constants');
var utility = require("./utility");
var Output = require("./output");
var autoIncrement = require('mongoose-auto-increment');

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
	bmiLimit: Number,
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
	id: { type: Number, default: -1 },
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
	
	if(character.level >= global.LEVEL_ADMINISTRATOR) {
		output.toActor.push( { text: "{ Room ID:" + this.id + "}", color: "Yellow" } );
	}
	
	if(this.description !== undefined && this.description !== null && this.description.length > 0) {
		output.toActor.push( { text: utility.getFormattedLongString(this.description, true), color: "Gray" } );
	}

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
};

function load(callback) {
	roomModel.find({}, function(err, docs) {
		// TODO: log error
		// console.log(err);
		callback(docs);
	});
}

//////////// ONLINE CREATION FUNCTIONS

function addRoom(roomTitle, character) {
	var room = new roomModel();
	room.title = roomTitle;
	room.save(function(err) {
        // TODO: Log error, I guess?
        if(err !== null) {
            console.log(err);
        }
        character.emitMessage('New room saved!');
        
        roomModel.find( { "_id":room._id }, function(err, docs) {
			// TODO: Log error, I guess?
			
			if(docs.length > 0) {
				character.world.rooms.push(docs[0]);
				character.emitMessage('New room is ' + docs[0].id);
			}
        });
    });
}

function deleteRoom(roomId, character) {
	if(isNaN(roomId)) {
		character.emitMessage('What room ID did you want to delete?');
		return;
	}
	
	var id = parseInt(roomId, 10);
	var room = character.world.getRoom(id);
	
	if(room === null) {
		character.emitMessage('That room does not seem to exist....');
		return;
	}
	
	if(room.contents.length !== 0 || room.players.length !== 0 || room.npcs.length !== 0) {
		character.emitMessage('That room is not empty!');
		return;
	}
	
	roomModel.remove( { "id":id}, function(err) {
        // TODO: Log error, I guess?
        if(err !== null) {
            console.log(err);
        }
        character.emitMessage('Room deleted!');
        
        for(var i = 0; i < character.world.rooms.length; i++) {
			if(character.world.rooms[i].id === id) {
				character.world.rooms.splice(i, 1);
				break;
			}
		}
	});
}

function setTitle(roomId, character, newTitle) {
	if(isNaN(roomId)) {
		character.emitMessage('What room ID did you want to re-title?');
		return;
	}
	
	var id = parseInt(roomId, 10);
	var room = character.world.getRoom(id);
	
	if(room === null) {
		character.emitMessage('That room does not seem to exist....');
		return;
	}
	
	room.title = newTitle;

	roomModel.find( { "id":id }, function(err, docs) {
		if(docs.length > 0) {
			docs[0].title = newTitle;
			docs[0].save(function(err) {
		        // TODO: Log error, I guess?
		        if(err !== null) {
		            console.log(err);
		        }
		        character.emitMessage('Room updated.');
			});
		}
	});
}

// TODO: This feels a lot like 'setTitle'....
function setDescription(roomId, character, newDescription) {
	if(isNaN(roomId)) {
		character.emitMessage('What room ID did you want to update?');
		return;
	}
	
	var id = parseInt(roomId, 10);
	var room = character.world.getRoom(id);
	
	if(room === null) {
		character.emitMessage('That room does not seem to exist....');
		return;
	}
	
	room.description = newDescription;

	roomModel.find( { "id":id }, function(err, docs) {
		if(docs.length > 0) {
			docs[0].description = newDescription;
			docs[0].save(function(err) {
		        // TODO: Log error, I guess?
		        if(err !== null) {
		            console.log(err);
		        }
		        character.emitMessage('Room updated.');
			});
		}
	});
}

function addExit(roomId, character, direction, toRoomId) {
	if(isNaN(roomId)) {
		character.emitMessage('What room ID did you want to update?');
		return;
	}
	
	if(isNaN(toRoomId)) {
		character.emitMessage('What room ID did you want to update?');
		return;
	}
	
	var id = parseInt(roomId, 10);
	var room = character.world.getRoom(id);
	var toId = parseInt(toRoomId, 10);
	
	if(room.exits === undefined || room.exits === null) {
		room.exits = [];
	}
	
	for(var i = 0; i < room.exits.length; i++) {
		if(room.exits[i].direction.toLowerCase() === direction.toLowerCase()) {
			character.emitMessage('That room already has a direction ' + direction + '.');
			return;
		}
	}
	
	var exit = new exitModel();
	exit.direction = direction.toUpperCase();
	exit.toRoomId = toId;
	
	room.exits.push(exit);
	
	roomModel.find( { "id":id }, function(err, docs) {
		if(docs.length > 0) {
			docs[0].exits.push(exit);
			docs[0].save(function(err) {
		        if(err !== null) {
		            console.log(err);
		        }
		        character.emitMessage('Exit added!');
			});
		}
		else {
			character.emitMessage("Could not find that room in DB.... weird!");
		}
	});
}

function removeExit(roomId, character, direction) {
	if(isNaN(roomId)) {
		character.emitMessage('What room ID did you want to update?');
		return;
	}
	
	var id = parseInt(roomId, 10);
	var room = character.world.getRoom(id);

	if(room === null) {
		character.emitMessage('That room does not exist!');
		return;
	}

	for(var i = 0; i < room.exits.length; i++) {
		if(room.exits[i].direction.toLowerCase() === direction.toLowerCase()) {
			room.exits.splice(i, 1);
			break;
		}
	}
	
	roomModel.find( { "id":id }, function(err, docs) {
		if(docs.length > 0) {
			for(var i = 0; i < docs[0].exits.length; i++) {
				if(docs[0].exits[i].direction.toLowerCase() === direction.toLowerCase()) {
					docs[0].exits.splice(i, 1);
					break;
				}
			}
			
			docs[0].save(function(err) {
		        if(err !== null) {
		            console.log(err);
		        }
		        character.emitMessage('Exit removed!');
			});
		}
		else {
			character.emitMessage("Could not find that room in DB.... weird!");
		} 
	});
}

function doorEdit(roomId, character, direction) {
	if(isNaN(roomId)) {
		character.emitMessage('What room ID did you want to update?');
		return;
	}
	
	var id = parseInt(roomId, 10);
	var room = character.world.getRoom(id);
	
	if(room === null) {
		character.emitMessage('That room does not exist!');
		return;
	}
	
	var found = false;
	
	for(var i = 0; i < room.exits.length; i++) {
		if(room.exits[i].direction.toLowerCase() === direction.toLowerCase()) {
			character.socket.editingExit = room.exits[i];
			character.socket.connectionState = global.CON_DOOREDIT_KEYWORDS;
			character.socket.editingRoomId = id;
			character.emitMessage('Type a list of comma-delimited keywords for the door.', 'IndianRed', 'DOOR KEYWORDS: > ');
			found = true;
			break;
		}
	}
	
	if(found === false) {
		character.emitMessage('No door seems to exist in that direction in that room.');
	}
}

function saveExit(roomId, character, exit) {
	roomModel.find( { "id":roomId }, function(err, docs) {
		if(docs.length > 0) {
			for(var i = 0; i < docs[0].exits.length; i++) {
				if(docs[0].exits[i].direction.toLowerCase() === exit.direction.toLowerCase()) {
					docs[0].exits.splice(i, 1);
					docs[0].exits.push(exit);
					break;
				}
			}
			
			delete docs[0]['_id'];

			docs[0].save(function(err) {
				console.log('==>' + err);
				
		        if(err) {
		            console.log(err);
		        }
		        
		        character.emitMessage('Exit saved!');
			});
		}
		else {
			character.emitMessage("Could not find that room in DB.... weird!");
		} 
	});
}

var exitModel = mongoose.model('exit', exitSchema);
var roomModel = mongoose.model('room', roomSchema);


module.exports = {
	roomSchema: roomSchema,
	room: roomModel,
	exitSchema: exitSchema,
	exit: exitModel,
	load: load,
	addRoom: addRoom,
	deleteRoom: deleteRoom,
	setTitle: setTitle,
	setDescription: setDescription,
	addExit: addExit,
	removeExit: removeExit,
	doorEdit: doorEdit,
	saveExit: saveExit
};