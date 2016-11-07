var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;
var Output = require("../output");
var Item = require('../item').item;
var utility = require("../utility");

var vendingmachineSchema = itemSchema.extend({
	catalog: [ Number ],
	contents: []
}, { collection : 'items' });

vendingmachineSchema.methods.getDetailedDescription = function() {
    var result = [];
	result.push('VENDING CATALOG to see what is available for purchase. VENDING BUY <item> to purchase an item.');  
    return result;
};

vendingmachineSchema.methods.getCommands = function() {
    return [
    	  { command: "catalog"		 , minimumPosition: global.POS_RESTING , functionPointer: this.catalogItemsForSale, minimumLevel: 0, subCommand: 0, item: this },
          { command: "buy"           , minimumPosition: global.POS_RESTING , functionPointer: this.buyItem , minimumLevel: 0, subCommand: 0, item: this }
    ];
};

vendingmachineSchema.methods.buyItem = function(character, command) {
	var output = new Output(character);
	
	console.log(command);
	
	if(command.tokens.length < 2) {
		output.toActor.push( { text: "But what do you want to buy?!?" } );
		return output;
	}

	var target = command.item.contents.findByKeyword(command.tokens[1]);
	
	if(target.items.length > 0) {
		var targetItem = target.items[0];
		
		if(targetItem.cost > character.money) {
			return output.toActor.push( { text: "You do not have enough money to buy that item." } );
		}
		else {
			output.toActorMessage("You buy FIRST_OBJECT_SHORTDESC from " + command.item.getShortDescription() + ".", targetItem);
			output.toRoom.push( { roomId: character.room.id, textArray: [ { text: "ACTOR_NAME buys FIRST_OBJECT_SHORTDESC from " + command.item.getShortDescription() + ".", items: [ targetItem ] } ] } );
			character.money = character.money - targetItem.cost;
			character.inventory.push(JSON.parse(JSON.stringify(targetItem)));
		}
		
	}
	else {
		return output.toActor.push( { text: "That does not seem to be for sale in this vending machine." } );
	}

	
	return output;
};



vendingmachineSchema.methods.catalogItemsForSale = function(character, command) {
	var output = new Output(character);

	output.toActor.push( { text: "The following items are dispensed by this vending machine:" } );

	if(command.item.contents === undefined || command.item.contents === null || command.item.contents.length === 0) {
		output.toActor.push( { text: "   Nothing at all!" } );
	}
	else {
		output.toActor.push( { text: "Cost       Item" } );
		output.toActor.push( { text: "---------- -------------------------------------------------" } );
		
		for(var i = 0; i < command.item.contents.length; i++) {
			output.toActor.push( { } );
			var price = utility.getPaddedWord(command.item.contents[i].cost.toString(), 11);
			output.toActor.push( { text: price + command.item.contents[i].shortDescription } );
		}
	}

	return output;
};



var vendingmachineModel = mongoose.model('vendingmachine', vendingmachineSchema);

module.exports = {
	schema: vendingmachineSchema,
	vendingmachine: vendingmachineModel
};