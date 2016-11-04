var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;
var Output = require("../output");

var bankSchema = itemSchema.extend({
}, { collection : 'items' });

bankSchema.methods.getType = function() {
	return global.ITEM_BANK;
};

bankSchema.methods.checkBalance = function(character, command) {
	var output = new Output(character);
	
	if(character.bank === 0) {
		output.toActor.push( { text: "You have no money deposited." } );
	}
	else if(this.bank === 1) {
		output.toActor.push( { text: "You have exactly 1 pathetic dollar deposited." } );
	}
	else {
		output.toActor.push( { text: "You have " + character.bank + " dollars deposited." } );
	}
	
	return output;
};

bankSchema.methods.depositMoney = function(character, command) {
	var output = new Output(character);
	
	var error = "How much do you wish to deposit?";
	
	if(command.tokens.length < 2) {
	    output.toActor.push( { text: error } );
	}
	else if(isNaN(command.tokens[1]) === true) {
	    output.toActor.push( { text: error } );
	}
    else {
        var amount = parseInt(command.tokens[1], 10);

    	if(character.money < amount) {
    		output.toActor.push( { text: "You don't have that much money!" } );
    	}
    	else {
    	
        	character.money = character.money - amount;
        	character.bank = character.bank + amount;
        	
        	output.toActor.push( { text: "You deposit " + amount + " dollars." } );
        	output.toRoom.push( { roomId: character.room.id, textArray: [ { text: "ACTOR_NAME makes a bank transaction." } ] } );
    	}
    }
    
	return output;
};

bankSchema.methods.withdrawMoney = function(character, command) {
	var output = new Output(character);
	
    var error = "How much do you wish to withdraw?";
	
	if(command.tokens.length < 2) {
	    output.toActor.push( { text: error } );
	}
	else if(isNaN(command.tokens[1]) === true) {
	    output.toActor.push( { text: error } );
	}
	else {
	    var amount = parseInt(command.tokens[1], 10);
	    
    	if(character.bank < amount) {
    		output.toActor.push( { text: "You don't have that much money in the bank!" } );
    	}
    	else {
        	character.money = character.money + amount;
        	character.bank = character.bank - amount;
        	
        	output.toActor.push( { text: "You withdraw " + amount + " dollars." } );
        	output.toRoom.push( { roomId: character.room.id, textArray: [ { text: "ACTOR_NAME makes a bank transaction." } ] } );
    	}
	}
	
	return output;
};

bankSchema.methods.getCommands = function() {
    return [
          { command: "balance"  , minimumPosition: global.POS_RESTING , functionPointer: this.checkBalance , minimumLevel: 0, subCommand: 0, item: this },
          { command: "deposit"  , minimumPosition: global.POS_RESTING , functionPointer: this.depositMoney , minimumLevel: 0, subCommand: 0, item: this },
          { command: "withdraw" , minimumPosition: global.POS_RESTING , functionPointer: this.withdrawMoney, minimumLevel: 0, subCommand: 0, item: this }
    ];
};

var bankModel = mongoose.model('bank', bankSchema);

module.exports = {
	schema: bankSchema,
	bank: bankModel
};