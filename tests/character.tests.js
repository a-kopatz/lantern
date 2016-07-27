var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;
var World = require('../world');

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
    
    test.equal(actual.toActor[0].text, "You take a pair of blue gloves.");
    test.equal(actual.toActor[1].text, "You take a pair of black gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME takes a pair of blue gloves.");
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME takes a pair of black gloves.");
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
    
    test.equal(actual.toActor[0].text, "You take a pair of gloves.");
    test.equal(actual.toActor[1].text, "You take a plaid scarf.");
    test.equal(actual.toActor[2].text, "an ATM machine: You can't take THAT!");
    test.equal(actual.toActor[3].text, "You take an ugly shirt.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME takes a pair of gloves.");
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME takes a plaid scarf.");
    test.equal(actual.toRoom[2].textArray[0].text, "ACTOR_NAME takes an ugly shirt.");
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
    test.equal(actual.toActor[0].text, "You drop a pair of gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME drops a pair of gloves.");
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
    
    test.equal(actual.toActor[0].text, "You drop a pair of blue gloves.");
    test.equal(actual.toActor[1].text, "You drop a pair of black gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME drops a pair of blue gloves.");
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME drops a pair of black gloves.");
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
    
    test.equal(actual.toActor[0].text, "You drop a pair of blue gloves.");
    test.equal(actual.toActor[1].text, "You drop a pair of black gloves.");
    test.equal(actual.toActor[2].text, "You drop a cheese pizza.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME drops a pair of blue gloves.");
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME drops a pair of black gloves.");
    test.equal(actual.toRoom[2].textArray[0].text, "ACTOR_NAME drops a cheese pizza.");
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

    test.equal(actual.toActor[0].text, "You eat a cream-filled donut.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME eats a cream-filled donut.");
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
    
    test.equal(actual.toActor[0].text, "You give a pair of blue gloves to TARGET_NAME.");
    test.equal(actual.toActor[1].text, "You give a pair of black gloves to TARGET_NAME.");
    test.equal(actual.toTarget[0].text, "ACTOR_NAME gives you a pair of blue gloves.");
    test.equal(actual.toTarget[1].text, "ACTOR_NAME gives you a pair of black gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME gives a pair of blue gloves to TARGET_NAME.");
    test.equal(actual.toRoom[1].textArray[0].text, "ACTOR_NAME gives a pair of black gloves to TARGET_NAME.");
    test.equal(actor.inventory.length, 1);
    test.equal(target.inventory.length, 2);
    test.equal(target.inventory[0], gloves1);
    test.equal(target.inventory[1], gloves2);
    test.equal(actor.inventory[0], pizza);
    test.done();
};




