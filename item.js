var mongoose = require('mongoose');
var schema = mongoose.Schema;
var constants = require("./constants");
var extra = require('./extra').schema;
var Output = require("./output");

var itemSchema = new schema({
    id: Number,
    keywords: [ String ],
   	category: { type: Number, default: global.CATEGORY_ITEM },
    shortDescription: String,
    longDescription: String,
    detailedDescription: String,
    canBeDonated: Boolean,
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

// Like when laying in a room... "A brass key has been left here"
itemSchema.methods.getDescription = function() {
    var result = [];
    result.push(this.longDescription);
    return result;
};

// Like when looked at... "The brass has been worn but the key is in good condition.  It must unlock a door somewhere... but where?"
itemSchema.method.getDetailedDescription = function() {
    var result = [];
    result.push(this.detailedDescription);
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

function load(id, item, commands, world, previousThing, instructionNumber, callback) {
	itemModel.find({id: id}, function(err, docs) {
		console.log(err);
		callback(docs, item, commands, world, previousThing, instructionNumber);
	});
}

var itemModel = mongoose.model('item', itemSchema);

module.exports = {
	schema: itemSchema,
	item: itemModel,
	load: load
};
