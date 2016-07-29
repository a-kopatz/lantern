var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../clothes').clothes;
var World = require('../world');

/////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////

exports.character_wakeReturnsErrorWhenNotSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var actual = actor.wake();
    
    test.equal(actual.toActor[0].text, "You are already awake...");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_wakeReturnsErrorWhenDead = function(test) {
    var actor = new Character();
    actor.position = global.POS_DEAD;
    
    var actual = actor.wake();
    
    test.equal(actual.toActor[0].text, "You can't wake up! You're in pretty bad shape!");
    test.equal(actor.position, global.POS_DEAD);
    test.done();
};

exports.character_wakeWorksWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.wake();
    
    test.equal(actual.toActor[0].text, "You awaken, and sit up.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME awakens and sits up.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_sayReturnsErrorWhenNoParameter = function(test) {
    var actor = new Character();

    var actual = actor.say('');
    
    test.equal(actual.toActor[0].text, 'Yes, but WHAT do you want to say?');
    test.done();
};

exports.character_saySendsExpectedMessage = function(test) {
    var actor = new Character();

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.say('Something everyone should hear!');
    
    test.equal(actual.toActor[0].text, "You say, 'Something everyone should hear!'");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME says, 'Something everyone should hear!'");
    test.done();
};


// TODO: Test gencomm here


///////////////////////////////////////////////////////////

exports.character_takeItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var actual = actor.takeItem('');
    test.equal(actual.toActor[0].text, 'But what do you want to take?');
    test.done();
};

exports.character_takeItemReturnsErrorWhenAllDotNotFound = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.takeItem('all.bread');
    test.equal(actual.toActor[0].text, "You can't seem to find any 'bread' things here.");
    test.done();
};

exports.character_takeItemTakesItemFromRoom = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves = new Item();
    gloves.keywords.push("gloves");
    gloves.shortDescription = "a pair of gloves";
    gloves.canBeTaken = true;
    room.addItem(gloves);
    
    var actual = actor.takeItem('gloves');
    test.equal(actual.toActor[0].text, "You take a pair of gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME takes a pair of gloves.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0], gloves);
    test.equal(room.contents.length, 0);
    test.done();
};

exports.character_takeItemReturnsErrorWhenItemCannotBeTaken = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var atm = new Item();
    atm.keywords.push("atm");
    atm.shortDescription = "an ATM machine";
    atm.canBeTaken = false;
    room.addItem(atm);

    var actual = actor.takeItem('atm');
    test.equal(actual.toActor[0].text, "an ATM machine: You can't take THAT!");
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 1);
    test.done();
};

exports.character_takeItemTakesItemFromRoom = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves1 = new Item();
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    room.addItem(gloves1);
    
    var gloves2 = new Item();
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    room.addItem(gloves2);
    
    var atm = new Item();
    atm.keywords.push("atm");
    atm.shortDescription = "an ATM machine";
    atm.canBeTaken = false;
    room.addItem(atm);
    
    var actual = actor.takeItem('all.gloves');
    
    test.equal(actual.toActor[0].text, "You take FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[0].items[0], gloves1);
    test.equal(actual.toActor[1].text, "You take FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[1].items[0], gloves2);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], gloves1);
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[1].textArray[0].items[0], gloves2);
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0], gloves1);
    test.equal(actor.inventory[1], gloves2);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], atm);
    test.done();
};

exports.character_takeItemTakesAllFromRoom = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves = new Item();
    gloves.keywords.push("gloves");
    gloves.shortDescription = "a pair of gloves";
    gloves.canBeTaken = true;
    room.addItem(gloves);
    
    var scarf = new Item();
    scarf.keywords.push("scarf");
    scarf.shortDescription = "a plaid scarf";
    scarf.canBeTaken = true;
    room.addItem(scarf);
    
    var atm = new Item();
    atm.keywords.push("atm");
    atm.shortDescription = "an ATM machine";
    atm.canBeTaken = false;
    room.addItem(atm);
    
    var shirt = new Item();
    shirt.keywords.push("shirt");
    shirt.shortDescription = "an ugly shirt";
    shirt.canBeTaken = true;
    room.addItem(shirt);
    
    var actual = actor.takeItem('all');
    
    test.equal(actual.toActor[0].text, "You take FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[0].items[0], gloves);
    test.equal(actual.toActor[1].text, "You take FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[1].items[0], scarf);
    test.equal(actual.toActor[2].text, "an ATM machine: You can't take THAT!");
    test.equal(actual.toActor[3].text, "You take FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[3].items[0], shirt);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], gloves);
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[1].textArray[0].items[0], scarf);
    test.equal(actual.toRoom[2].textArray[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[2].textArray[0].items[0], shirt);
    test.equal(actor.inventory.length, 3);
    test.equal(actor.inventory[0], gloves);
    test.equal(actor.inventory[1], scarf);
    test.equal(actor.inventory[2], shirt);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], atm);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_dropItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var actual = actor.dropItem('');
    test.equal(actual.toActor[0].text, "Drop what?!?");
    test.done();
};

exports.character_dropItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var actual = actor.dropItem('computer');
    test.equal(actual.toActor[0].text, "Drop what?!?");
    test.done();
};

exports.character_dropItemAddsToRoomInventory = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves = new Item();
    gloves.keywords.push("gloves");
    gloves.shortDescription = "a pair of gloves";
    gloves.canBeTaken = true;
    
    actor.inventory.push(gloves);
    
    var actual = actor.dropItem('gloves');
    test.equal(actual.toActor[0].text, "You drop FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[0].items[0], gloves);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME drops FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], gloves);
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], gloves);
    test.done();
};

exports.character_dropAllDotItemAddsToRoomContents = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves1 = new Item();
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    pizza.canBeTaken = false;
    actor.inventory.push(pizza);
    
    var actual = actor.dropItem('all.gloves');
    
    test.equal(actual.toActor[0].text, "You drop FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[0].items[0], gloves1);
    test.equal(actual.toActor[1].text, "You drop FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[1].items[0], gloves2);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME drops FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], gloves1);
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME drops FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[1].textArray[0].items[0], gloves2);
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0], pizza);
    test.equal(room.contents.length, 2);
    test.equal(room.contents[0], gloves1);
    test.equal(room.contents[1], gloves2);
    test.done();
};

exports.character_dropAllDropsEverythingToRoom = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves1 = new Item();
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    pizza.canBeTaken = false;
    actor.inventory.push(pizza);
    
    var actual = actor.dropItem('all');
    
    test.equal(actual.toActor[0].text, "You drop FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[0].items[0], gloves1);
    test.equal(actual.toActor[1].text, "You drop FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[1].items[0], gloves2);
    test.equal(actual.toActor[2].text, "You drop FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[2].items[0], pizza);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME drops FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], gloves1);
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME drops FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[1].textArray[0].items[0], gloves2);
    test.equal(actual.toRoom[2].textArray[0].text, "ACTOR_NAME drops FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[2].textArray[0].items[0], pizza);
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 3);
    test.equal(room.contents[0], gloves1);
    test.equal(room.contents[1], gloves2);
    test.equal(room.contents[2], pizza);
    test.done();
};

// TODO: Junk

// TODO: Donate

///////////////////////////////////////////////////////////

exports.character_eatItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var actual = actor.eatItem('');
    test.equal(actual.toActor[0].text, "Eat what?!?");
    test.done();
};

exports.character_eatItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var actual = actor.eatItem('computer');
    test.equal(actual.toActor[0].text, "Eat what?!?");
    test.done();
};

exports.character_eatItemReturnsErrorWhenItemIsNotFood = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var socks = new Item();
    socks.keywords.push("socks");
    socks.shortDescription = "a pair of socks";
    socks.type = global.ITEM_TRASH;
    actor.inventory.push(socks);

    var actual = actor.eatItem('socks');
    test.equal(actual.toActor[0].text, "a pair of socks -- You can't eat THAT!");
    test.equal(actor.inventory[0], socks);
    test.done();
};

exports.character_eatItemRemovesItemFromInventory = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var donut = new Item();
    donut.keywords.push("donut");
    donut.shortDescription = "a cream-filled donut";
    donut.type = global.ITEM_FOOD;
    actor.inventory.push(donut);

    myWorld.addItem(donut);

    var actual = actor.eatItem('donut');

    test.equal(actual.toActor[0].text, "You eat FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toActor[0].items[0], donut);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME eats FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], donut);
    test.equal(actor.inventory.length, 0);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_giveItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var actual = actor.giveItem('glue');
    test.equal(actual.toActor[0].text, 'Give what?');
    test.done();
};

exports.character_giveItemReturnsErrorWhenTargetNotFound = function(test) {
    var actor = new Character();
    actor.name = 'Mac';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var socks = new Item();
    socks.keywords.push("socks");
    socks.shortDescription = "a pair of socks";
    actor.inventory.push(socks);

    var actual = actor.giveItem('socks', 'kevin');
    test.equal(actual.toActor[0].text, 'No-one by that name here.');
    test.done();
};

exports.character_giveItemReturnsErrorWhenTargetIsSelf = function(test) {
    var actor = new Character();
    actor.name = 'Mac';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var socks = new Item();
    socks.keywords.push("socks");
    socks.shortDescription = "a pair of socks";
    actor.inventory.push(socks);

    var actual = actor.giveItem('socks', 'mac');
    test.equal(actual.toActor[0].text, 'Give something to yourself?!?');
    test.done();
};

exports.character_giveItemGivesAllDotItems = function(test) {
    var actor = new Character();
    actor.name = 'Mac';
    
    var target = new Character();
    target.name = 'Nick';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var gloves1 = new Item();
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    pizza.canBeTaken = false;
    actor.inventory.push(pizza);
    
    var actual = actor.giveItem('all.gloves', 'nick');
    
    test.equal(actual.toActor[0].text, "You give FIRST_OBJECT_SHORTDESC to TARGET_NAME.");
    test.equal(actual.toActor[0].items[0], gloves1);
    test.equal(actual.toActor[1].text, "You give FIRST_OBJECT_SHORTDESC to TARGET_NAME.");
    test.equal(actual.toActor[1].items[0], gloves2);
    test.equal(actual.toTarget[0].text, "ACTOR_NAME gives you FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toTarget[0].items[0], gloves1);
    test.equal(actual.toTarget[1].text, "ACTOR_NAME gives you FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toTarget[1].items[0], gloves2);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME gives FIRST_OBJECT_SHORTDESC to TARGET_NAME.");
    test.equal(actual.toRoom[0].textArray[0].items[0], gloves1);
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME gives FIRST_OBJECT_SHORTDESC to TARGET_NAME.");
    test.equal(actual.toRoom[1].textArray[0].items[0], gloves2);
    test.equal(actor.inventory.length, 1);
    test.equal(target.inventory.length, 2);
    test.equal(target.inventory[0], gloves1);
    test.equal(target.inventory[1], gloves2);
    test.equal(actor.inventory[0], pizza);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_checkBalanceReturnsExpectedMessages = function(test) {
    var actor = new Character();
    actor.bank = 0;
    
    var actual = actor.checkBankBalance();
    test.equal(actual.toActor[0].text, "You have no money deposited.");
    
    actor.bank = 1;
    actual = actor.checkBankBalance();
    test.equal(actual.toActor[0].text, "You have exactly 1 pathetic dollar deposited.");

    actor.bank = 300;
    actual = actor.checkBankBalance();
    test.equal(actual.toActor[0].text, "You have 300 dollars deposited.");
    
    test.done();    
};

///////////////////////////////////////////////////////////

exports.character_depositMoneyReturnsErrorWhenNotEnoughMoney = function(test) {
    var actor = new Character();
    actor.money = 100;
    actor.bank = 200;
    
    var actual = actor.depositMoney(500);
    test.equal(actual.toActor[0].text, "You don't have that much money!");
    test.equal(actor.money, 100);
    test.equal(actor.bank, 200);
    test.done();    
};

exports.character_depositMoneyIncreasesBankDecreasesMoney = function(test) {
    var actor = new Character();
    actor.money = 100;
    actor.bank = 200;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.depositMoney(50);
    test.equal(actual.toActor[0].text, "You deposit 50 dollars.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME makes a bank transaction.");
    test.equal(actor.money, 50);
    test.equal(actor.bank, 250);
    test.done();    
};

///////////////////////////////////////////////////////////

exports.character_withdrawMoneyReturnsErrorWhenNotEnoughMoney = function(test) {
    var actor = new Character();
    actor.money = 500;
    actor.bank = 20;
    
    var actual = actor.withdrawMoney(50);
    test.equal(actual.toActor[0].text, "You don't have that much money in the bank!");
    test.equal(actor.money, 500);
    test.equal(actor.bank, 20);
    test.done();    
};

exports.character_withdrawMoneyDecreasesBankIncreasesMoney = function(test) {
    var actor = new Character();
    actor.money = 75;
    actor.bank = 900;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.withdrawMoney(150);
    test.equal(actual.toActor[0].text, "You withdraw 150 dollars.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME makes a bank transaction.");
    test.equal(actor.money, 225);
    test.equal(actor.bank, 750);
    test.done();    
};

///////////////////////////////////////////////////////////

exports.character_openCloseDoorReturnsErrorWhenKeywordNotFound = function(test) {
    var world = new World();
    var room = new Room();
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("door", true);
    test.equal(result.toActor[0].text, "There doesn't appear to be any 'door' here.");
    test.done();
};

exports.character_closeDoorReturnsErrorWhenDoorIsClosed = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_CLOSEDOOR);
    test.equal(result.toActor[0].text, "But it's already closed.");
    test.done();
};

exports.character_closeDoorReturnsErrorWhenDoorIsNotClosable = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.isClosable = false;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_CLOSEDOOR);
    test.equal(result.toActor[0].text, "That can't be opened and closed.");
    test.done();
};

exports.character_closeDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.isClosable = true;
    exit.toRoomId = 2;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isClosed = false;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_CLOSEDOOR);

    test.equal(room.exits[0].isClosed, true);
    test.equal(result.toActor[0].text, "You close the hatch.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME closes the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isClosed, true);
    test.equal(result.toRoom[1].textArray[0].text, "The door is closed from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

exports.character_openDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.toRoomId = 2;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isClosed = true;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_OPENDOOR);

    test.equal(room.exits[0].isClosed, false);
    test.equal(result.toActor[0].text, "You open the hatch.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME opens the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isClosed, false);
    test.equal(result.toRoom[1].textArray[0].text, "The door is opened from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

exports.character_openDoorReturnsErrorWhenDoorIsLocked = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.isLocked = true;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_OPENDOOR);
    test.equal(result.toActor[0].text, "It's locked.");
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_lockUnlockDoorReturnsErrorWhenKeywordNotFound = function(test) {
    var world = new World();
    var room = new Room();
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("door", global.SCMD_LOCKDOOR);
    test.equal(result.toActor[0].text, "There doesn't appear to be any 'door' here.");
    test.done();
};

exports.character_lockUnlockDoorReturnsErrorWhenDoorIsOpen = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_UNLOCKDOOR);
    test.equal(result.toActor[0].text, "But it's wide open...");
    test.done();
};

exports.character_lockUnlockDoorReturnsErrorWhenDoorIsNotClosable = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.isClosable = false;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_UNLOCKDOOR);
    
    // You can't get to the 'real' error condition
    test.equal(result.toActor[0].text, "But it's wide open...");
    test.done();
};

exports.character_lockUnlockDoorReturnsErrorWhenDoorIsNotClosable = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.keyId = 99;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_LOCKDOOR);
    test.equal(result.toActor[0].text, "You don't seem to have the right key for that.");
    test.done();
};

exports.character_unlockDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.isLocked = true;
    exit.isLockable = true;
    exit.toRoomId = 2;
    exit.keyId = 5;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isClosed = true;
    oppositeExit.isLocked = true;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var item = new Item();
    item.id = 5;
    actor.inventory.push(item);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_UNLOCKDOOR);

    test.equal(room.exits[0].isClosed, true);
    test.equal(room.exits[0].isLocked, false);
    test.equal(result.toActor[0].text, "You unlock the hatch.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME unlocks the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isClosed, true);
    test.equal(oppositeRoom.exits[0].isLocked, false);
    test.equal(result.toRoom[1].textArray[0].text, "The door is unlocked from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

exports.character_lockDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.isLocked = false;
    exit.isLockable = true;
    exit.toRoomId = 2;
    exit.keyId = 5;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isLocked = false;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var item = new Item();
    item.id = 5;
    actor.inventory.push(item);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_LOCKDOOR);

    test.equal(room.exits[0].isLocked, true);
    test.equal(result.toActor[0].text, "You lock the hatch.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME locks the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isLocked, true);
    test.equal(result.toRoom[1].textArray[0].text, "The door is locked from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_wearObjectAsLightWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a torch";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_LIGHT);
    test.equal(result[0], "You light a torch and hold it.");
    test.equal(result[1], "ACTOR_NAME lights a torch and holds it.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_LIGHT], myItem);
    test.done();
};

exports.character_wearObjectAsLightReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a torch";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a lantern";
    actor.wearing[global.WEAR_LIGHT] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_LIGHT);
    test.equal(result, "You're already using a light.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_LIGHT], myOtherItem);
    test.done();
};

exports.character_wearObjectAsRightRingWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_FINGER_R);
    test.equal(result[0], "You slide a gold ring onto your right ring finger.");
    test.equal(result[1], "ACTOR_NAME slides a gold ring onto ACTOR_PRONOUN_POSSESSIVE right ring finger.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FINGER_R], myItem);
    test.done();
};

exports.character_wearObjectAsLeftRingWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_FINGER_L);
    test.equal(result[0], "You slide a gold ring onto your left ring finger.");
    test.equal(result[1], "ACTOR_NAME slides a gold ring onto ACTOR_PRONOUN_POSSESSIVE left ring finger.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myItem);
    test.done();
};

exports.character_wearObjectAsLeftRingReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a jade ring";
    actor.wearing[global.WEAR_FINGER_L] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a ruby ring";
    actor.wearing[global.WEAR_FINGER_R] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_FINGER_L);
    test.equal(result, "You're already wearing something on both of your ring fingers.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_FINGER_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsRightRingReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a jade ring";
    actor.wearing[global.WEAR_FINGER_L] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a ruby ring";
    actor.wearing[global.WEAR_FINGER_R] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_FINGER_R);
    test.equal(result, "You're already wearing something on both of your ring fingers.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_FINGER_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsRightRingSwitchesWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a ruby ring";
    actor.wearing[global.WEAR_FINGER_R] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_FINGER_R);
    test.equal(result[0], "You slide a gold ring onto your left ring finger.");
    test.equal(result[1], "ACTOR_NAME slides a gold ring onto ACTOR_PRONOUN_POSSESSIVE left ring finger.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myItem);
    test.done();
};

exports.character_wearObjectAsNeck1Works = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_NECK_1);
    test.equal(result[0], "You wear a silver pendant around your neck.");
    test.equal(result[1], "ACTOR_NAME wears a silver pendant around ACTOR_PRONOUN_POSSESSIVE neck.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_NECK_1], myItem);
    test.done();
};

exports.character_wearObjectAsNeck2Works = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_NECK_2);
    test.equal(result[0], "You wear a silver pendant around your neck.");
    test.equal(result[1], "ACTOR_NAME wears a silver pendant around ACTOR_PRONOUN_POSSESSIVE neck.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_NECK_2], myItem);
    test.done();
};

exports.character_wearObjectAsNeck1ReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);

    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a gold charm";
    actor.wearing[global.WEAR_NECK_1] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a silver charm";
    actor.wearing[global.WEAR_NECK_2] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_NECK_1);
    test.equal(result, "You can't wear anything else around your neck.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_NECK_1], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_NECK_2], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsNeck2ReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);

    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a gold charm";
    actor.wearing[global.WEAR_NECK_1] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a silver charm";
    actor.wearing[global.WEAR_NECK_2] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_NECK_2);
    test.equal(result, "You can't wear anything else around your neck.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_NECK_1], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_NECK_2], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsNeck1SwitchesToNeck2WhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);

    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a gold charm";
    actor.wearing[global.WEAR_NECK_1] = myOtherItem1;

    var result = actor.wearObject(myItem, global.WEAR_NECK_1);
    test.equal(result[0], "You wear a silver pendant around your neck.");
    test.equal(result[1], "ACTOR_NAME wears a silver pendant around ACTOR_PRONOUN_POSSESSIVE neck.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_NECK_2], myItem);
    test.done();
};

exports.character_wearObjectOnBodyWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "some leather armor";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_BODY);
    test.equal(result[0], "You wear some leather armor on your body.");
    test.equal(result[1], "ACTOR_NAME wears some leather armor on ACTOR_PRONOUN_POSSESSIVE body.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_BODY], myItem);
    test.done();
};

exports.character_wearObjectOnBodyReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "some leather armor";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "some sweet pajamas";
    actor.wearing[global.WEAR_BODY] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_BODY);
    test.equal(result, "You're already wearing something on your body.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_BODY], myOtherItem);
    test.done();
};

exports.character_wearObjectOnHeadWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silly hat";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_HEAD);
    test.equal(result[0], "You wear a silly hat on your head.");
    test.equal(result[1], "ACTOR_NAME wears a silly hat on ACTOR_PRONOUN_POSSESSIVE head.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HEAD], myItem);
    test.done();
};

exports.character_wearObjectOnHeadReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silly hat";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a cool hat";
    actor.wearing[global.WEAR_HEAD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_HEAD);
    test.equal(result, "You're already wearing something on your head.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.wearing[global.WEAR_HEAD], myOtherItem);
    test.done();
};

exports.character_wearObjectOnLegsWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "jeans";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_LEGS);
    test.equal(result[0], "You wear jeans on your legs.");
    test.equal(result[1], "ACTOR_NAME wears jeans on ACTOR_PRONOUN_POSSESSIVE legs.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_LEGS], myItem);
    test.done();
};

exports.character_wearObjectOnLegsReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "jeans";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "khakis";
    actor.wearing[global.WEAR_LEGS] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_LEGS);
    test.equal(result, "You're already wearing something on your legs.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_LEGS], myOtherItem);
    test.done();
};

exports.character_wearObjectOnFeetWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Air Jordans";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_FEET);
    test.equal(result[0], "You wear Air Jordans on your feet.");
    test.equal(result[1], "ACTOR_NAME wears Air Jordans on ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FEET], myItem);
    test.done();
};

exports.character_wearObjectOnFeetReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Air Jordans";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "loafers";
    actor.wearing[global.WEAR_FEET] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_FEET);
    test.equal(result, "You're already wearing something on your feet.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_FEET], myOtherItem);
    test.done();
};

exports.character_wearObjectOnHandsWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "wooly mittens";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_HANDS);
    test.equal(result[0], "You wear wooly mittens on your hands.");
    test.equal(result[1], "ACTOR_NAME wears wooly mittens on ACTOR_PRONOUN_POSSESSIVE hands.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HANDS], myItem);
    test.done();
};

exports.character_wearObjectOnHandsReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "wooly mittens";
    actor.inventory.push(myItem);

    var myOtherItem = new Item();
    myOtherItem.shortDescription = "swordsmen's gloves";
    actor.wearing[global.WEAR_HANDS] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_HANDS);
    test.equal(result, "You're already wearing something on your hands.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_HANDS], myOtherItem);
    test.done();
};

exports.character_wearObjectOnArmsWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "leather sleeves";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_ARMS);
    test.equal(result[0], "You wear leather sleeves on your arms.");
    test.equal(result[1], "ACTOR_NAME wears leather sleeves on ACTOR_PRONOUN_POSSESSIVE arms.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_ARMS], myItem);
    test.done();
};

exports.character_wearObjectOnArmsReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "leather sleeves";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "mithril sleeves";
    actor.wearing[global.WEAR_ARMS] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_ARMS);
    test.equal(result, "You're already wearing something on your arms.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_ARMS], myOtherItem);
    test.done();
};

exports.character_wearObjectAsShieldWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "an iron shield";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_SHIELD);
    test.equal(result[0], "You start to use an iron shield as a shield.");
    test.equal(result[1], "ACTOR_NAME straps an iron shield around ACTOR_PRONOUN_POSSESSIVE arm as a shield.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_SHIELD], myItem);
    test.done();
};

exports.character_wearObjectAsShieldReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "an iron shield";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a wooden shield";
    actor.wearing[global.WEAR_SHIELD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_SHIELD);
    test.equal(result, "You're already using a shield.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_SHIELD], myOtherItem);
    test.done();
};

exports.character_wearObjectAboutBodyWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a cloak";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_ABOUT);
    test.equal(result[0], "You wear a cloak around your body.");
    test.equal(result[1], "ACTOR_NAME wears a cloak about ACTOR_PRONOUN_POSSESSIVE body.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_ABOUT], myItem);
    test.done();
};

exports.character_wearObjectAboutBodyReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a cloak";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a unicorn hide";
    actor.wearing[global.WEAR_ABOUT] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_ABOUT);
    test.equal(result, "You're already wearing something about your body.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_ABOUT], myOtherItem);
    test.done();
};

exports.character_wearObjectAroundWaistWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Batman's Utility Belt";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WAIST);
    test.equal(result[0], "You wear Batman's Utility Belt around your waist.");
    test.equal(result[1], "ACTOR_NAME wears Batman's Utility Belt around ACTOR_PRONOUN_POSSESSIVE waist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WAIST], myItem);
    test.done();
};

exports.character_wearObjectAroundWaistReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Batman's Utility Belt";
    actor.inventory.push(myItem);

    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a leather belt";
    actor.wearing[global.WEAR_WAIST] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_WAIST);
    test.equal(result, "You're already wearing something around your waist.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WAIST], myOtherItem);
    test.done();
};

exports.character_wearObjectOnRightWristWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_R);
    test.equal(result[0], "You wear a watch around your right wrist.");
    test.equal(result[1], "ACTOR_NAME wears a watch around ACTOR_PRONOUN_POSSESSIVE right wrist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myItem);
    test.done();
};

exports.character_wearObjectOnLeftWristWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "an ebony bracelet";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_L);
    test.equal(result[0], "You wear an ebony bracelet around your left wrist.");
    test.equal(result[1], "ACTOR_NAME wears an ebony bracelet around ACTOR_PRONOUN_POSSESSIVE left wrist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myItem);
    test.done();
};

exports.character_wearObjectOnRightWristReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a bracelet";
    actor.wearing[global.WEAR_WRIST_L] = myOtherItem1;
    
    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a rubber band";
    actor.wearing[global.WEAR_WRIST_R] = myOtherItem2;
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_R);
    test.equal(result, "You're already wearing something around both of your wrists.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectOnLeftWristReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a bracelet";
    actor.wearing[global.WEAR_WRIST_L] = myOtherItem1;
    
    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a rubber band";
    actor.wearing[global.WEAR_WRIST_R] = myOtherItem2;
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_L);
    test.equal(result, "You're already wearing something around both of your wrists.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectOnRightWristSwitchesWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a rubber band";
    actor.wearing[global.WEAR_WRIST_R] = myOtherItem2;
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_R);
    test.equal(result[0], "You wear a watch around your left wrist.");
    test.equal(result[1], "ACTOR_NAME wears a watch around ACTOR_PRONOUN_POSSESSIVE left wrist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myItem);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectWieldWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a huge friggin battleaxe";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WIELD);
    test.equal(result[0], "You wield a huge friggin battleaxe.");
    test.equal(result[1], "ACTOR_NAME wields a huge friggin battleaxe.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WIELD], myItem);
    test.done();
};

exports.character_wearObjectWieldReturnsErrorWhenAlreadyWielding = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a huge friggin battleaxe";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a board with a rusty nail in it";
    actor.wearing[global.WEAR_WIELD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_WIELD);
    test.equal(result, "You're already wielding a weapon.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WIELD], myOtherItem);
    test.done();
};

exports.character_wearObjectHeldWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a clear stone";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_HOLD);
    test.equal(result[0], "You grab a clear stone.");
    test.equal(result[1], "ACTOR_NAME grabs a clear stone.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HOLD], myItem);
    test.done();
};

exports.character_wearObjectHeldReturnsErrorWhenAlreadyHolding = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a clear stone";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a red stone";
    actor.wearing[global.WEAR_HOLD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_HOLD);
    test.equal(result, "You're already holding something.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_HOLD], myOtherItem);
    test.done();
};

exports.character_wearItemWearsItem = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var hat = new Clothes();
    hat.keywords.push("hat");
    hat.shortDescription = "a hat";
    hat.wearSlots.push(global.WEAR_HEAD);
    actor.inventory.push(hat);

    var output = actor.wearItem("hat");
    test.equal(output.toActor[0].text, "You wear a hat on your head.");
    test.equal(output.toRoom[0].textArray[0].text, "ACTOR_NAME wears a hat on ACTOR_PRONOUN_POSSESSIVE head.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HEAD], hat);
    test.done();
};

exports.character_wearItemReturnsErrorWhenItemNotFound = function(test) {
    var myWorld = new World();
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);
    myWorld.addCharacter(actor);
    
    var output = actor.wearItem("hat");
    test.equal(output.toActor[0].text, "Wear what?!?");
    test.done();
};

exports.character_wearItemReturnsErrorWhenItemIsNotWearable = function(test) {
    var actor = new Character();

    var hat = new Item();
    hat.keywords.push("hat");
    hat.shortDescription = "a hat";
    hat.wearSlots = [];
    actor.inventory.push(hat);

    var output = actor.wearItem("hat");
    test.equal(output.toActor[0].text, "You can't wear a hat.");
    test.equal(actor.inventory[0], hat);
    test.done();
};

exports.character_wearItemWearsAllItems = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var hat = new Clothes();
    hat.keywords.push("hat");
    hat.shortDescription = "a hat";
    hat.wearSlots.push(global.WEAR_HEAD);
    actor.inventory.push(hat);

    var shoes = new Clothes();
    shoes.keywords.push("shoes");
    shoes.shortDescription = "shoes";
    shoes.wearSlots.push(global.WEAR_FEET);
    actor.inventory.push(shoes);

    var shirt = new Clothes();
    shirt.keywords.push("shirt");
    shirt.shortDescription = "a shirt";
    shirt.wearSlots.push(global.WEAR_BODY);
    actor.inventory.push(shirt);

    var output = actor.wearItem("all");
    test.equal(output.toActor[0].text, "You wear a hat on your head.");
    test.equal(output.toRoom[0].textArray[0].text, "ACTOR_NAME wears a hat on ACTOR_PRONOUN_POSSESSIVE head.");
    test.equal(output.toActor[1].text, "You wear shoes on your feet.");
    test.equal(output.toRoom[1].textArray[0].text, "ACTOR_NAME wears shoes on ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(output.toActor[2].text, "You wear a shirt on your body.");
    test.equal(output.toRoom[2].textArray[0].text, "ACTOR_NAME wears a shirt on ACTOR_PRONOUN_POSSESSIVE body.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HEAD], hat);
    test.equal(actor.wearing[global.WEAR_FEET], shoes);
    test.equal(actor.wearing[global.WEAR_BODY], shirt);
    test.done();
};

///////////////////////////////////////////////////////////

// TODO: Test 'remove'




///////////////////////////////////////////////////////////

exports.character_lookTargetReturnsErrorWhenNothingFound = function(test) {
    var actor = new Character();
    actor.keywords = [];
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);
    
    // Player typed 'look at monkey'
    var result = actor.lookTarget( { tokens: [ "monkey" ], allTokens: [ "look", "at", "monkey" ] } );
    test.equal(result.toActor[0].text, "You do not see that here.");
    test.done();
};

exports.character_lookTargetReturnsObjectDescriptionsWhenWorn = function(test) {
    var actor = new Character();
    actor.keywords = [];
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);
    
    var item = new Item();
    item.keywords.push("chain");
    item.shortDescription = "a gold chain";
    item.longDescription = "It's a chain made of gold.  Duh.";
    actor.wearing[global.WEAR_NECK_1] = item;
    
    // Player typed 'look at chain'
    var result = actor.lookTarget( { tokens: [ "chain" ], allTokens: [ "look", "at", "chain" ] } );
    test.equal(result.toActor[0].text, "You look at a gold chain.");
    test.equal(result.toActor[1].text, "It's a chain made of gold.  Duh.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks at a gold chain.");
    test.done();
};

exports.character_lookTargetReturnsObjectDescriptionsWhenWorn = function(test) {
    var actor = new Character();
    actor.keywords = [];
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);
    
    var item = new Item();
    item.keywords.push("chain");
    item.shortDescription = "a gold chain";
    item.longDescription = "It's a chain made of gold.  Duh.";
    actor.inventory.push(item);
    
    // Player typed 'look at chain'
    var result = actor.lookTarget( { tokens: [ "chain" ], allTokens: [ "look", "at", "chain" ] } );
    test.equal(result.toActor[0].text, "You look at a gold chain.");
    test.equal(result.toActor[1].text, "It's a chain made of gold.  Duh.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks at a gold chain.");
    test.done();
};

exports.character_lookTargetReturnsObjectDescriptionsWhenInRoom = function(test) {
    var actor = new Character();
    actor.keywords = [];
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);
    
    var item = new Item();
    item.keywords.push("chain");
    item.shortDescription = "a gold chain";
    item.longDescription = "It's a chain made of gold.  Duh.";
    room.contents.push(item);
    
    // Player typed 'look at chain'
    var result = actor.lookTarget( { tokens: [ "chain" ], allTokens: [ "look", "at", "chain" ] } );
    test.equal(result.toActor[0].text, "You look at a gold chain.");
    test.equal(result.toActor[1].text, "It's a chain made of gold.  Duh.");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks at a gold chain.");
    test.done();
};

exports.character_lookInTargetFindsCarried = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);

    var item = new Item();
    item.keywords.push("duck");
    item.shortDescription = "a gold duck";
    actor.inventory.push(item);
    
    var result = actor.lookInTarget("duck");
    
    test.equal(result.toActor[0].text, "a gold duck (carried): ");
    test.equal(result.toActor[1].text, "There's nothing inside that!");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks in a gold duck.");
    test.done();
};

exports.character_lookInTargetFindsWorn = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);

    var item = new Item();
    item.keywords.push("vest");
    item.shortDescription = "a filthy vest";
    actor.wearing[global.WEAR_ARMS] = item;
    
    var result = actor.lookInTarget("vest");
    
    test.equal(result.toActor[0].text, "a filthy vest (worn): ");
    test.equal(result.toActor[1].text, "There's nothing inside that!");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks in a filthy vest.");
    test.done();
};

exports.character_lookInTargetFindsInRoom = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);

    var item = new Item();
    item.keywords.push("blob");
    item.shortDescription = "a blob of crap";
    room.contents.push(item);
    
    var result = actor.lookInTarget("blob");
    
    test.equal(result.toActor[0].text, "a blob of crap (here): ");
    test.equal(result.toActor[1].text, "There's nothing inside that!");
    test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks in a blob of crap.");
    test.done();
};


exports.character_getDescriptionReturnsWearingLight = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a torch";
    char.wearing[global.WEAR_LIGHT] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <used as light>      a torch");
    test.done();
};

exports.character_getDescriptionReturnsWearingRightFinger = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a sapphire ring";
    char.wearing[global.WEAR_FINGER_R] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on finger>     a sapphire ring");
    test.done();
};

exports.character_getDescriptionReturnsWearingLeftFinger = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a ruby ring";
    char.wearing[global.WEAR_FINGER_L] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on finger>     a ruby ring");
    test.done();
};

exports.character_getDescriptionReturnsWearingNeck1 = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a jade pendant";
    char.wearing[global.WEAR_NECK_1] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn around neck>   a jade pendant");
    test.done();
};

exports.character_getDescriptionReturnsWearingNeck2 = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "an emerald pendant";
    char.wearing[global.WEAR_NECK_2] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn around neck>   an emerald pendant");
    test.done();
};

exports.character_getDescriptionReturnsWearingBody = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "leather armor";
    char.wearing[global.WEAR_BODY] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on body>       leather armor");
    test.done();
};

exports.character_getDescriptionReturnsWearingHead = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "the Helm of Ursula";
    char.wearing[global.WEAR_HEAD] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on head>       the Helm of Ursula");
    test.done();
};

exports.character_getDescriptionReturnsWearingLegs = function(test) {
    var char = new Character();
    
    var item = new Item();
    item.shortDescription = "Dragonscale Leggings";
    char.wearing[global.WEAR_LEGS] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on legs>       Dragonscale Leggings");
    test.done();
};

exports.character_getDescriptionReturnsWearingFeet = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "some iron boots";
    char.wearing[global.WEAR_FEET] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on feet>       some iron boots");
    test.done();
};

exports.character_getDescriptionReturnsWearingHands = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "Swordsman's Gloves";
    char.wearing[global.WEAR_HANDS] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on hands>      Swordsman's Gloves");
    test.done();
};

exports.character_getDescriptionReturnsWearingArms = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "the blood of your victims";
    char.wearing[global.WEAR_ARMS] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn on arms>       the blood of your victims");
    test.done();
};

exports.character_lookAtCharacterReturnsWearingShield = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a wooden plank";
    char.wearing[global.WEAR_SHIELD] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn as shield>     a wooden plank");
    test.done();
};

exports.character_getDescriptionReturnsWearingAboutBody = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "The Cloak of Doom";
    char.wearing[global.WEAR_ABOUT] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn about body>    The Cloak of Doom");
    test.done();
};

exports.character_getDescriptionReturnsWearingWaist = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "The Cloak of Doom";
    char.wearing[global.WEAR_WAIST] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn about waist>   The Cloak of Doom");
    test.done();
};

exports.character_getDescriptionReturnsWearingWristR = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a diamond bracelet";
    char.wearing[global.WEAR_WRIST_R] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn around wrist>  a diamond bracelet");
    test.done();
};

exports.character_getDescriptionReturnsWearingWristL = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a zirconium bracelet";
    char.wearing[global.WEAR_WRIST_L] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <worn around wrist>  a zirconium bracelet");
    test.done();
};

exports.character_getDescriptionReturnsWearingWield = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "Thor's Hammer";
    char.wearing[global.WEAR_WIELD] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <wielded>            Thor's Hammer");
    test.done();
};

exports.character_getDescriptionReturnsWearingHold = function(test) {
    var char = new Character();

    var item = new Item();
    item.shortDescription = "a Sapphire Dragonscale";
    char.wearing[global.WEAR_HOLD] = item;

    var result = char.getDescription();
    test.equal(result[0], "  <held>               a Sapphire Dragonscale");
    test.done();
};
