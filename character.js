var mongoose = require('mongoose');
var schema = mongoose.Schema;
var arrayExtensions = require('./arrayExtensions');
var extend = require('mongoose-schema-extend');
var constants = require("./constants");
var Social =  require("./social");
var utility = require("./utility");
var Output = require("./output");
// var clothes = require("./items/clothes").clothes;
var Food = require('./items/food').food;
var Item = require('./item').item;
var Furniture = require('./items/furniture').furniture;
var Scale = require('./items/scale').scale;
var Drinkcontainer = require('./items/drinkcontainer').drinkcontainer;

var characterSchema = new schema({
	name: String,
	gender: Number,
	
	experience: Number,
	
	height: Number,
	weight: Number,

	position: Number,
	
	money: Number,
	bank: Number,
	
	wearing: [],
	inventory: []
});



/* BEGIN -- Utility methods for message distribution */

characterSchema.methods.emitMessages = function(messages) {
	for(var i = 0; i < messages.length; i++) {
		this.emitMessage(messages[i].text, messages[i].color);
	}
};

characterSchema.methods.emitMessage = function(message, color) {
	if(message != undefined) {
		if(message.length > 0) {
			var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);
		
			if(this.socket !== undefined) {
				var prompt = "> ";
				
				if(color !== undefined) {
					this.socket.emit('message', { message: formattedMessage, color: color, prompt: prompt });
				}
				else {
					this.socket.emit('message', { message: formattedMessage, prompt: prompt });
				}
			}
			
			return formattedMessage;
		}
	}

	return "";
};

characterSchema.methods.emitRoomMessages = function(messages) {
	for(var i = 0; i < messages.length; i++) {
		this.emitRoomMessage(messages[i].text, messages[i].color);
	}
};

characterSchema.methods.emitRoomMessage = function(message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	if(this.room != undefined) {
		if(this.room.players != undefined) {
			for(var i = 0; i < this.room.players.length; i++) {
				if(this.room.players[i] !== this) {
					this.room.players[i].emitMessage(formattedMessage, color);
				}
			}
		}
	}
	
	return formattedMessage;
};

characterSchema.methods.emitObservedMessage = function(target, message, color) {
	var formattedMessage = message.substring(0, 1).toUpperCase() + message.substring(1);

	for(var i = 0; i < this.room.players.length; i++) {
		if(this.room.players[i] !== this && this.room.players[i] !== target) {
			this.room.players[i].emitMessage(formattedMessage, color);
		}
	}
	
	return formattedMessage;
};

/* END -- Utility methods for message distribution */

/* BEGIN -- General functions for formatting */

characterSchema.methods.getPersonalPronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "it";
		case global.GENDER_MALE:
			return "he";
		case global.GENDER_FEMALE:
			return "she";
	}
};

characterSchema.methods.getObjectPronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "it";
		case global.GENDER_MALE:
			return "him";
		case global.GENDER_FEMALE:
			return "her";
	}
};

characterSchema.methods.getPossessivePronoun = function() {
	switch(this.gender) {
		case global.GENDER_NEUTRAL:
			return "its";
		case global.GENDER_MALE:
			return "his";
		case global.GENDER_FEMALE:
			return "her";
	}
};

/* END -- General functions for formatting */

characterSchema.methods.isNpc = function() {
	return false;
};

characterSchema.methods.getFormattedHeight = function() {
	return Math.floor(this.height / 12).toString() + " feet, " + (this.height % 12).toString() + " inches";
};

characterSchema.methods.getBMI = function() {
	return Math.floor((this.weight / (this.height * this.height)) * 703);
};

characterSchema.methods.getShortDescription = function() {
	return "Override this function in child classes.";
};

characterSchema.methods.getDetailedDescription = function() {
	var result = [];
	
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

characterSchema.methods.move = function(direction) {
	var output = new Output(this);

	var exit = this.room.getExit(direction);
	
	if(exit === null) {
		output.toActor.push ( { text: "Alas, you cannot go that way..." } );
		return output;
	}

	if(exit.isClosed === true) {
		output.toActor.push ( { text: "The " + exit.keywords[0] + " seems to be closed." } );
		return output;
	}
	
	var newRoom = this.world.getRoom(exit.toRoomId);
	
	if(newRoom !== null) {
		if(newRoom.mobsAllowed === false && this.isNpc() === true) {
			return output;
		}
		
		if(this.isNpc() === false && exit.bmiLimit !== undefined && exit.bmiLimit !== null) {
			if(this.getBMI() > exit.bmiLimit) {
				output.toActor.push( { text: "You're too fat to fit through the door!" } );
				output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME tries to go " + global.getDirection(direction) + " but is too fat to fit through the door!" } );
				return output;
			}
		}
		
		if(this.isNpc() === false && this.isNoImmobility === false && this.weight > global.WEIGHT_IMMOBILITY) {
			output.toActor.push( { text: "You can't move under the weight of your enormous bulk!" } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME tries to go " + global.getDirection(direction) + " but can't move under the weight of " + this.getPossessivePronoun() + " enormous bulk!" } );
			return output;			
		}

		output = newRoom.showRoomToCharacter(this);
		output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME leaves " + global.getDirection(direction) + "." } );
	
		this.room.removeCharacter(this);
		newRoom.addCharacter(this);
	
		output.toRoom.push( { roomId: newRoom.id, text: "ACTOR_NAME has arrived. " } );
	}
	else {
		output.toActor.push( { text: "Room not found -- this is a bug." } );
		output.toActor.push( { text: global.MESSAGE_BUG } );
	}
	
	return output;
};

characterSchema.methods.emote = function(parameter) {
	var output = new Output(this);
	output.toActor.push( { text: this.name + " " + parameter } );
	output.toRoom.push( { roomId: this.room.id, text: this.name + " " + parameter } );
	return output;
};

characterSchema.methods.stand = function() {
	var output = new Output(this);
	
	if(this.isNpc() === false && this.isNoImmobility === false && this.weight > global.WEIGHT_IMMOBILITY) {
		output.toActor.push( { text: "You try to stand up, but your incredible fatness keeps you down." } );
		output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME tries to stand up but finds " + this.getPersonalPronoun() + " is too fat!" } );
		return output;
	}	
	
	switch(this.position) {
		case global.POS_STANDING:
			output.toActor.push( { text: "You are already standing." } );
			break;
		case global.POS_SITTING:
			output.toActor.push( { text: "You stand up." } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME clambers to ACTOR_PRONOUN_POSSESSIVE feet." } );
			this.position = global.POS_STANDING;
			break;
        case global.POS_RESTING:
            output.toActor.push( { text: "You stop resting, and stand up." } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops resting, and clambers on ACTOR_PRONOUN_POSSESSIVE feet." } );
            this.position = global.POS_STANDING;
            break;
        case global.POS_SLEEPING:
            output.toActor.push( { text: "You have to wake up first!" } );
            break;
        default:
            output.toActor.push( { text: "You stop floating around, and put your feet on the ground." } );
            output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops floating around and puts ACTOR_PRONOUN_POSSESSIVE feet on the ground." } );
            this.position = global.POS_STANDING;
            break;
	}
	
	if(this.using !== undefined && this.using !== null) {
		this.using.using = null;
		this.using = null;
	}
	
	return output;
};

characterSchema.methods.sit = function() {
	var output = new Output(this);
	
	switch(this.position) {
		case global.POS_STANDING:
			output.toActor.push( { text: "You sit down." } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME sits down." } );
			this.position = global.POS_SITTING;
			break;
		case global.POS_SITTING:
			output.toActor.push( { text: "You're sitting already." } );
			break;
        case global.POS_RESTING:
            output.toActor.push( { text: "You stop resting, and sit up." } );
            output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops resting." } );
            this.position = global.POS_SITTING;
            break;
        case global.POS_SLEEPING:
            output.toActor.push( { text: "You have to wake up first." } );
            break;
        default:
            output.toActor.push( { text: "You stop floating around, and sit down." } );
            output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops floating around, and sit down." } );
            this.position = global.POS_SITTING;
            break;
	}
	
	return output;
};

characterSchema.methods.sitRestSleepOnFurniture = function(keyword, verb, endingPosition) {
	var output = new Output(this);
	
	var result = this.room.contents.findByKeyword(keyword);
	
	if(result.items.length === 0) {
		output.toActor.push( { text: verb + " on what?!?" } );
		return output;
	}
	
	if(result.items[0].using !== undefined && result.items[0].using !== null) {
		output.toActor.push ( { text: result.items[0].using.name + " is already on that!" } );
		return output;
	}
	
	if((result.items[0] instanceof Furniture) === false) {
		output.toActor.push ( { text: result.items[0].shortDescription + " -- you can't " + verb + " on that!" } );
		return output;
	}

	if(result.items[0].condition === 1) {
		output.toActor.push ( { text: result.items[0].shortDescription + " -- it's broken!" } );
		return output;
	}

	output.toActor.push( { text: "You " + verb + " on " + result.items[0].shortDescription + "." } );
	output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME " + verb + "s on " + result.items[0].shortDescription + "." } );
	this.position = endingPosition;
	
	if(this.weight > result.items[0].maximumWeight) {
		output.toActor.push( { text: result.items[0].shortDescription + " shudders under your weight is and immediately crushed." } );
		output.toRoom.push( { roomId: this.room.id, text: result.items[0].shortDescription + " shudders under ACTOR_NAME and is immediately crushed." } );
		result.items[0].condition = 1;
	}
	else {
		this.using = result.items[0];
		result.items[0].using = this;
	}
	
	return output;
};

characterSchema.methods.rest = function() {
	var output = new Output(this);
	
	switch(this.position) {
		case global.POS_STANDING:
			output.toActor.push( { text: "You sit down and rest your tired bones." } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME sits down and rests." } );
			this.position = global.POS_RESTING;
			break;
		case global.POS_SITTING:
			output.toActor.push( { text: "You rest your tired bones." } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME rests." } );
			this.position = global.POS_RESTING;
			break;
        case global.POS_RESTING:
            output.toActor.push( { text: "You are resting already." } );
            break;
        case global.POS_SLEEPING:
            output.toActor.push( { text: "You have to wake up first." } );
            break;
        default:
            output.toActor.push( { text: "You stop floating around, and stop to rest your tired bones." } );
            output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops floating around, and rests." } );
            this.position = global.POS_RESTING;
            break;
	}
	
	return output;
};

characterSchema.methods.sleep = function() {
	var output = new Output(this);
	
	switch(this.position) {
	    case global.POS_STANDING:
	    case global.POS_SITTING:
	    case global.POS_RESTING:
	        output.toActor.push( { text: "You go to sleep." } );
	        output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME lies down and falls asleep." } );
	        this.position = global.POS_SLEEPING;
	        break;
        case global.POS_SLEEPING:
            output.toActor.push( { text: "You are already sound asleep." } );
            break;
        default:
            output.toActor.push( { text: "You stop floating around, and lie down to sleep." } );
            output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops floating around, and lie down to sleep." } );
            this.position = global.POS_SLEEPING;
            break;
    }
    
	return output;
};

characterSchema.methods.wake = function() {
	var output = new Output(this);
	
	if(this.position > global.POS_SLEEPING) {
		output.toActor.push( { text: "You are already awake..." } );
	}
	else if(this.position < global.POS_SLEEPING) {
		output.toActor.push( { text: "You can't wake up! You're in pretty bad shape!" } );
	}
	else {
		output.toActor.push( { text: "You awaken, and sit up." } );
		output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME awakens and sits up." } );
		this.position = global.POS_SITTING;
	}
	
	return output;    
};

characterSchema.methods.say = function(message) {
	var output = new Output(this);

	if(message.length < 1) {
		output.toActor.push( { text: "Yes, but WHAT do you want to say?" } );
	} else {
		// TODO: Change to constant for drunkness, I guess?
		if(!this.isNpc() && this.drunkness > 150 && this.isNoDrunk === false) {
			// TODO: Probably extract this and test it
			message = message.replace(/ss/g, "sssss").replace(/s/g, "es").replace(/r/g, "rrrr").replace(/t/g, "tt");
		}
		
		output.toActor.push( { text: "You say, '" + message + "'", color: "Cyan" } );
		output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME says, '" + message + "'", color: "Cyan" } );
	}

	return output;
};

characterSchema.methods.generalCommunication = function(subCommand, message) {
	var output = new Output(this);

	if(this.room !== undefined) {
		if(this.room.isSoundproof) {
			output.toActor.push( { text: 'The walls seem to absorb your words.' } );
			return output;
		}
	}
	
    var commType;
    var commColor;

    switch(subCommand) {
		case global.SCMD_HOLLER:
			if(this.isNoHoller) {
				output.toActor.push( { text: 'Turn off your no-holler flag first!' } );
				return output;
			}
			
			commType = 'holler';
			commColor = 'Orange';
			break;
		case global.SCMD_SHOUT:
			if(this.isNoShout) {
				output.toActor.push( { text: 'Turn off your no-shout flag first!' } );
				return output;
			}
			
			commType = 'shout';
			commColor = 'Yellow';
			break;
		case global.SCMD_GOSSIP:
			if(this.isNoGossip) {
				output.toActor.push( { text: "You aren't even on the channel!" } );
				return output;
			}
			
			commType = 'gossip';
			commColor = 'Orange';
			break;
		case global.SCMD_AUCTION:
			if(this.isNoAuction) {
				output.toActor.push( { text: "You aren't even on the channel!" } );
				return output;
			}
			
			commType = 'auction';
			commColor = 'Magenta';
			break;
		case global.SCMD_GRATZ:
			if(this.isNoGratz) {
				output.toActor.push ( { text: "You aren't listening to congratulations messages!" } );
				return output;
			}
			
			commType = 'congrat';
			commColor = 'Green';
			break;
	}

	if(message.length < 1) {
		output.toActor.push( { text: "Yes, " + commType + ", fine, " + commType + " we must, but WHAT???" } );
		return output;
	}

	output.toActor.push( { text: "You " + commType + ", '" + message + "'", color: commColor } );
	output.toWorld.push( { text: "ACTOR_NAME " + commType + "s, '" + message + "'", color: commColor } );
	output.subCommand = subCommand;
	return output;
};

characterSchema.methods.tell = function(targetName, message) {
	var output = new Output(this);
	var target = this.world.getPlayer(targetName);
	
	if(target === null) {
		output.toActor.push( { text: "No-one by that name here." } );
	}
	else {
		// TODO: Implement this
		//if(this.canTellTarget(target)) {
			output.target = target;
			output.toActor.push( { text: "You tell " + target.name + ", '" + message + "'", color: "Red" } );
			output.toTarget.push( { text: "ACTOR_NAME tells you, '" + message + "'",  color: "Red" } );
			
			target.replyTo = this.name;
		//}
	}
	
	return output;
};

characterSchema.methods.reply = function(message) {
	var output = new Output(this);
	
	if(this.replyTo === undefined || this.replyTo === null) {
		output.toActor.push( { text: "Reply to who, exactly?" } );
		return output;
	}
	
	var target = this.world.getPlayer(this.replyTo);
	
	if(target === null) {
		output.toActor.push( { text: "That player must have left..." } );
	}
	else {
		// TODO: Implement this
		//if(this.canTellTarget(target)) {
			output.target = target;
			output.toActor.push( { text: "You tell " + target.name + ", '" + message + "'", color: "Red" } );
			output.toTarget.push( { text: "ACTOR_NAME tells you, '" + message + "'",  color: "Red" } );
			
			target.replyTo = this.name;
		//}
	}
	
	return output;
};

// characterSchema.methods.wakeCharacter = function(targetName) {
// 	var messages = [];
	
// 	if(this.position <= global.POS_SLEEPING) {
// 		messages[0] = this.emitMessage("Maybe you should wake yourself up first.");
// 	}
// 	else {
// 		var target = this.room.getCharacter(targetName);

// 		if(target === null) {
// 			messages[0] = this.emitMessage("No-one by that name here.");
// 		}
// 		else {
// 			if(target.position > global.POS_SLEEPING) {
// 				messages[0] = this.emitMessage(target.getPersonalPronoun() + " is already awake.");
// 			}
// 			else if(target.position < global.POS_SLEEPING) {
// 				messages[0] = this.emitMessage(target.getPersonalPronoun() + " is in pretty bad shape!");
// 			}
// 			else {
// 				messages[0] = this.emitMessage("You awaken " + target.name + ".");
// 				messages[1] = target.emitMessage("You are awakened by " + this.name + ".");
// 				messages[2] = this.emitObservedMessage(target, this.name + " awakens " + target.name + ".");
// 				target.position = global.POS_SITTING;				
// 			}
// 		}
// 	}

// 	return messages;
// };



// characterSchema.methods.takeObjectFromContainer = function(object, container) {
// 	var messages = [];

// 	container.removeItem(object);
// 	this.inventory.push(object);
// 	messages[0] = this.emitMessage("You take " + object.shortDescription + " from " + container.shortDescription + ".");
// 	messages[1] = this.emitRoomMessage(this.name + " takes " + object.shortDescription + " from " + container.shortDescription + ".");
	
// 	return messages;
// };

// characterSchema.methods.takeMoneyFromContainer = function(object, container) {
// 	var messages = [];
	
// 	// container.removeItem(object);
// 	// this.world.removeItem(object);
// 	// messages[0] = this.emitMessage("You take " + object.shortDescription +  " from " + container.shortDescription + ".");
// 	// messages[1] = this.emitRoomMessage(this.name + " takes " + object.shortDescription + " from " + container.shortDescription + ".");
// 	// messages[2] = this.emitMessage("There were " + object.value + " gold coins.");
// 	// this.money = this.money + object.value;
	
// 	return messages;
// };

// characterSchema.methods.takeItemFromContainer = function(itemKeyword, containerKeyword) {
// 	var messages = [];

// 	var searchable = this.inventory.concat(this.room.contents);
// 	var containertarget = searchable.findByKeyword(containerKeyword);

// 	if(containertarget.items.length === 0) {
// 		messages.push(this.emitMessage("There doesn't seem to be any '" + containerKeyword + "' items around."));
// 		return messages;
// 	}

// 	for(var i = 0; i < containertarget.items.length; i++) {	
// 		if(containertarget.items[i].type !== global.ITEM_CONTAINER && containertarget.items[i].type !== global.ITEM_CORPSE)	{
// 			messages.push(this.emitMessage(containertarget.items[i].shortDescription + " -- That's not a container!"));
// 			break;
// 		}
		
// 		if(containertarget.items[i].contents.length === 0) {
// 			messages.push(this.emitMessage(containertarget.items[i].shortDescription + " seems to be empty."));
// 			break;
// 		}
		
// 		var itemtarget = containertarget.items[i].contents.findByKeyword(itemKeyword);
		
// 		if(itemtarget.items.length === 0) {
// 			messages.push(this.emitMessage("There doesn't seem to be any '" + itemKeyword + "' items in " + containertarget.items[i].shortDescription + "."));
// 		}
// 		else {
// 			// TODO: Closed
			
// 			for(var j = 0; j < itemtarget.items.length; j++) {
// 				// if(this.inventory.length + 1 > this.getMaxCarried()) {
// 				// 	messages.push(this.emitMessage(itemtarget.items[i].shortDescription + ": You carry that many items."));
// 				// }
// 				// else {
// 					if(itemtarget.items[j].type === global.ITEM_MONEY) {
// 						messages.push(this.takeMoneyFromContainer(itemtarget.items[j], containertarget.items[i]));
// 					}
// 					else {
// 						messages.push(this.takeObjectFromContainer(itemtarget.items[j], containertarget.items[i]));
// 					}
// 				// }
// 			}
// 		}
// 	}
	
// 	return messages;
// };


// TODO: What if the item isn't visible by an observer?  Invisible ring?

characterSchema.methods.dropItem = function(keyword) {
	var result = this.inventory.findByKeyword(keyword);
	return this._handleJunkDropDonate(result.items.length, keyword, result, 'drop');
};

characterSchema.methods.dropItems = function(quantityToken, keywordToken) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Drop how many of what?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	return this._handleJunkDropDonate(quantity, keywordToken, result, 'drop');
};

characterSchema.methods.junkItem = function(keyword) {
	var result = this.inventory.findByKeyword(keyword);
	return this._handleJunkDropDonate(result.items.length, keyword, result, 'junk');
};

characterSchema.methods.junkItems = function(quantityToken, keywordToken) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Junk how many of what?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	return this._handleJunkDropDonate(quantity, keywordToken, result, 'junk');
};

characterSchema.methods.donateItem = function(keyword) {
	var result = this.inventory.findByKeyword(keyword);
	return this._handleJunkDropDonate(result.items.length, keyword, result, 'donate');
};

characterSchema.methods.donateItems = function(quantityToken, keywordToken) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Donate how many of what?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	return this._handleJunkDropDonate(quantity, keywordToken, result, 'donate');
};

characterSchema.methods._handleJunkDropDonate = function(quantity, keywordToken, itemArray, mode) {
	var output = new Output(this);
	var donationRoom = this.world.getRoom(global.DONATION_ROOM);

	if(itemArray.items.length === 0) {
		output.toActor.push( { text: mode + " what?!?" } );
		return output;
	}

    if(itemArray.items.length < quantity) {
        output.toActor.push( { text: "You don't have " + quantity + " of '" + keywordToken + "'."  } );
        return output;
    }

	var itemMapResult = utility.buildItemMap(this, itemArray.items, null, quantity, function() { return false; }, mode, "You can't " + mode + " that!");

	var toActor = 'You ' + mode + ' ' + itemMapResult.output;
	var toRoom =  this.name + ' ' + mode + 's ' + itemMapResult.output;
	var toDonation = 'Suddenly ' + itemMapResult.output;

    output.toActor.push( { text: toActor + "." });
	output.toRoom.push( { roomId: this.room.id, text: toRoom + "." } );
    
    if(mode === 'junk') {
    	for(var i = 0; i < itemMapResult.mapItems.length; i++) {
    		this.inventory.splice(this.inventory.indexOf(itemMapResult.mapItems[i]), 1);
    		this.world.removeItem(itemMapResult.mapItems[i]);
    	}
    }
    else if(mode === 'drop') {
    	for(var i = 0; i < itemMapResult.mapItems.length; i++) {
    		this.inventory.splice(this.inventory.indexOf(itemMapResult.mapItems[i]), 1);
    		this.room.addItem(itemMapResult.mapItems[i]);
    	}
    }
    else if(mode === 'donate') {
    	for(var i = 0; i < itemMapResult.mapItems.length; i++) {
    		this.inventory.splice(this.inventory.indexOf(itemMapResult.mapItems[i]), 1);
    		
			if(donationRoom !== null) {
				donationRoom.addItem(itemMapResult.mapItems[i]);
	        }
	        else {
	        	this.world.removeItem(itemMapResult.mapItems[i]);
	        }    		
    	}
    	
    	if(itemMapResult.mapItems.length > 1) {
    		toDonation = toDonation + " appear in a puff of smoke!";
    		output.toActor.push( {  text: "   They vanish in a puff of smoke!" } );
    		output.toRoom.push( { roomId: this.room.id, text: "   They vanish in a puff of smoke!" } );
    	}
    	else {
    		toDonation = toDonation + " appears in a puff of smoke!";
    		output.toActor.push( { text: "   It vanishes in a puff of smoke!" } );
    		output.toRoom.push( { roomId: this.room.id, text: "   It vanishes in a puff of smoke!" } );
    	}
    	
    	if(donationRoom !== null) {
    		output.toRoom.push ( { roomId: donationRoom.id, text: toDonation } );
    	}
    }
    
	return output;	
};

characterSchema.methods.takeItem = function(keyword) {
	var result = this.room.contents.findByKeyword(keyword);
	return this._handleTake(result.items.length, keyword, result);
};

characterSchema.methods.takeItems = function(quantityToken, keywordToken) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Take how many of what?!?" } );
		return output;
	}

	var result = this.room.contents.findByKeyword('all.' + keywordToken);
	return this._handleTake(quantity, keywordToken, result, 'take');
};

characterSchema.methods._handleTake = function(quantity, keywordToken, itemArray) {
	var output = new Output(this);

	if(itemArray.items.length === 0) {
		output.toActor.push( { text: "Take what?" } );
		return output;
	}

    if(itemArray.items.length < quantity) {
        output.toActor.push( { text: "You don't have " + quantity + " of '" + keywordToken + "'."  } );
        return output;
    }

	var itemMapResult = utility.buildItemMap(this, itemArray.items, null, quantity, 
		function() { return false; }, 'take', "You can't take that!", 
		function(item) { if(item.canBeTaken == false) { return false; } return true; }, "You can't take THAT!", 
		global.MAX_INVENTORY_LENGTH - this.inventory.length, "You can't hold any more items!");

	if(itemMapResult.mapItems.length > 0) {
		var toActor = 'You take ' + itemMapResult.output;
		var toRoom =  this.name + ' takes ' + itemMapResult.output;
	
	    output.toActor.push( { text: toActor + "." });
		output.toRoom.push( { roomId: this.room.id, text: toRoom + "." } );
	}
    
    if(itemMapResult.errorMessages !== undefined) {
    	for(var i = 0; i < itemMapResult.errorMessages.length; i++) {
    		output.toActor.push ( { text: itemMapResult.errorMessages[i] } );
    	}
    }
    
	for(var i = 0; i < itemMapResult.mapItems.length; i++) {
		this.inventory.push(itemMapResult.mapItems[i]);
		this.room.removeItem(itemMapResult.mapItems[i]);
	}

	return output;	
};

characterSchema.methods.stretchStomach = function() {
	if(this.caloriesConsumed[0] + this.volumeConsumed[0] > this.maximumFullness) {
		// "Stomach stretching" by 1%
		this.maximumFullness = Math.ceil(this.maximumFullness + (this.maximumFullness * 0.01));
	}
};

characterSchema.methods.getOvereatingMessages = function(beforeIndex, afterIndex) {
	var messages = [];
	
	// ACTOR_NAME is backwards when using 'feed' command :(
	
	if(beforeIndex < 4 && afterIndex >= 4) {
		messages[0] = "You are ready to explode!";
		messages[1] = this.name + " is ready to explode!";
	}
	else if(beforeIndex < 3 && afterIndex >= 3) {
		messages[0] = "You are completely overstuffed!";
		messages[1] =  this.name + " is completely overstuffed!";
	}
	else if(beforeIndex < 2 && afterIndex >= 2) {
		messages[0] = "You are stuffed!";
		messages[1] = this.name + " is stuffed!";
	}
	else if(beforeIndex < 1 && afterIndex >= 1) {
		messages[0] = "You are full.";
		messages[1] = this.name + " is full.";
	}
	
	return messages;
};

characterSchema.methods.eatItem = function(keyword) {
	var result = this.inventory.findByKeyword(keyword);
	return this._handleEat(result.items.length, keyword, result);
};

characterSchema.methods.eatItems = function(quantityToken, keywordToken) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Eat how many of what?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	return this._handleEat(quantity, keywordToken, result);
};

function mustStopEating(character, items) {
	var total = 0;
	
	for(var i = 0; i < items.length; i++) {
		total = total + items[i].calories;
	}
		
	if(character.caloriesConsumed[0] +  character.volumeConsumed[0] + total > 4 * character.maximumFullness) {
		return true;
	}
	
	return false;	
}

characterSchema.methods._handleEat = function(quantity, keywordToken, itemArray) {
	var output = new Output(this);
	
	if(itemArray.items.length === 0) {
		output.toActor.push( { text: "Eat what?!?" } );
		return output;
	}

    if(itemArray.items.length < quantity) {
        output.toActor.push( { text: "You don't have " + quantity + " of '" + keywordToken + "'."  } );
        return output;
    }
    
    // Sort of shitty -- only players have this concept (at the moment)
    var beforeFullnessIndex = (this.caloriesConsumed[0] + this.volumeConsumed[0] ) / this.maximumFullness;
    
	var itemMapResult = utility.buildItemMap(this, itemArray.items, Food, quantity, mustStopEating, "eat", "You can't eat that!");

    for(var i = 0; i < itemMapResult.mapItems.length; i++) {
		if(!this.isNpc()) {
            this.caloriesConsumed[0] = this.caloriesConsumed[0] + itemMapResult.mapItems[i].calories;
        }
        
        this.inventory.splice(this.inventory.indexOf(itemMapResult.mapItems[i]), 1);
        this.world.removeItem(itemMapResult.mapItems[i]);
    }
    
    if(itemMapResult.mapItems.length > 0) {
		var randomizedSynonym = utility.getRandomSynonym('eat');
		output.toActor.push( { text: "You " + randomizedSynonym[0] + " " + itemMapResult.output + "." });
		output.toRoom.push( { roomId: this.room.id, text: this.name + " " + randomizedSynonym[1] + " " + itemMapResult.output + "." } );
		
	    if(itemMapResult.brokenLoop === true) {
	        output.toActor.push( { text: "Your stomach can't hold any more!!!" } );
	    }
	
	    this.stretchStomach();
	
		var afterFullnessIndex = (this.caloriesConsumed[0] + this.volumeConsumed[0] ) / this.maximumFullness;
		var messages = this.getOvereatingMessages(beforeFullnessIndex, afterFullnessIndex);
		
		if(messages.length > 0) {
			output.toActor.push( { text: messages[0] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1] } );
		} 
    }
	
   if(itemMapResult.errorMessages !== undefined) {
    	for(var i = 0; i < itemMapResult.errorMessages.length; i++) {
    		output.toActor.push ( { text: itemMapResult.errorMessages[i] } );
    	}
    }
    
	return output;	
};







characterSchema.methods.feedItem = function(keyword, targetName) {
	var result = this.inventory.findByKeyword(keyword);
	var target = this.room.getCharacter(targetName);
	return this._handleFeed(result.items.length, keyword, result, target);
};

characterSchema.methods.feedItems = function(quantityToken, keywordToken, targetName) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Feed how many of what to who?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	var target = this.room.getCharacter(targetName);
	return this._handleFeed(quantity, keywordToken, result, target);
};

characterSchema.methods._handleFeed = function(quantity, keywordToken, itemArray, target) {
	var output = new Output(this);
	output.target = target;
	
	if(itemArray.items.length === 0) {
		output.toActor.push( { text: "Feed what to who?!?" } );
		return output;
	}

    if(itemArray.items.length < quantity) {
        output.toActor.push( { text: "You don't have " + quantity + " of '" + keywordToken + "'."  } );
        return output;
    }

	if(target === null) {
		output.toActor.push( { text: "No-one by that name here." } );
		return output;
	}
	
	if(target === this) {
		output.toActor.push( { text: "Feed something to yourself?!?  Just eat it..." } );
		return output;
	}    
    
    // Sort of shitty -- only players have this concept (at the moment)
    if(!target.isNpc()) {
    	var beforeFullnessIndex = target.caloriesConsumed[0] / target.maximumFullness;
    }
    
	var itemMapResult = utility.buildItemMap(this, itemArray.items, Food, quantity, function() { return false; }, "feed", "That's not food!");

    for(var i = 0; i < itemMapResult.mapItems.length; i++) {
		if(!target.isNpc()) {
            target.caloriesConsumed[0] = target.caloriesConsumed[0] + itemMapResult.mapItems[i].calories;
        }
        
        this.inventory.splice(this.inventory.indexOf(itemMapResult.mapItems[i]), 1);
        this.world.removeItem(itemMapResult.mapItems[i]);
    }

	output.toActor.push( { text: "You feed " + itemMapResult.output + " to " + target.name + "." });
	output.toTarget.push( { text: this.name + " feeds you " + itemMapResult.output + "." } );
	output.toRoom.push( { roomId: this.room.id, text: this.name + " feeds " + itemMapResult.output + " to " + target.name + "." } );

    target.stretchStomach();

	if(!target.isNpc()) {
		var afterFullnessIndex = (target.caloriesConsumed[0] / target.maximumFullness);
		var messages = target.getOvereatingMessages(beforeFullnessIndex, afterFullnessIndex);
		
		if(messages.length > 0) {
			output.toTarget.push( { text: messages[0] } );
			output.toActor.push( { text: messages[1] } );
			output.toRoom.push( { roomId: target.room.id, text: messages[1] } );
		}    
	}
	
	return output;	
};



characterSchema.methods.giveItem = function(keyword, targetName) {
	var result = this.inventory.findByKeyword(keyword);
	var target = this.room.getCharacter(targetName);
	return this._handleGive(result.items.length, keyword, result, target);
};

characterSchema.methods.giveItems = function(quantityToken, keywordToken, targetName) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Give how many of what to who?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	var target = this.room.getCharacter(targetName);
	return this._handleGive(quantity, keywordToken, result, target);
};

characterSchema.methods._handleGive = function(quantity, keywordToken, itemArray, target) {
	var output = new Output(this);
	output.target = target;
	
	if(itemArray.items.length === 0) {
		output.toActor.push( { text: "Give what to who?!?" } );
		return output;
	}

    if(itemArray.items.length < quantity) {
        output.toActor.push( { text: "You don't have " + quantity + " of '" + keywordToken + "'."  } );
        return output;
    }

	if(target === null) {
		output.toActor.push( { text: "No-one by that name here." } );
		return output;
	}
	
	if(target === this) {
		output.toActor.push( { text: "Give something to yourself?  That's silly." } );
		return output;
	}

	var itemMapResult = utility.buildItemMap(this, itemArray.items, null, quantity, function() { return false; }, "give");

    for(var i = 0; i < itemMapResult.mapItems.length; i++) {
        this.inventory.splice(this.inventory.indexOf(itemMapResult.mapItems[i]), 1);
        target.inventory.push(itemMapResult.mapItems[i]);
    }

	output.toActor.push( { text: "You give " + itemMapResult.output + " to " + target.name + "." });
	output.toTarget.push( { text: this.name + " gives you " + itemMapResult.output + "." } );
	output.toRoom.push( { roomId: this.room.id, text: this.name + " gives " + itemMapResult.output + " to " + target.name + "." } );

	return output;	
};


characterSchema.methods.getDrunknessMessages = function(beforeIndex, afterIndex) {
	var messages = [];

	if(beforeIndex < 400 && afterIndex >= 400) {
		messages[0] = "You are totally hammered.";
		messages[1] = this.name + " is totally hammered.";
	}
	else if(beforeIndex < 300 && afterIndex >= 300) {
		messages[0] = "You are completed wasted.";
		messages[1] =  this.name + " is completely wasted.";
	}
	else if(beforeIndex < 200 && afterIndex >= 200) {
		messages[0] = "You are very drunk.";
		messages[1] = this.name + " is very drunk.";
	}
	else if(beforeIndex < 100 && afterIndex >= 100) {
		messages[0] = "You are drunk.";
		messages[1] = this.name + " is drunk.";
	}
	
	return messages;	
};

characterSchema.methods.getOverdrinkingMessages = function(beforeIndex, afterIndex) {
	var messages = [];

	if(beforeIndex < 4 && afterIndex >= 4) {
		messages[0] = "You are bloated and ready to pop!";
		messages[1] = this.name + " is bloated and ready to pop!";
	}
	else if(beforeIndex < 3 && afterIndex >= 3) {
		messages[0] = "You are completely overfull!";
		messages[1] =  this.name + " is completely overfull!";
	}
	else if(beforeIndex < 2 && afterIndex >= 2) {
		messages[0] = "You are bloated!";
		messages[1] = this.name + " is bloated!";
	}
	else if(beforeIndex < 1 && afterIndex >= 1) {
		messages[0] = "You are full.";
		messages[1] = this.name + " is full.";
	}
	
	return messages;
};

function mustStopDrinking(character, items) {
	var total = 0;

	for(var i = 0; i < items.length; i++) {
		total = total + items[i].quantity;
	}
		
	if(character.caloriesConsumed[0] + character.volumeConsumed[0] + total > 4 * character.maximumFullness) {
		return true;
	}
	
	return false;	
}

characterSchema.methods.drinkItem = function(keyword) {
	var result = this.inventory.findByKeyword(keyword);
	return this._handleDrink(result.items.length, keyword, result);
};

characterSchema.methods.drinkItems = function(quantityToken, keywordToken) {
	var quantity = parseInt(quantityToken, 10);
	
	if(isNaN(quantity)) {
		var output = new Output(this);
		output.toActor.push( { text: "Drink how many of what?!?" } );
		return output;
	}

	var result = this.inventory.findByKeyword('all.' + keywordToken);
	return this._handleDrink(quantity, keywordToken, result);
};

characterSchema.methods._handleDrink = function(quantity, keywordToken, itemArray) {
	var output = new Output(this);
	
	if(itemArray.items.length === 0) {
		output.toActor.push( { text: "Drink what?!?" } );
		return output;
	}

    if(itemArray.items.length < quantity) {
        output.toActor.push( { text: "You don't have " + quantity + " of '" + keywordToken + "'."  } );
        return output;
    }
    
    // Sort of shitty -- only players have this concept (at the moment)
    var beforeFullnessIndex = (this.caloriesConsumed[0] + this.volumeConsumed[0]) / this.maximumFullness;
	var beforeDrunkness = this.drunkness;

	var itemMapResult = utility.buildItemMap(this, itemArray.items, Drinkcontainer, quantity, mustStopDrinking, "drink", "You can't drink from that!");

	var drinkArray = [];

	
    for(var i = 0; i < itemMapResult.mapItems.length; i++) {
    	
    	if(itemMapResult.mapItems[i].quantity === 0) {
    		output.toActor.push( { text: itemMapResult.mapItems[i].shortDescription + " -- it's empty!" } );
    	}
    	else {
	        var liquidIndex = itemMapResult.mapItems[i].containsLiquid;
	        
	        if(drinkArray[liquidIndex] === undefined || drinkArray[liquidIndex] === null) {
	        	drinkArray[liquidIndex] = 0;
	        }
	
			drinkArray[liquidIndex] = drinkArray[liquidIndex] + parseInt(itemMapResult.mapItems[i].quantity, 10);

	        itemMapResult.mapItems[i].quantity = 0;
    	}
    }

	var prettyOutput = '';
	
	for(var i = 0; i < drinkArray.length; i++) {
		if(drinkArray[i] !== undefined && drinkArray[i] !== null) {
	
			if(prettyOutput.length > 0) {
				prettyOutput = prettyOutput + " and";
			}
			
			var drink = global.DRINKS[i];
			
			// TODO: change "some" based on actual quantity
			prettyOutput = prettyOutput + " some " + drink.name;
			
			if(!this.isNpc()) {
				this.caloriesConsumed[0] = this.caloriesConsumed[0] + (drink.calories * drinkArray[i]);
				this.volumeConsumed[0] = this.volumeConsumed[0] + drinkArray[i];
				this.drunkness = this.drunkness + (drink.drunkness * drinkArray[i]);
			}
		}
	}

	if(prettyOutput.length > 0) {
		output.toActor.push( { text: "You drink" + prettyOutput + " from " + itemMapResult.output + "." } );
		output.toRoom.push( { roomId: this.room.id, text: this.name + " drinks" + prettyOutput + " from " + itemMapResult.output + "." } );
		
		this.stretchStomach();
		
		var afterFullnessIndex = (this.caloriesConsumed[0] / this.maximumFullness);
		var messages = this.getOverdrinkingMessages(beforeFullnessIndex, afterFullnessIndex);

		if(messages.length > 0) {
			output.toActor.push( { text: messages[0] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1] } );
		} 
		
		messages = this.getDrunknessMessages(beforeDrunkness, this.drunkness);
		
		if(messages.length > 0) {
			output.toActor.push( { text: messages[0] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1] } );
		} 
	}
	
	if(itemMapResult.errorMessages !== undefined) {
    	for(var i = 0; i < itemMapResult.errorMessages.length; i++) {
    		output.toActor.push ( { text: itemMapResult.errorMessages[i] } );
    	}
    }
    
	return output;	
};










characterSchema.methods.tasteObject = function(object) {
	var messages = [];

	// For now, all food is delicious.
	messages[0] = "You taste FIRST_OBJECT_SHORTDESC.  It is delicious!!!";
	messages[1] = "ACTOR_NAME tastes FIRST_OBJECT_SHORTDESC.";

	// Should tasting an food change it?  Are there calories associated with tastes?

	return messages;
};

characterSchema.methods.tasteItem = function(keyword) {
	var output = new Output(this);
	var result = this.inventory.findByKeyword(keyword);

	if(result.items.length === 0) {
		output.toActor.push( { text: "Taste what?!?" } );
		return output;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].type !== global.ITEM_FOOD) {
			output.toActor.push( { text: result.items[i].shortDescription + " -- You can't taste THAT!" } );
		}
		else {
			var messages = this.tasteObject(result.items[i]);
			output.toActor.push( { text: messages[0], items: [ result.items[i] ] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1], items: [ result.items[i] ] } );
		}
	}

	return output;
};













characterSchema.methods.sipFromObject = function(object) {
	var messages = [];

	var drink = global.DRINKS[object.containsLiquid];

	messages.push(this.emitMessage("You sip the " + drink.name + "."));
	messages.push(this.emitRoomMessage("ACTOR_NAME sips " + drink.name + " from FIRST_OBJECT_SHORTDESC."));

	return messages;	
};

characterSchema.methods.sipItem = function(keyword) {
	var output = new Output(this);

	var target = this.inventory.findByKeyword(keyword);

	if(target.items.length === 0) {
		output.toActor.push( { text: "Sip what?!?" } );
		return output;
	}
	
 	for(var i = 0; i < target.items.length; i++) {
		if((target.items[i] instanceof Drinkcontainer) === false) {
			output.toActor.push( { text: target.items[i].shortDescription + " -- You can't take a sip from THAT!" } );
			break;
		}
		else {
			if(target.items[i].quantity < 1) {
				output.toActor.push( { text: "It's empty!" } );
				break;
			}
			
			var messages = this.sipFromObject(target.items[i]);
			output.toActor.push( { text: messages[0], items: [ target.items[i] ] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1], items: [ target.items[i] ] } );
		}
	}
	
	return output;
};

// characterSchema.methods.giveObject = function(object, target) {
// 	var messages = [];
	
// 	messages[0] = "You give FIRST_OBJECT_SHORTDESC to TARGET_NAME.";
// 	messages[1] = "ACTOR_NAME gives you FIRST_OBJECT_SHORTDESC.";
// 	messages[2] = "ACTOR_NAME gives FIRST_OBJECT_SHORTDESC to TARGET_NAME.";
	
// 	this.inventory.splice(this.inventory.indexOf(object), 1);
// 	target.inventory.push(object);
	
// 	return messages;
// };

// characterSchema.methods.giveItem = function(keyword, targetName) {
// 	var output = new Output(this);
	
// 	var result = this.inventory.findByKeyword(keyword);

// 	if(result.items.length === 0) {	
// 		output.toActor.push( { text: "Give what?" } );
// 		return output;
// 	}
	
// 	var target = this.room.getCharacter(targetName);
	
// 	if(target === null) {
// 		output.toActor.push( { text: "No-one by that name here." } );
// 		return output;
// 	}
	
// 	if(target === this) {
// 		output.toActor.push( { text: "Give something to yourself?!?" } );
// 		return output;
// 	}
	
// 	output.target = target;

// 	for(var i = 0; i < result.items.length; i++) {
// 		var messages = this.giveObject(result.items[i], target);
		
// 		output.toActor.push( { text: messages[0], items: [ result.items[i] ] } );
// 		output.toTarget.push( { text: messages[1], items: [ result.items[i] ] } );
// 		output.toRoom.push( { roomId: this.room.id, text: messages[2], items: [ result.items[i] ] } );
// 	}
	
// 	return output;
// };



characterSchema.methods.openCloseExit = function(exit, verb, mode) {
	var messages = [];

	messages.push("You " + verb + " the " + exit.keywords[0] + ".");
	messages.push("ACTOR_NAME " + verb + "s the " + exit.keywords[0] + ".");
	
	exit.isClosed = mode;

	var oppositeRoom = this.world.getRoom(exit.toRoomId);
	
	if(oppositeRoom !== null) {
		var oppositeExit = oppositeRoom.getExit(utility.oppositeDirection(exit.direction));	

		if(oppositeExit !== null) {
			oppositeExit.isClosed = mode;
			messages.push("The " + oppositeExit.keywords[0] + " is " + utility.getPastTenseOfWord(verb) + " from the other side.");
		}
	}
	
	return messages;
};

characterSchema.methods.openCloseDoor = function(keyword, subcommand) {
	var output = new Output(this);
	var exits = this.room.exits.findByKeyword(keyword);
	
	if(exits.items.length === 0) {
		output.toActor.push( { text: "There doesn't appear to be any '" + keyword + "' here." } );
		return output;
	}

	var verb = '';
	var isClosed = false;
	
	if(subcommand === global.SCMD_OPENDOOR) {
		verb = 'open';
		isClosed = false;
	}
	else if(subcommand === global.SCMD_CLOSEDOOR) {
		verb = 'close';
		isClosed = true;
	}	
	
	for(var i = 0; i < exits.items.length; i++) {
		if(exits.items[i].isClosed == isClosed) {
			output.toActor.push( { text: "But it's already " + utility.getPastTenseOfWord(verb) + "." } );
		}
		else if(!exits.items[i].isClosable) {
			output.toActor.push( { text: "That can't be opened and closed." } );
		}
		else if(subcommand === global.SCMD_OPENDOOR && exits.items[i].isLocked === true) {
			output.toActor.push( { text: "It's locked."} );
		}
		else {
			var messages = this.openCloseExit(exits.items[i], verb, isClosed);
			
			output.toActor.push( { text: messages[0] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1] } );
			output.toRoom.push( { roomId: exits.items[i].toRoomId, text: messages[2] } );
		}
	}
	
	return output;
};


characterSchema.methods.lockUnlockExit = function(exit, verb, mode) {
	var messages = [];

	messages.push("You " + verb + " the " + exit.keywords[0] + ".");
	messages.push("ACTOR_NAME " + verb + "s the " + exit.keywords[0] + ".");
	
	exit.isLocked = mode;

	var oppositeRoom = this.world.getRoom(exit.toRoomId);
	
	if(oppositeRoom !== null) {
		var oppositeExit = oppositeRoom.getExit(utility.oppositeDirection(exit.direction));	

		if(oppositeExit !== null) {
			oppositeExit.isLocked = mode;
			messages.push("The " + oppositeExit.keywords[0] + " is " + utility.getPastTenseOfWord(verb) + " from the other side.");
		}
	}
	
	return messages;
};

characterSchema.methods.lockUnlockDoor = function(keyword, subcommand) {
	var output = new Output(this);
	var exits = this.room.exits.findByKeyword(keyword);
	
	if(exits.items.length === 0) {
		output.toActor.push( { text: "There doesn't appear to be any '" + keyword + "' here." } );
		return output;
	}

	var verb = '';
	var isLocked = false;
	
	if(subcommand === global.SCMD_LOCKDOOR) {
		verb = 'lock';
		isLocked = true;
	}
	else if(subcommand === global.SCMD_UNLOCKDOOR) {
		verb = 'unlock';
		isLocked = false;
	}	
	
	for(var i = 0; i < exits.items.length; i++) {
		if(exits.items[i].isClosed == false) {
			output.toActor.push( { text: "But it's wide open..." } );
		}
		else if(!exits.items[i].isClosable) {
			output.toActor.push( { text: "That can't be locked and unlocked." } );
		}
		else if(!this.inventory.containsItemById(exits.items[i].keyId)) {
			output.toActor.push( { text: "You don't seem to have the right key for that." } );
		}
		else {
			var messages = this.lockUnlockExit(exits.items[i], verb, isLocked);
			
			output.toActor.push( { text: messages[0] } );
			output.toRoom.push( { roomId: this.room.id, text: messages[1] } );
			output.toRoom.push( { roomId: exits.items[i].toRoomId, text: messages[2] } );
		}
	}
	
	return output;
};

characterSchema.methods.wearObject = function(object, location) {
	var messages = [];
	
	if(location === global.WEAR_FINGER_R && this.wearing[global.WEAR_FINGER_R] !== null && this.wearing[global.WEAR_FINGER_R] !== undefined) {
		location++;
	}
	
	if(location === global.WEAR_NECK_1 && this.wearing[global.WEAR_NECK_1] !== null && this.wearing[global.WEAR_NECK_1] !== undefined) {
		location++;
	}
	
	if(location === global.WEAR_WRIST_R && this.wearing[global.WEAR_WRIST_R] !== null && this.wearing[global.WEAR_WRIST_R] !== undefined) {
		location++;
	}

	if(this.wearing[location] === null || this.wearing[location] === undefined) {
		this.wearing[location] = object;
		this.inventory.splice(this.inventory.indexOf(object), 1);
		messages = utility.wearMessage(location);
	}
	else {
		messages[0] = utility.alreadyWearing(location);
    }
    
    return messages;
};

characterSchema.methods.wearItem = function(keyword) {
	var output = new Output(this);
	
	var result = this.inventory.findByKeyword(keyword);

	if(result.items.length === 0) {
		output.toActor.push( { text: "Wear what?!?" } );
		return output;
	}

	for(var i = 0; i < result.items.length; i++) {
		if(result.items[i].wearSlots === undefined || result.items[i].wearSlots.length === 0) {
			output.toActor.push( { text: "You can't wear " + result.items[i].shortDescription + "." } );
		}
		else {
			if(this.getBMI() > result.items[i].maximumBmi) {
				output.toActor.push( { text: "You can't wear " + result.items[i].shortDescription + ".  You're too fat for that!" } );
				output.toRoom.push( { roomId: this.room.id, text: this.name + " tries to wear " + result.items[i].shortDescription + " but is too fat to wear it." } );
				return output;
			}
			
			var messages = this.wearObject(result.items[i], result.items[i].wearSlots[0]);
			output.toActorMessage(messages[0], result.items[i]);
			output.toRoom.push( { roomId: this.room.id, text: messages[1], items: [ result.items[i] ] } );
		}
	}
	
	return output;
};

characterSchema.methods.wearItemAtLocation = function(keyword, location) {
	var output = new Output(this);
	
	var result = this.inventory.findByKeyword(keyword);

	// if(result.items.length === 0) {
	// 	output.toActor.push( { text: "Wear what?!?" } );
	// 	return output;
	// }

	// for(var i = 0; i < result.items.length; i++) {
	// 	if(result.items[i].wearSlots.indexOf(location) > -1) {
	// 		var messages = this.wearObject(result.items[i], location);
	// 		output.toActor.push(messages[0], result.items[i]);
	// 		output.toRoom.push( { roomId: this.room.id, textArray: [ { text: messages[1], items: [ result.items[i] ] } ] } );
	// 	}
	// 	else {
	// 		output.toActor.push( { text: "You can't wear " + result.items[i].shortDescription + " there." } );
	// 	}
	// }
	
	result.toActor.push( { text: "Not implemented "} );
	
	return output;
};

characterSchema.methods.removeObject = function(object) {
	var messages = [];
	
	messages[0] = "You stop using FIRST_OBJECT_SHORTDESC.";
	messages[1] = "ACTOR_NAME stops using FIRST_OBJECT_SHORTDESC.";
	
	for(var i = 0; i < this.wearing.length; i++) {
		if(this.wearing[i] === object) {
			this.wearing[i] = null;
			break;
		}
	}
	
 	this.inventory.push(object);
 	
 	return messages;
};

characterSchema.methods.removeItem = function(keyword) {
	var output = new Output(this);
	
	var result = this.wearing.findByKeyword(keyword);

	if(result.items.length === 0) {	
		output.toActor.push( { text: "Remove what?" } );
		return output;
	}

	for(var i = 0; i < result.items.length; i++) {
		var messages = this.removeObject(result.items[i]);
		output.toActorMessage(messages[0], result.items[i]);
		// output.toRoom.push( { roomId: this.room.id, textArray: [ { text: messages[1], items: [ result.items[i] ] } ] } );
		output.toRoomMessage(this.room.id, messages[1], result.items[i]);
	}
	
	return output;
};

characterSchema.methods.lookTarget = function(keyword) {
	var output = new Output(this);
	
 	var targetList = this.room.players.concat(this.room.npcs).concat(this.inventory)
 		.concat(this.wearing).concat(this.room.contents);

	var target = targetList.findByKeyword(keyword);

	if(target.items.length > 0) {
		var targetItem = target.items[0];
	
		if(this.inventory.indexOf(targetItem) > -1) {
			output.toActor.push( { text: targetItem.getShortDescription() + " (carried): " } );
		}
		else if(this.wearing.indexOf(targetItem) > -1) {
			output.toActor.push( { text: targetItem.getShortDescription() + " (worn): " } );
		}
		else if(this.room.contents.indexOf(targetItem) > -1){
			output.toActor.push( { text: targetItem.getShortDescription() + " (here): " } );
		}
		else {
			output.toActor.push( { text: "You look at " + targetItem.getShortDescription() + "." } );
		}
		
		var detailedDescription = targetItem.getDetailedDescription();
		
		for(var i = 0; i < detailedDescription.length; i++) {
			output.toActor.push( { text: detailedDescription[i] } );
		}
		

		return output;		
	}
		
	// TODO: Put 'look north' / 'look east' / 'look <direction>' here
	
		


	output.toActor.push( { text: "You do not see that here." } );
	return output;
};

characterSchema.methods.getWornExtras = function() {
	var result = [];
	
	for(var i = 0; i < this.wearing.length; i++) {
		if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
			for(var j = 0; j < this.wearing[i].extras.length; j++) {
				result.push(this.wearing[i].extras[j]);
			}
		}
	}
	
	return result;
};

characterSchema.methods.getInventoryExtras = function() {
	var result = [];
	
	for(var i = 0; i < this.inventory.length; i++) {
		for(var j = 0; j < this.inventory[i].extras.length; j++) {
			result.push(this.inventory[i].extras[j]);
		}
	}
	
	return result;
};

characterSchema.methods.readItem = function(keyword) {
	var output = new Output(this);
	
	var targetList = this.inventory.concat(this.wearing).concat(this.room.contents);
	var result = targetList.findByKeyword(keyword);

	if(result.items.length === 0) {	
		output.toActor.push( { text: "Read what?" } );
		return output;
	}

	for(var i = 0; i < result.items.length; i++) {

		// TODO: Change to
		// http://stackoverflow.com/questions/10827108/mongoose-check-if-object-is-mongoose-object
		// if(result.items[i] instanceof Note) {

		if(result.items[i].getType() !== global.ITEM_NOTE) {
			output.toActorMessage("FIRST_OBJECT_SHORTDESC: you can't read that!", result.items[i]);
		}
		else {
			output.toActorMessage(result.items[i].getWrittenContents(), result.items[i]);
			output.toRoomMessage(this.room.id, "ACTOR_NAME reads FIRST_OBJECT_SHORTDESC.", result.items[i]);
		}
	}
	
	return output;
};

// /* Shopping and buying/selling-related methods */

// characterSchema.methods.getShop = function() {
// 	return this.world.getShop(this.room.id);
// };



characterSchema.methods.repairItem = function(keyword) {
	var output = new Output(this);

	var searchable = this.inventory.concat(this.room.contents);
	var target = searchable.findByKeyword(keyword);

	if(target.items.length === 0) {
		output.toActor.push( { text: "Repair what?!?" } );
		return output;
	}
	
 	for(var i = 0; i < target.items.length; i++) {
		if((target.items[i] instanceof Furniture) === true) {
			output.toActor.push( { text: "You quickly repair " + target.items[i].shortDescription + "."} );
			output.toRoom.push( { roomId: this.room.id, text: this.name + " quickly repair " + target.items[i].shortDescription + "."} );
			target.items[i].condition = 0;
		}
		else if((target.items[i] instanceof Scale) === true) {
			output.toActor.push( { text: "You quickly repair " + target.items[i].shortDescription + "."} );
			output.toRoom.push( { roomId: this.room.id, text: this.name + " quickly repair " + target.items[i].shortDescription + "."} );
			target.items[i].condition = 0;
		}
		else {
			output.toActor.push ( { text: target.items[i].shortDescription + " -- you can't repair that!" } );
		}
	}
	
	return output;
};

var characterModel = mongoose.model('character', characterSchema);

module.exports = {
	schema: characterSchema,
	character: characterModel
};
