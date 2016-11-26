var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;
var Output = require("../output");

var bankSchema = itemSchema.extend({
}, { collection : 'items' });

bankSchema.methods.getType = function() {
	return global.ITEM_BANK;
};

bankSchema.methods.getDetailedDescription = function() {
    var result = [];
	result.push('ATM BALANCE to check your bank balance.  ATM DEPOSIT <amount> to deposit money.');  
	result.push('ATM WITHDRAW <amount> to withdraw money from your account.');
    return result;
};

bankSchema.methods.checkBalance = function(character, command) {
	var output = new Output(character);
	
	if(character.bank === 0) {
		output.toActor.push( { text: "You have no money deposited." } );
	}
	else if(character.bank === 1) {
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
    	else if(amount < 0) {
    		output.toActor.push( { text: "Deposit a negative amount?!??!  Just make a withdrawal instead." } );
    	}
    	else {
        	character.money = character.money - amount;
        	character.bank = character.bank + amount;
        	
        	output.toActor.push( { text: "You deposit " + amount + " dollars." } );
        	output.toRoom.push( { roomId: character.room.id, text: "ACTOR_NAME makes a bank transaction." } );
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
    	else if(amount < 0) {
    		output.toActor.push( { text: "Withdraw a negative amount?!??!  Just make a deposit instead." } );
    	}
    	else {
        	character.money = character.money + amount;
        	character.bank = character.bank - amount;
        	
        	output.toActor.push( { text: "You withdraw " + amount + " dollars." } );
        	output.toRoom.push( { roomId: character.room.id, text: "ACTOR_NAME makes a bank transaction." } );
    	}
	}
	
	return output;
};

bankSchema.methods.getCommands = function() {
    return [
    	  { command: "list"		 , minimumPosition: global.POS_RESTING , functionPointer: this.listCommands, minimumLevel: 0, subCommand: 0, item: this },
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