var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var npcSchema = require("../npc").schema;
var Output = require("../output");
var Item = require('../item').item;
var Shirt = require('../items/shirt').shirt;
var Pants = require('../items/pants').pants;
var Food = require('../items/food').food;
var utility = require("../utility");

var shopkeeperSchema = npcSchema.extend({
}, { collection : 'npcs' });

shopkeeperSchema.methods.getDetailedDescription = function() {
    var result = [];
    result.push(this.longDescription);
    
    for(var i = 0; i < global.MAX_WEARS; i++) {
		if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
			result.push(global.WEAR_WHERE[i] + this.wearing[i].shortDescription);
		}
	}

	result.push(this.name + " says, '" + this.keywords[0].toUpperCase()  + " CATALOG to see what is available for purchase.'");
	result.push(this.name + " says, '" + this.keywords[0].toUpperCase() + " BUY <item> to purchase an item.'");
	result.push(this.name + " says, 'To buy multiple of the same item, use " + this.keywords[0].toUpperCase() + " BUY <quantity> <item>.'");

    return result;
};


shopkeeperSchema.methods.catalogItemsForSale = function(character, command) {
	var output = new Output(character);

	output.toActor.push( { text: command.npc.name + " says, 'I have the following items for sale: '" } );

	if(command.npc.sellsItems === undefined || command.npc.sellsItems === null || command.npc.sellsItems.length === 0) {
		output.toActor.push( { text: "   Nothing at all!" } );
	}
	else {
		output.toActor.push( { text: "Cost       Item" } );
		output.toActor.push( { text: "---------- -------------------------------------------------" } );
		
		for(var i = 0; i < command.npc.sellsItems.length; i++) {
			var price = utility.getPaddedWord(command.npc.sellsItems[i].cost.toString(), 11);
			output.toActor.push( { text: price + command.npc.sellsItems[i].shortDescription } );
		}
	}

	return output;
};

shopkeeperSchema.methods.buyItem = function(character, command) {
	var output = new Output(character);
	
	if(command.tokens.length < 2) {
		output.toActor.push( { text: "But what do you want to buy?!?" } );
		return output;
	}

	var target;
	var quantity = parseInt(command.tokens[1], 10);
			
	if(isNaN(quantity)) {
		quantity = 1;
		target = command.npc.sellsItems.findByKeyword(command.tokens[1]);
	}
	else {
		if(command.tokens.length < 3) {
			output.toActor.push( { text: command.npc.name + " says, 'Yeah, but how much of what do you want?!?'" } );
			return output;			
		}
		else {
			target = command.npc.sellsItems.findByKeyword(command.tokens[2]);
		}
	}

	if(target.items.length > 0) {
		var targetItem = target.items[0];
		var inventoryOverflow = false;
		
		if((targetItem.cost * quantity) > character.money) {
			if(quantity === 1) {
				output.toActor.push( { text: command.npc.name + " says, 'You don't have enough money to buy that!.'" } );
				return output;
			}
			else {
				output.toActor.push( { text: command.npc.name + " says, 'You don't have enough money to buy that many!'" } );
				return output;
			}
		}
		else if(character.inventory.length >= global.MAX_INVENTORY_LENGTH) {
			output.toActor.push( { text: command.npc.name + " says, 'You can't carry any more items!'" } );
			return output;
		}
		else {
			if(quantity > global.MAX_INVENTORY_LENGTH - character.inventory.length) {
				quantity = global.MAX_INVENTORY_LENGTH - character.inventory.length;
				inventoryOverflow = true;
			}
				
			if(quantity === 1) {
				output.toActor.push( { text: command.npc.name + " sells you " + targetItem.shortDescription + "."} );
				output.toRoom.push( { roomId: character.room.id, text: character.name + " buys " + targetItem.shortDescription + " from " + command.npc.name + "." } );
			}
			else {
				output.toActor.push( { text: command.npc.name  + " sells you " + quantity + " " + targetItem.pluralDescription + "." } );
				output.toRoom.push( { roomId: character.room.id, text: character.name + " buys " + quantity + " " + targetItem.pluralDescription + " from " + command.npc.name  + "." } );

				if(inventoryOverflow === true) {
					output.toActor.push( { text: targetItem.shortDescription + " -- You can't carry any more items!" } );
				}				
			}
			
			character.money = character.money - (targetItem.cost * quantity);

			if(targetItem instanceof Food === true) {
				for(var i = 0; i < quantity; i++) {
					var newFood = new Food(targetItem);
					character.inventory.push(newFood);
				}
			}
			else if(targetItem instanceof Shirt === true) {
				for(var i = 0; i < quantity; i++) {
					var newShirt = new Shirt(targetItem);
					character.inventory.push(newShirt);
				}
			}
			else if(targetItem instanceof Pants === true) {
				for(var i = 0; i < quantity; i++) {
					var newPants = new Pants(targetItem);
					character.inventory.push(newPants);
				}
			}
		}
	}
	else {
		output.toActor.push( { text: command.npc.name + " says 'Sorry -- I don't sell that!'" } );
	}
	
	return output;
};

shopkeeperSchema.methods.getCommands = function() {
    return [
    		{ command: "list"		 , minimumPosition: global.POS_RESTING , functionPointer: this.listCommands, minimumLevel: 0, subCommand: 0, npc: this },
            { command: "catalog"	 , minimumPosition: global.POS_RESTING , functionPointer: this.catalogItemsForSale, minimumLevel: 0, npc: this },
            { command: "buy"         , minimumPosition: global.POS_RESTING , functionPointer: this.buyItem, minimumLevel: 0, subCommand: 0, npc: this }
    ];
};

var shopkeeperModel = mongoose.model('shopkeeper', shopkeeperSchema);

module.exports = {
	schema: shopkeeperSchema,
	shopkeeper: shopkeeperModel
};