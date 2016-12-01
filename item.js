var mongoose = require('mongoose');
var schema = mongoose.Schema;
var constants = require("./constants");
var extra = require('./extra').schema;
var Output = require("./output");
var autoIncrement = require('mongoose-auto-increment');
var Food = require('./items/food');

var itemSchema = new schema({
	id: { type: Number, default: -1 },
    keywords: [ String ],
   	// category: { type: Number, default: global.CATEGORY_ITEM },
    shortDescription: String,
    longDescription: String,
    pluralDescription: String,
    detailedDescription: String,
    // canBeDonated: Boolean,
    canBeTaken: Boolean,
    type: String,
    cost: Number,
	extras: [ extra ]
});

itemSchema.methods.getType = function() {
	// 'item' is effectively an abstract class
	return global.ITEM_OTHER;
};

itemSchema.methods.listContents = function() {
    var messages = [];

// TODO: Override listContents in fountain and drinkcon classes
	// switch(this.getType()) {
 //   	case global.ITEM_DRINKCONTAINER:
 //   	case global.ITEM_FOUNTAIN:
 //   	    if(this.quantity > 0) {
 //       	    var amount = Math.round( ( this.quantity * 3 ) / this.capacity ) - 1;
 //               messages.push( { text: "It's " + global.DRINKCONTAINER_FULLNESS[amount] + " full of a " + global.DRINK_COLORS[this.containsLiquid] + " liquid." } );
 //   	    }
 //   	    else {
 //   	        messages.push( { text: "It's empty." } );
 //   	    }
 //   		break;

	
	messages.push("There's nothing inside that!");
	
	return messages;
};

// Like when carried, dropped, etc.... "A brass key"
itemSchema.methods.getShortDescription = function() {
    return this.shortDescription;
};

// Like when dealing with mulitple of the same item... "brass keys"
itemSchema.methods.getPluralDescription = function() {
    return this.pluralDescription;
};

// Like when laying in a room... "A brass key has been left here"
itemSchema.methods.getDescription = function() {
    var result = [];
    result.push(this.longDescription);
    return result;
};

// Like when looked at... "The brass has been worn but the key is in good condition.  It must unlock a door somewhere... but where?"
itemSchema.methods.getDetailedDescription = function() {
    var result = [];
    
    if(this.detailedDescription !== undefined && this.detailedDescription !== null) {
        result.push(this.detailedDescription);
    }
    else {
        result.push("You see nothing special about it.");
    }
    
    return result;
};

itemSchema.methods.getWrittenContents = function() {
    return "You can't read THAT!";
};

itemSchema.methods.getCommands = function() {
    return [];
};

itemSchema.methods.listCommands = function(character, command) {
	var output = new Output(character);
	var commands = command.item.getCommands();
	
	if(commands.length > 0) {
    	output.toActor.push( { text: 'The following special commands are available: ' } );
    	output.toActor.push( { text: '-------------------------------------------------------------------' } );

		for(var i = 0; i < commands.length; i++) {
			if(commands[i].command !== "list") {
				output.toActor.push( { text: "   " + commands[i].command } );
			}
		}
	}
	else {
	    output.toActor.push( { text: "There is nothing special you can do with that." } );
	}
	
	return output;	
};


itemSchema.methods.performActivity = function() {
	// Does nothing by default
};

function load(id, item, commands, world, previousThing, instructionNumber, callback) {
	itemModel.find({id: id}, function(err, docs) {
		console.log(err);
		callback(docs, item, commands, world, previousThing, instructionNumber);
	});
}

function loadIntoInventory(id, character) {
    itemModel.find({id: id}, function(err, docs) {
        if(docs.length > 0) {
            character.inventory.push(docs[0]);
            character.emitMessage('Item loaded!');
        }
        else {
            character.emitMessage('Item not found!');
        }
    });
}

//////////// ONLINE CREATION FUNCTIONS


function itemEdit(itemId, character) {
	if(isNaN(itemId)) {
		character.emitMessage('What item ID did you want to update?');
		return;
	}    
	
    var id = parseInt(itemId, 10);
    
    itemModel.find( { "id":id }, function(err, docs) {
		if(docs.length > 0) {
		    character.socket.editingItem = docs[0];
		    character.socket.connectionState = global.CON_ITEMEDIT_KEYWORDS;
		    character.emitMessage('Type a list of comma-delimited keywords for the item.', 'IndianRed', 'ITEM KEYWORDS: > ');
		}
		else {
		    character.emitMessage('That item does not exist!!!');
		}
    }); 
}

function itemSave(character, itemToSave) {
    itemToSave.save(function(err) { 
        // TODO: Log error, I guess?
        if(err !== null) {
            console.log(err);
            character.emitMessage(err);
        }
        character.emitMessage('Item updated... probably');        
    });
}

function itemList(character) {
    itemModel.find( { }, null, {sort: {id: 1}}, function(err, docs) {
		for(var i = 0; i < docs.length; i++) {
			character.emitMessage( docs[i].id + " :: " + docs[i].shortDescription );
		}
    }); 
}

function itemFind(character, textToFind) {
    itemModel.find( { "shortDescription": new RegExp(textToFind, 'i') }, null, {sort: {id: 1}}, function(err, docs) {
		for(var i = 0; i < docs.length; i++) {
			character.emitMessage( docs[i].id + " :: " + docs[i].shortDescription );
		}

		if(docs.length === 0) {
			character.emitMessage( "Item not found.");
		}
    }); 
}

function itemStat(character, itemId) {
	itemModel.find( { "id":itemId }, function(err, docs) {
		if(docs.length > 0) {
		    character.emitMessage(docs[0].toString());
		}
		else {
		    character.emitMessage('That item does not exist!!!');
		}
    }); 
}

var itemModel = mongoose.model('item', itemSchema);

module.exports = {
	itemSchema: itemSchema,
	item: itemModel,
	load: load,
	loadIntoInventory: loadIntoInventory,
	itemEdit: itemEdit,
	itemSave: itemSave,
	itemList: itemList,
	itemFind: itemFind,
	itemStat: itemStat
};
