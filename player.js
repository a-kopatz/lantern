var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var arrayExtensions = require('./arrayExtensions');
var constants = require("./constants");
var characterSchema = require("./character").schema;
var _Mail = require("./mail");
var Mail = require("./mail").mail;
// var Note = require('./note');
var item = require('./item').item;
var note = require("./items/note").note;
var clothes = require("./items/clothes").clothes;
var shirt = require("./items/shirt").shirt;
var pants = require("./items/pants").pants;
var food = require("./items/food").food;
var pen = require("./items/pen").pen;
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
	isNoImmobility: Boolean,
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
	
	
	// THIS SHOULDN'T BE NECESSARY
	// TODO: Combine loops
	for(var i = 0; i < this.inventory.length; i++) {
		switch(this.inventory[i].type) {
			case global.ITEM_FOOD:
				this.inventory[i] = new food(this.inventory[i]);
				break;			
			case global.ITEM_NOTE:
				this.inventory[i] = new note(this.inventory[i]);
				break;
			case global.ITEM_PEN:
				this.inventory[i] = new pen(this.inventory[i]);
				break;		
			case global.ITEM_SHIRT:
				this.inventory[i] = new shirt(this.inventory[i]);
				break;
			case global.ITEM_PANTS:
				this.inventory[i] = new pants(this.inventory[i]);
				break;
			case global.ITEM_CLOTHES:
				this.inventory[i] = new clothes(this.inventory[i]);
				break;
			default:
				this.inventory.splice(i, 1);
				i--;
				// This is sort of a horrible hack for the moment...
				// Crash bugs caused by items that are not the right type of sub-class
				// TODO: Log this because it's really a problem
				break;
		}
	}

	for(var i = 0; i < this.wearing.length; i++) {
		switch(this.wearing[i].type) {
			case global.ITEM_FOOD:
				this.wearing[i] = new food(this.wearing[i]);
				break;				
			case global.ITEM_NOTE:
				this.wearing[i] = new note(this.wearing[i]);
				break;
			case global.ITEM_PEN:
				this.wearing[i] = new pen(this.wearing[i]);
				break;
			case global.ITEM_SHIRT:
				this.wearing[i] = new shirt(this.wearing[i]);
				break;
			case global.ITEM_PANTS:
				this.wearing[i] = new pants(this.wearing[i]);
				break;				
			case global.ITEM_CLOTHES:
				this.wearing[i] = new clothes(this.wearing[i]);
				break;
			default:
				this.wearing[i] = null;
				// TODO: Log this because it's really a problem
				break;
 		}
	}
	
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
	this.isNoImmobility = false;
	
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

// This replace name... "Warrax"
playerSchema.methods.getShortDescription = function() { 
	return this.name;
};

// Like when standing in a room... "An annoying cat is meowing here."
playerSchema.methods.getDescription = function() {
	return this.name + " " + this.title;
};

playerSchema.methods.getFullnessIndex = function() {
	return this.caloriesConsumed[0] / this.maximumFullness;	
};

// Like when looked at... "Warrax is an awesome dude who looks, acts, and smells awesome."
playerSchema.methods.getDetailedDescription = function() {
    var result = [];

	var personalPronoun = this.getPersonalPronoun();
	var formattedPersonalPronoun = personalPronoun.charAt(0).toUpperCase() + personalPronoun.slice(1);
	//var fullnessIndex = this.caloriesConsumed[0] / this.maximumFullness;
	
	var description = this.name + " is a " + utility.getHeightAdjective(this.gender, this.height) + " " + utility.getGenderNoun(this.gender) + ".  " + 
		formattedPersonalPronoun + " is " + utility.getDetailedBmiDescription(this.getBMI()) + ".  " + formattedPersonalPronoun + " appears to be " + 
		utility.getHungerAdjective(this.getFullnessIndex()) + ".";

    result.push(description);
	result.push(this.name + " " + utility.getPositionDescription(this.position));

	var currentBmi = this.getBMI();

    for(var i = 0; i < global.MAX_WEARS; i++) {
		if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
			result.push(global.WEAR_WHERE[i] + this.wearing[i].getWornDescription(currentBmi));
		}
	}
	
	return result;
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

playerSchema.methods.toggleImmobility = function(mode) {
	var output = new Output(this);
	
	this.isNoImmobility = this.toggle(mode, this.isNoImmobility);
	
	if(this.isNoImmobility === false) {
		output.toActor.push( { text: "You are now affected by mobility limits." } );
	}
	else {
		output.toActor.push( { text: "You are now immune from weight-affected mobility limits." } );
	}
	
	return output;	
};

playerSchema.methods.toggleGoto = function(mode) {
	var output = new Output(this);
	
	this.isNoGoto = this.toggle(mode, this.toggleGoto);
	
	if(this.toggleGoto === false) {
		output.toActor.push( { text: "Other players will no longer be able to 'goto' you." } );
	}
	else {
		output.toActor.push( { text: "Other players will now be able to 'goto' you." } );
	}
	
	return output;	
};

playerSchema.methods.toggleSummon = function(mode) {
	var output = new Output(this);
	
	this.isNoSummon = this.toggle(mode, this.isNoSummon);
	
	if(this.isNoSummon === false) {
		output.toActor.push( { text: "Other players will no longer be able to 'summon' you." } );
	}
	else {
		output.toActor.push( { text: "Other players will now be able to 'isNoSummon' you." } );
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
		var prettyArray = utility.prettifyItemArray(this.inventory);
		
		for(var i = 0; i < prettyArray.length; i++) {
			output.toActor.push( { text: "  " + prettyArray[i] } );
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

	output.toActor.push( { text: "You are " + utility.getHungerAdjective(this.getFullnessIndex()) + "." } );

	output.toActor.push( { text: "caloriesConsumedArrayTotal: " + this.caloriesConsumed.total() } );
	output.toActor.push( { text: "caloriesConsumedTodayTotal: " + this.getCaloriesConsumedToday() } );
	output.toActor.push( { text: "maximumFullness: " + this.maximumFullness } );

	var commToggles = "You have the following communication toggles: Gossip:";
	
	if(this.isNoGossip === true) {
		commToggles = commToggles + "Off";
	}
	else {
		commToggles = commToggles + "On";
	}

	commToggles = commToggles + " Auctions:";
	
	if(this.isNoAuction === true) {
		commToggles = commToggles + "Off";
	}
	else {
		commToggles = commToggles + "On";
	}

	commToggles = commToggles + " Holler:";
	
	if(this.isNoHoller === true) {
		commToggles = commToggles + "Off";
	}
	else {
		commToggles = commToggles + "On";
	}

	commToggles = commToggles + " Shout:";
	
	if(this.isNoShout === true) {
		commToggles = commToggles + "Off";
	}
	else {
		commToggles = commToggles + "On";
	}
	
	commToggles = commToggles + " Congrats:";
	
	if(this.isNoGratz === true) {
		commToggles = commToggles + "Off";
	}
	else {
		commToggles = commToggles + "On";
	}
	
	output.toActor.push( { text: commToggles } );
	
	var optionToggles = "You have the following option toggles: Immobility:";
	
	if(this.isNoImmobility === false) {
		optionToggles = optionToggles + "On";
	}
	else {
		optionToggles = optionToggles + "Off";
	}
	
	optionToggles = optionToggles + " Goto:";
	
	if(this.isNoGoto === true) {
		optionToggles = optionToggles + "Off";
	}
	else {
		optionToggles = optionToggles + "On";
	}
	
	optionToggles = optionToggles + " Summon:";
	
	if(this.isNoSummon === true) {
		optionToggles = optionToggles + "Off";
	}
	else {
		optionToggles = optionToggles + "On";
	}
	
	output.toActor.push( { text: optionToggles } );
	
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

playerSchema.methods.goToRoom = function(keyword) {
	var output = new Output(this);
	
	var newRoom = this.world.getRoom(parseInt(keyword, 10));
	
	if(newRoom !== null) {
		
		var oldRoomId = this.room.id;
		
	 	this.room.removeCharacter(this);
	 	newRoom.addCharacter(this);
		output = newRoom.showRoomToCharacter(this);

		output.toRoom.push( { roomId: oldRoomId, text: "ACTOR_NAME shimmers and vanishes." } );
		output.toRoom.push( { roomId: newRoom.id, text: "ACTOR_NAME shimmers and appears." } );
	}
	
	return output;
};

playerSchema.methods.goToChararacter = function(keyword) {
	var output = new Output(this);
	
	var target = this.world.getPlayer(keyword);
	
	if(target === null) {
		output.toActor.push( { text: "Nobody by that name here!" } );
		return output;
	}
	else if(target === this) {
		output.toActor.push( { text: "Go to yourself?  But you're already here!" } );
		return output;
	}
	else if(target.isNoGoto === true) {
		output.toActor.push( { text: target.Name + " has disabled " + target.getPossessivePronoun() + " 'GOTO' option." } );
		return output;
	}
	
	var newRoom = target.room;
	
	if(newRoom !== null) {
		var oldRoomId = this.room.id;
		
	 	this.room.removeCharacter(this);
	 	newRoom.addCharacter(this);
		output = newRoom.showRoomToCharacter(this);

		output.toRoom.push( { roomId: oldRoomId, text: "ACTOR_NAME shimmers and vanishes." } );
		output.toRoom.push( { roomId: newRoom.id, text: "ACTOR_NAME shimmers and appears." } );
	}

	return output;
};

playerSchema.methods.summonChararacter = function(keyword) {
	var output = new Output(this);
	
	var target = this.world.getPlayer(keyword);
	
	if(target === null) {
		output.toActor.push( { text: "Nobody by that name here!" } );
		return output;
	}
	else if(target === this) {
		output.toActor.push( { text: "Summon yourself?  But you're already here!" } );
		return output;
	}
	else if(target.isNoSummon === true) {
		output.toActor.push( { text: target.Name + " has disabled " + target.getPossessivePronoun() + " 'SUMMON' option." } );
		return output;
	}
	
	var oldRoom = target.room;
	
	if(oldRoom !== null) {
		var oldRoomId = target.room.id;
		
	 	target.room.removeCharacter(this);
	 	this.room.addCharacter(this);
		output = this.room.showRoomToCharacter(target);

		output.toRoom.push( { roomId: oldRoomId, text: "ACTOR_NAME shimmers and vanishes." } );
		output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME shimmers and appears." } );
	}

	return output;
};

playerSchema.methods.getCaloriesConsumedToday = function() {
	var caloriesConsumedToday = 0;
	var calorieCredit = [ 0.75, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.1, 0.1, 0.1 ];
	
	for(var i = 0; i < this.caloriesConsumed.length; i++) {
		caloriesConsumedToday = caloriesConsumedToday + (calorieCredit[i] * this.caloriesConsumed[i]);
	}
	
	return caloriesConsumedToday;
};

playerSchema.methods.hourlyUpdate = function() {
// FIXME: Don't emit messages in a method like this.  Figure out a better way of doing it.
	// this.emitMessage("Hour....");
	
	this.bank = this.bank + global.HOURLY_DOLLAR_BONUS;


	
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
	
	
	if(this.getCaloriesConsumedToday() > global.CALORIES_TO_GAIN_ONE_POUND) {
		
		if(this.position >= global.POS_STANDING) {
			this.weight = this.weight + 1;
		}
		else if(this.position <= global.POS_SLEEPING) {
			this.weight = this.weight + 3;
		}
		else {
			this.weight = this.weight + 2;
		}
		
		this.emitMessage("You feel fatter.");
		this.emitRoomMessage(this.name + " looks fatter.");
		
		var newBmi = this.getBMI();
		
		for(var i = 0; i < global.MAX_WEARS; i++) {
			if(this.wearing[i] !== null && this.wearing[i] !== undefined) {
				
				var result = this.wearing[i].weightUpdate(this.name, newBmi);
				
				if(result !== undefined && result.length > 0) {
					this.emitMessage(result[0]);
					this.emitRoomMessage(result[1]);
				}
			}
		}
		
		if(this.using !== undefined && this.using !== null) {
			var result = this.using.weightUpdate(this.name, newBmi);
			
			if(result !== undefined && result.length > 0) {
				this.emitMessage(result[0]);
				this.emitRoomMessage(result[1]);
			}
		}
	}

	
	this.caloriesConsumed.pop();
	this.caloriesConsumed.unshift(0);
};

playerSchema.methods.dailyUpdate = function() {
	//this.emitMessage("Day....");
	

};


playerSchema.methods.handleWriting = function(input) {
	if(this.writingQueue === undefined || this.writingQueue === null) {
		this.writingQueue = [];
	}
	
	if(input !== "@") {
		this.writingQueue.push(input);
		this.writingQueue.push("\n\r");
	}
	else {
		var output = new Output(this);
		
		if(this.isMailing === true) {
			var mail = new Mail({ senderName: this.name.toLowerCase(), recipientName: this.writingTo.toLowerCase(), body: this.writingQueue.join("")});
	
			mail.save(function(err) {
	            // TODO: Log error, I guess?
	        });
	
			this.writingTo = "";
			
			output.toActor.push( { text: "Your letter has been sent!" } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME drops a letter through the mail slot." } );
		}
		else if(this.isWritingNote === true) {
			this.paper.written =  this.writingQueue.join("");
			this.paper = null;
			this.isWritingNote = false;
			
			output.toActor.push( { text: "Ok, got it!" } );
			output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops writing a note." } );
		}
		else if(this.isPosting === true) {
			if(this.board !== undefined && this.board !== null) {

				this.board.savePost(this, this.postId, this.postTitle, this.board.boardSource, this.writingQueue.join(""));
				
				this.isWriting = true;
				this.isPosting = true;
				this.board = null;
				
				output.toActor.push( { text: "Ok, posted!" } );
				output.toRoom.push( { roomId: this.room.id, text: "ACTOR_NAME stops writing a post." } );
			}
			else {
				// WTF?  Posting on a board that doesn't exist?
			}
		}
		
		output.emit();
		
		this.isMailing = false;
		this.isWriting = false;
		this.writingQueue = [];
	}
};

playerSchema.methods.writeNote = function(paperToken, penToken) {
	var output = new Output(this);

	var paperResult = this.inventory.findByKeyword(paperToken);

	if(paperResult.items.length === 0) {
		output.toActor.push( { text: "But what do you want to write on?" });
		return output;
	}
	else if (paperResult.items[0] instanceof note === false) {
		output.toActorMessage("FIRST_OBJECT_SHORTDESC: you can't write on THAT!", paperResult.items[0]);
		
		// console.log(output);
		return output;
	}
	
	var penResult = this.inventory.findByKeyword(penToken);
	
	if(penResult.items === null) {
		output.toActor.push( { text: "But what do you want to write with?" } );
		return output;
	}
	else if(penResult.items[0] instanceof pen === false) {
		output.toActorMessage("FIRST_OBJECT_SHORTDESC: you can't write with THAT!", penResult.items[0]);
		return output;
	}
	
	if(paperResult.items[0].isBlank() === false) {
		console.log('==>' + paperResult.items[0].getWrittenContents());
		output.toActor.push( { text: "But it's already been written on!" } );
		return output;
	}
	
	output.toActor.push( { text: "Write your note, use @ on a new line when done." } );
	output.toRoomMessage(this.room.id, "ACTOR_NAME starts to write a note.");
	this.isWriting = true;
	this.isWritingNote = true;
	this.paper = paperResult.items[0];
	this.writingQueue = [];
	
	return output;
};

playerSchema.methods

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

