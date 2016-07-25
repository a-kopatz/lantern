var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var arrayExtensions = require('./arrayExtensions');
var constants = require("./constants");
var characterSchema = require("./character").schema;
var utility = require("./utility");
var Output = require("./output");

var playerSchema = characterSchema.extend({
	category: { type: Number, default: global.CATEGORY_PLAYER },
	password: String,
	// hunger: Number,
	// thirst: Number,
	// drunk: Number,
	maximumFullness: Number,
	caloriesConsumed: [ Number ],
	// fullnessLevel: Number,

	title: String,

	isNoAuction: Boolean,
	isNoGossip: Boolean,
	isNoHoller: Boolean,
	isNoShout: Boolean,
	isNoGratz: Boolean,
	isNoQuest: Boolean,
	isNoTell: Boolean,
	blocked: [ String ]
});

playerSchema.methods.enterGame = function(world) {
	world.addCharacter(this);
	var room = world.getStartRoom();
	room.addCharacter(this);
	this.position = global.POS_STANDING;
	
	var output = room.showRoomToCharacter(this);
	output.toRoom.push( { roomId: room.id, textArray: [ { text: this.name + " has entered the game." } ] } );
	output.emit();

	this.keywords = [];
	this.keywords.push(this.name);
	
	this.groupId = '';
	this.followers = [];
};

playerSchema.methods.start = function() {
	if(this.gender === global.GENDER_MALE) {
		this.height = utility.randomNumber(64, 80);
		this.weight = utility.randomNumber(100, 150);
	}
	else {
		this.height = utility.randomNumber(60, 72);
		this.weight = utility.randomNumber(90, 110);
	}
	
	this.maximumFullness = 1200;
	this.caloriesConsumed = [ 0,0,0,0,0,0,0,0,0,0 ];
	this.experience = 1;
	
	this.money = 10000;
	this.bank = 0;
	this.setTitle();
};

playerSchema.methods.isNpc = function() {
	return false;
};

playerSchema.methods.getNameAndTitle = function() {
	var result = this.name + " " + this.title;
	return result.trim();
};

playerSchema.methods.getDescription = function() { 
	return this.name + " " + this.title;
};

playerSchema.methods.toggle = function(mode, property, trueMessage, falseMessage) {
	var toggle = false;
	
	if(mode === undefined) {
		if(property === true) {
			toggle = false;
		}
		else {
			toggle = true;
		}
	}
	else {
		toggle = mode;
	}

	if(toggle === true) {
		this.emitMessage(trueMessage);
	}
	else {
		this.emitMessage(falseMessage);
	}
	
	return toggle;
};

playerSchema.methods.toggleAuction = function(mode) {
	this.isNoAuction = this.toggle(mode, this.isNoAuction, "You are now deaf to auctions.", "You can now hear auctions.");
	// mudlog.info(this.name + " turned auction channel to " + this.isNoAuction);
};

playerSchema.methods.toggleGossip = function(mode) {
	this.isNoGossip = this.toggle(mode, this.isNoGossip, "You are now deaf to gossip.", "You can now hear gossip.");
	// mudlog.info(this.name + " turned gossip channel to " + this.isNoGossip);
};

playerSchema.methods.toggleGratz = function(mode) {
	this.isNoGratz = this.toggle(mode, this.isNoGratz, "You are now deaf to congratulations messages.", "You can now hear congratulations messages.");
	// mudlog.info(this.name + " turned gratz channel to " + this.isNoGratz);
};

playerSchema.methods.toggleHoller = function(mode) {
	this.isNoHoller = this.toggle(mode, this.isNoHoller, "You are now deaf to holler messages.", "You can now hear holler messages.");
	// mudlog.info(this.name + " turned holler channel to " + this.isNoHoller);
};

playerSchema.methods.toggleShout = function(mode) {
	this.isNoShout = this.toggle(mode, this.isNoShout, "You are now deaf to shouting.", "You can now hear shouting.");
	// mudlog.info(this.name + " turned shout channel to " + this.isNoShout);
};

playerSchema.methods.listInventory = function() {
	var output = new Output(this);
	
	output.toActor.push( { text: "You are carrying:" } );
	
	if(this.inventory.length === 0) {
		output.toActor.push( { text : "  Absolutely nothing!!!" } );
	}
	else {
		for(var i = 0; i < this.inventory.length; i++) {
			output.toActor.push( { text: "  " + this.inventory[i].shortDescription, color: "Green" } );
		}
	}
	
	return output;
};

playerSchema.methods.listScore = function() {
	var output = new Output(this);
	
	output.toActor.push( { text: "You are " + this.getNameAndTitle() + "." } );
	
	output.toActor.push( { text: "You have " + this.money + " dollars with you and " + this.bank + " dollars in the bank." } );
	
	output.toActor.push( { text: "You are " + this.getFormattedHeight() + " tall."} );
	output.toActor.push( { text: "You weigh " + this.weight + " pounds."} );
	
	var bmi = this.getBMI();
	output.toActor.push( { text: "Your BMI is " + bmi + ", which makes you " + utility.getBmiDescription(bmi) + "."} );

	output.toActor.push( { text: global.FULLNESS[this.getFullnessIndex()][0] } );
	
	return output;
};

playerSchema.methods.setTitle = function(title) {
	var output = new Output(this);
	
	if(title === undefined) {
		if(this.gender === global.GENDER_MALE) {
			this.title = "the Man";
		}
		else {
			this.title = "the Woman";
		}
	}
	else {
		this.title = title;
		output.toActor.push ( { text: "Ok, you are now '" + this.name + " " + this.title + ".'" } );
	}
	
	return output;
};

playerSchema.methods.hourlyUpdate = function() {
	this.emitMessage("Hour....");
	
	this.bank = this.bank + global.HOURLY_DOLLAR_BONUS;

	this.caloriesConsumed.pop();
	this.caloriesConsumed.unshift(0);
	
	// this.hunger = Math.max((this.hunger - 1), 0);
	
	// if(this.hunger === 0) {
	// 	this.emitMessage("You are hungry.");
	// 	this.emitRoomMessage(this.name + "'s stomach growls loudly.");
	// }
	
	// this.thirst = Math.max((this.thirst - 1), 0);

	// if(this.thirst === 0) {
	// 	this.emitMessage("You are thirsty.");
	// 	this.emitRoomMessage(this.name + " looks parched!");
	// }
	
	// if(this.drunk > 0) {
	// 	this.drunk = Math.max((this.drunk - 1), 0);
		
	// 	if(this.drunk === 0) {
	// 		this.emitMessage("You are now sober.");
	// 	}
	// }
	
	if(this.caloriesConsumed.total() > 3 * this.maximumFullness) {
		this.maximumFullness++;
	}
};

playerSchema.methods.dailyUpdate = function() {
	this.emitMessage("Day....");
	
	if(this.caloriesConsumed.total() > global.CALORIES_TO_GAIN_ONE_POUND) {
		this.weight++;
	}
	
};

playerSchema.methods.getFullnessIndex = function() {
	var sum = this.caloriesConsumed.total();
	var index = Math.round(Math.max(0, (sum - this.maximumFullness)) / (Math.round(this.maximumFullness / 4)));
	index = Math.min(index, global.MAX_FULLNESS);
	return index;
};

playerSchema.methods.load = function(name, callback) {
	playerModel.find({ name: name }, function(err, docs) {
		callback(docs);
	});
};

var playerModel = mongoose.model('player', playerSchema);

module.exports = {
	schema: playerSchema,
	player: playerModel
};

