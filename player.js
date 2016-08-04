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
	
	output.toRoomMessage(room.id, "ACTOR_NAME has entered the game.");
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
	
	this.isNoAuction = false;
	this.isNoGossip = false;
	this.isNoHoller = false;
	this.isNoShout = false;
	this.isNoGratz = false;
	this.isNoQuest = false;
	this.isNoTell = false;
	
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

playerSchema.methods.getShortDescription = function() { 
	return this.name + " " + this.title;
};

playerSchema.methods.toggle = function(mode, property) {
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

	return toggle;
};

playerSchema.methods.toggleAuction = function(mode) {
	var output = new Output(this);
	
	this.isNoAuction = this.toggle(mode, this.isNoAuction);
	
	if(this.isNoAuction === true) {
		output.toActor.push( { text: "You are now deaf to auctions." } );
	}
	else {
		output.toActor.push( { text: "You can now hear auctions." } );
	}
	
	return output;
};

playerSchema.methods.toggleGossip = function(mode) {
	var output = new Output(this);
	
	this.isNoGossip = this.toggle(mode, this.isNoGossip);
	
	if(this.isNoGossip === true) {
		output.toActor.push( { text: "You are now deaf to gossip." } );
	}
	else {
		output.toActor.push( { text: "You can now hear gossip." } );
	}
	
	return output;
};

playerSchema.methods.toggleGratz = function(mode) {
	var output = new Output(this);
	
	this.isNoGratz = this.toggle(mode, this.isNoGratz);
	
	if(this.isNoGratz === true) {
		output.toActor.push( { text: "You are now deaf to congratulations messages." } );
	}
	else {
		output.toActor.push( { text: "You can now hear congratulations messages." } );
	}
	
	return output;
};

playerSchema.methods.toggleHoller = function(mode) {
	var output = new Output(this);
	
	this.isNoHoller = this.toggle(mode, this.isNoHoller);
	
	if(this.isNoHoller === true) {
		output.toActor.push( { text: "You are now deaf to hollering." } );
	}
	else {
		output.toActor.push( { text: "You can now hear hollering." } );
	}
	
	return output;
};

playerSchema.methods.toggleShout = function(mode) {
	var output = new Output(this);
	
	this.isNoShout = this.toggle(mode, this.isNoShout);
	
	if(this.isNoShout === true) {
		output.toActor.push( { text: "You are now deaf to shouting." } );
	}
	else {
		output.toActor.push( { text: "You can now hear shouting." } );
	}
	
	return output;
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

playerSchema.methods.listApparel = function() {
	var output = new Output(this);
	output.toActor.push( { text: "You are using:" } );
	
	var found = false;
	
	for(var i = 0; i < global.MAX_WEARS; i++) {
		if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
			output.toActor.push( { text: global.WEAR_WHERE[i] + this.wearing[i].shortDescription } );
			found = true;
		}
	}
	
	if(found === false) {
		output.toActor.push( { text: "  Absolutely nothing!!!" } );
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

	// output.toActor.push( { text: global.FULLNESS[this.getFullnessIndex()][0] } );
	
	output.toActor.push( { text: "caloriesConsumed: " + this.caloriesConsumed.total() } );
	output.toActor.push( { text: "maximumFullness: " + this.maximumFullness } );
	output.toActor.push( { text: "Fullness: " + this.getFullnessIndex() } );
	
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

playerSchema.methods.goto = function(keyword) {
	// TODO: This is pretty powerful.... Restrict?
	
	var output = new Output(this);
	
	var newRoom = this.world.getRoom(parseInt(keyword, 10));
	
	if(newRoom !== null) {
	 	this.room.removeCharacter(this);
	 	newRoom.addCharacter(this);
		output = newRoom.showRoomToCharacter(this);

		output.toRoomMessage(this.room.roomId, "ACTOR_NAME disappears in a puff of smoke.");
	 	output.toRoomMessage(newRoom.roomId, "ACTOR_NAME appears with an ear-splitting bang.");
	}
	
	return output;
};

playerSchema.methods.hourlyUpdate = function() {
	// this.emitMessage("Hour....");
	
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

playerSchema.methods.getFullnessIndex = function() {
	var sum = this.caloriesConsumed.total();
	var index = Math.round(Math.max(0, (sum - this.maximumFullness)) / (Math.round(this.maximumFullness / 4)));
	index = Math.min(index, global.MAX_FULLNESS);
	return index;
};

playerSchema.methods.dailyUpdate = function() {
	//this.emitMessage("Day....");
	
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

playerSchema.methods.sendMail = function(recipientName) {
	var output = new Output(this);
	
	output.toActor.push( { text: "This is not implemented fully yet." } );
	
	return output;
};

playerSchema.methods.checkMail = function() {
	var output = new Output(this);
	
	output.toActor.push( { text: "This is not implemented fully yet." } );
	
	return output;
};

playerSchema.methods.receiveMail = function() {
	var output = new Output(this);
	
	output.toActor.push( { text: "This is not implemented fully yet." } );
	
	return output;
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

