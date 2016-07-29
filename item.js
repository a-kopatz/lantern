var mongoose = require('mongoose');
var schema = mongoose.Schema;
var constants = require("./constants");

var itemSchema = new schema({
    id: Number,
    keywords: [ String ],
   	category: { type: Number, default: global.CATEGORY_ITEM },
    shortDescription: String,
    longDescription: String,
    actionDescription: String,
    canBeDonated: Boolean,
    canBeTaken: Boolean,
    type: String,
    cost: Number,
	extras: [{
		description: String,
	   	category: { type: Number, default: global.CATEGORY_EXTRA },
		keywords: []
	}]
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
