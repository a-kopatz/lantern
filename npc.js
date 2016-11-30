var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var constants = require("./constants");
var Output = require("./output");
//var character = require("./character");
var characterSchema = require("./character").schema;
// var utility = require("./utility");

var npcSchema = characterSchema.extend({
    id: Number,
    keywords: [ String ],
	shortDescription: String,
	longDescription: String //,
	// loadPosition: Number,
	// defaultPosition: Number,
	// isSentinel: Boolean,
	// isScavenger: Boolean
}, { collection: 'npcs' });

npcSchema.methods.isNpc = function() {
	return true;
};

// This replace name... "An annoying cat"
npcSchema.methods.getShortDescription = function() {
	return this.name;
};

// Like when standing in a room... "An annoying cat is meowing here."
npcSchema.methods.getDescription = function() {
	return this.shortDescription;
};

// Like when looked at... "The cat is furry and has a stupid look on his annoying face."
npcSchema.methods.getDetailedDescription = function() {
    var result = [];
    result.push(this.longDescription);
    
    for(var i = 0; i < global.MAX_WEARS; i++) {
		if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
			result.push(global.WEAR_WHERE[i] + this.wearing[i].shortDescription);
		}
	}
	
	if(result.length === 0) {
		result.push("You see nothing special.");
	}
	
    return result;
};

npcSchema.methods.listCommands = function(character, command) {
	var output = new Output(character);
	var commands = command.npc.getCommands();
	
	output.toActor.push( { text: 'The following special commands are available: ' } );
	output.toActor.push( { text: '-------------------------------------------------------------------' } );
	
	if(commands.length > 0) {
		for(var i = 0; i < commands.length; i++) {
			if(commands[i].command !== "list") {
				output.toActor.push( { text: "   " + commands[i].command } );
			}
		}
	}
	
	return output;	
};

npcSchema.methods.initialize = function() {

};

npcSchema.methods.performActivity = function() {
	
};

function load(id, npc, commands, world, instructionNumber, callback) {
	npcModel.find({id: id}, function(err, docs) {
		//console.log(err);
		callback(docs, npc, commands, world, instructionNumber);
	
	});
}

//////////// ONLINE CREATION FUNCTIONS



function addNpc(character) {
	var newNpc = new npcModel();
	
	newNpc.save(function(err) {
        // TODO: Log error, I guess?
        if(err !== null) {
            console.log(err);
        }
        character.emitMessage('New npc saved!');
        
        npcModel.find( { "_id":newNpc._id }, function(err, docs) {
			// TODO: Log error, I guess?
			
			if(docs.length > 0) {
				character.emitMessage('New npc is ' + docs[0].id);
			}
        });
    });
}

function npcEdit(npcId, character) {
	if(isNaN(npcId)) {
		character.emitMessage('What npc ID did you want to update?');
		return;
	}    
	
    var id = parseInt(itemId, 10);
    
    npcModel.find( { "id":id }, function(err, docs) {
		if(docs.length > 0) {
		    character.socket.editingNpc = docs[0];
		    character.socket.connectionState = global.CON_NPCEDIT_KEYWORDS;
		    character.emitMessage('Type a list of comma-delimited keywords for the NPC.', 'IndianRed', 'NPC KEYWORDS: > ');
		}
		else {
		    character.emitMessage('That item does not exist!!!');
		}
    }); 
}

function npcSave(character, npcToSave) {
    npcToSave.save(function(err) { 
        // TODO: Log error, I guess?
        if(err !== null) {
            console.log(err);
            character.emitMessage(err);
        }
        character.emitMessage('Npc updated... probably');        
    });
}

var npcModel = mongoose.model('npc', npcSchema);

module.exports = {
	schema: npcSchema,
	npc: npcModel,
	load: load,
	addNpc: addNpc,
	npcSave: npcSave
};


