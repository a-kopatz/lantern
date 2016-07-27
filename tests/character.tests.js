var Character = require("../character").character;
var Room = require("../room").room;

// /////////////////////////////////////////////////

exports.character_getPersonalPronoun_worksForNeutral = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_NEUTRAL;
    test.equal(myCharacter.getPersonalPronoun(), "it");
	test.done();
};

exports.character_getPersonalPronoun_worksForMale = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_MALE;
    test.equal(myCharacter.getPersonalPronoun(), "he");
	test.done();
};

exports.character_getPersonalPronoun_worksForFemale = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_FEMALE;
    test.equal(myCharacter.getPersonalPronoun(), "she");
	test.done();
};

exports.character_getObjectPronoun_worksForNeutral = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_NEUTRAL;
    test.equal(myCharacter.getObjectPronoun(), "it");
	test.done();
};

exports.character_getObjectPronoun_worksForMale = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_MALE;
    test.equal(myCharacter.getObjectPronoun(), "him");
	test.done();
};

exports.character_getObjectPronoun_worksForFemale = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_FEMALE;
    test.equal(myCharacter.getObjectPronoun(), "her");
	test.done();
};

exports.character_getPossessivePronoun_worksForNeutral = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_NEUTRAL;
    test.equal(myCharacter.getPossessivePronoun(), "its");
	test.done();
};

exports.character_getPossessivePronoun_worksForMale = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_MALE;
    test.equal(myCharacter.getPossessivePronoun(), "his");
	test.done();
};

exports.character_getPossessivePronoun_worksForFemale = function(test) {
    var myCharacter = new Character();
    myCharacter.gender = global.GENDER_FEMALE;
    test.equal(myCharacter.getPossessivePronoun(), "her");
	test.done();
};

/////////////////////////////////////////////////

exports.character_getFormattedHeight = function(test) {
    var myCharacter = new Character();
    myCharacter.height = 62;
    
    var actual = myCharacter.getFormattedHeight();
    test.equal(actual, "5 feet, 2 inches");
    test.done();
};

/////////////////////////////////////////////////

exports.character_getBMI = function(test) {
    var myCharacter = new Character();
    myCharacter.weight = 178;
    myCharacter.height = 62;
    
    var actual = myCharacter.getBMI();
    test.equal(actual, 32);
    test.done();
};

/////////////////////////////////////////////////

// TODO: MOVE tests

/////////////////////////////////////////////////


/////////////////////////////////////////////////

exports.character_emoteSendsIdenticalMessagesToActorAndRoom = function(test) {
    var actor = new Character();
    actor.name = "Ace";
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.emote("feels the love.");
    
    test.equal(actual.toActor[0].text, "Ace feels the love.");
    test.equal(actual.toRoom[0].textArray[0].text, "Ace feels the love.");
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_standReturnsErrorWhenAlreadyStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var actual = actor.stand();

    test.equal(actual.toActor[0].text, "You are already standing.");
    test.equal(actor.position, global.POS_STANDING);
    test.done();
};

exports.character_standWorksWhenSitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.stand();

    test.equal(actual.toActor[0].text, "You stand up.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME clambers to ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(actor.position, global.POS_STANDING);
    test.done();
};

exports.character_standWorksWhenResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.stand();
    
    test.equal(actual.toActor[0].text, "You stop resting, and stand up.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME stops resting, and clambers on ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(actor.position, global.POS_STANDING);
    test.done();
};

exports.character_standReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.stand();
    
    test.equal(actual.toActor[0].text, "You have to wake up first!");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_sitWorksWhenStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You sit down.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME sits down.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

exports.character_sitReturnsErrorWhenAlreadySitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You're sitting already.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

exports.character_sitWorksWhenResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You stop resting, and sit up.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME stops resting.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

exports.character_sitReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You have to wake up first.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_restWorksWhenStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You sit down and rest your tired bones.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME sits down and rests.");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_restWorksWhenSitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You rest your tired bones.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME rests.");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_restReturnsErrorWhenAlreadyResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You are resting already.");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_restReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You have to wake up first.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_sleepWorksWhenStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You go to sleep.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME lies down and falls asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

exports.character_sleepWorksWhenSitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You go to sleep.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME lies down and falls asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

exports.character_sleepWorksWhenResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You go to sleep.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME lies down and falls asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

exports.character_sleepReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You are already sound asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

