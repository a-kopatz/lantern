var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../items/clothes').clothes;
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
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "Ace feels the love.");
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
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME says, 'Something everyone should hear!'");
    test.done();
};


/////////////////////////////////////////////////

exports.character_tellReturnsErrorWhenCharacterNotFound = function(test) {
    var myWorld = new World();
    
    var actor = new Character();
    actor.name = "Actor";
    myWorld.addCharacter(actor);

    var result = actor.tell("target", "hi!");
    test.equal(result.toActor[0].text, "No-one by that name here.");
    test.done();    
};

exports.character_tellWorksWhenCharacterFound = function(test) {
    var myWorld = new World();
    
    var actor = new Character();
    actor.name = "Actur";
    myWorld.addCharacter(actor);

    var target = new Character();
    target.name = "Targut";
    myWorld.addCharacter(target);

    var result = actor.tell("targut", "hi!");
    test.equal(result.toActor[0].text, "You tell Targut, 'hi!'");
    test.equal(result.toActor[0].color, "Red");
    test.equal(result.toTarget[0].text, "ACTOR_NAME tells you, 'hi!'");
    test.equal(result.toTarget[0].color, "Red");
    test.done();    
};

    
/////////////////////////////////////////////////

// TODO: Test gencomm here



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
    test.equal(actual.toRoom[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].items[0], gloves);
    test.equal(actual.toRoom[1].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[1].roomId, 3001);    
    test.equal(actual.toRoom[1].items[0], scarf);
    test.equal(actual.toRoom[2].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[2].roomId, 3001);    
    test.equal(actual.toRoom[2].items[0], shirt);
    test.equal(actor.inventory.length, 3);
    test.equal(actor.inventory[0], gloves);
    test.equal(actor.inventory[1], scarf);
    test.equal(actor.inventory[2], shirt);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], atm);
    test.done();
};


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

// FIXME
// exports.character_eatItemReturnsErrorWhenItemIsNotFood = function(test) {
//     var actor = new Character();
    
//     var room = new Room();
//     room.id = 3001;
//     room.addCharacter(actor);
    
//     var socks = new Item();
//     socks.keywords.push("socks");
//     socks.shortDescription = "a pair of socks";
//     socks.type = global.ITEM_TRASH;
//     actor.inventory.push(socks);

//     var actual = actor.eatItem('socks');
//     test.equal(actual.toActor[0].text, "a pair of socks -- You can't eat THAT!");
//     test.equal(actor.inventory[0], socks);
//     test.done();
// };


// exports.character_eatItemRemovesItemFromInventory = function(test) {
//     var actor = new Character();
//     actor.caloriesConsumed = [ 0 ];
    
//     var room = new Room();
//     room.id = 3001;
//     room.addCharacter(actor);
    
//     var myWorld = new World();
//     myWorld.addCharacter(actor);
    
//     var donut = new Item();
//     donut.keywords.push("donut");
//     donut.shortDescription = "a cream-filled donut";
//     donut.type = global.ITEM_FOOD;
//     actor.inventory.push(donut);

//     myWorld.addItem(donut);

//     var actual = actor.eatItem('donut');

//     test.equal(actual.toActor[0].text, "You eat FIRST_OBJECT_SHORTDESC.");
//     test.equal(actual.toActor[0].items[0], donut);
//     test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME eats FIRST_OBJECT_SHORTDESC.");
//     test.equal(actual.toRoom[0].textArray[0].items[0], donut);
//     test.equal(actor.inventory.length, 0);
//     test.done();
// };


























///////////////////////////////////////////////////////////

// TODO: MOVE THESE TO BANKING TESTS

// exports.character_checkBalanceReturnsExpectedMessages = function(test) {
//     var actor = new Character();
//     actor.bank = 0;
    
//     var actual = actor.checkBankBalance();
//     test.equal(actual.toActor[0].text, "You have no money deposited.");
    
//     actor.bank = 1;
//     actual = actor.checkBankBalance();
//     test.equal(actual.toActor[0].text, "You have exactly 1 pathetic dollar deposited.");

//     actor.bank = 300;
//     actual = actor.checkBankBalance();
//     test.equal(actual.toActor[0].text, "You have 300 dollars deposited.");
    
//     test.done();    
// };

// ///////////////////////////////////////////////////////////

// exports.character_depositMoneyReturnsErrorWhenNotEnoughMoney = function(test) {
//     var actor = new Character();
//     actor.money = 100;
//     actor.bank = 200;
    
//     var actual = actor.depositMoney(500);
//     test.equal(actual.toActor[0].text, "You don't have that much money!");
//     test.equal(actor.money, 100);
//     test.equal(actor.bank, 200);
//     test.done();    
// };

// exports.character_depositMoneyIncreasesBankDecreasesMoney = function(test) {
//     var actor = new Character();
//     actor.money = 100;
//     actor.bank = 200;
    
//     var room = new Room();
//     room.id = 3001;
//     room.addCharacter(actor);
    
//     var actual = actor.depositMoney(50);
//     test.equal(actual.toActor[0].text, "You deposit 50 dollars.");
//     test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME makes a bank transaction.");
//     test.equal(actor.money, 50);
//     test.equal(actor.bank, 250);
//     test.done();    
// };

// ///////////////////////////////////////////////////////////

// exports.character_withdrawMoneyReturnsErrorWhenNotEnoughMoney = function(test) {
//     var actor = new Character();
//     actor.money = 500;
//     actor.bank = 20;
    
//     var actual = actor.withdrawMoney(50);
//     test.equal(actual.toActor[0].text, "You don't have that much money in the bank!");
//     test.equal(actor.money, 500);
//     test.equal(actor.bank, 20);
//     test.done();    
// };

// exports.character_withdrawMoneyDecreasesBankIncreasesMoney = function(test) {
//     var actor = new Character();
//     actor.money = 75;
//     actor.bank = 900;
    
//     var room = new Room();
//     room.id = 3001;
//     room.addCharacter(actor);
    
//     var actual = actor.withdrawMoney(150);
//     test.equal(actual.toActor[0].text, "You withdraw 150 dollars.");
//     test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME makes a bank transaction.");
//     test.equal(actor.money, 225);
//     test.equal(actor.bank, 750);
//     test.done();    
// };




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

// FIXME
// exports.character_lookTargetReturnsObjectDescriptionsWhenWorn = function(test) {
//     var actor = new Character();
//     actor.keywords = [];
    
//     var room = new Room();
//     room.id = 1;

//     room.addCharacter(actor);
    
//     var item = new Item();
//     item.keywords.push("chain");
//     item.shortDescription = "a gold chain";
//     item.longDescription = "It's a chain made of gold.  Duh.";
//     actor.wearing[global.WEAR_NECK_1] = item;
    
//     // Player typed 'look at chain'
//     var result = actor.lookTarget( { tokens: [ "chain" ], allTokens: [ "look", "at", "chain" ] } );
//     test.equal(result.toActor[0].text, "You look at a gold chain.");
//     test.equal(result.toActor[1].text, "It's a chain made of gold.  Duh.");
//     test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks at a gold chain.");
//     test.done();
// };

// exports.character_lookTargetReturnsObjectDescriptionsWhenWorn = function(test) {
//     var actor = new Character();
//     actor.keywords = [];
    
//     var room = new Room();
//     room.id = 1;

//     room.addCharacter(actor);
    
//     var item = new Item();
//     item.keywords.push("chain");
//     item.shortDescription = "a gold chain";
//     item.longDescription = "It's a chain made of gold.  Duh.";
//     actor.inventory.push(item);
    
//     // Player typed 'look at chain'
//     var result = actor.lookTarget( { tokens: [ "chain" ], allTokens: [ "look", "at", "chain" ] } );
//     test.equal(result.toActor[0].text, "You look at FIRST_OBJECT_SHORTDESC.");
//     test.equal(result.toActor[1].text, "It's a chain made of gold.  Duh.");
//     test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks at FIRST_OBJECT_SHORTDESC.");
//     test.done();
// };

// exports.character_lookTargetReturnsObjectDescriptionsWhenInRoom = function(test) {
//     var actor = new Character();
//     actor.keywords = [];
    
//     var room = new Room();
//     room.id = 1;

//     room.addCharacter(actor);
    
//     var item = new Item();
//     item.keywords.push("chain");
//     item.shortDescription = "a gold chain";
//     item.longDescription = "It's a chain made of gold.  Duh.";
//     room.contents.push(item);
    
//     // Player typed 'look at chain'
//     var result = actor.lookTarget( { tokens: [ "chain" ], allTokens: [ "look", "at", "chain" ] } );
//     test.equal(result.toActor[0].text, "You look at FIRST_OBJECT_SHORTDESC.");
//     test.equal(result.toActor[1].text, "It's a chain made of gold.  Duh.");
//     test.equal(result.toRoom[0].textArray[0].text, "ACTOR_NAME looks at FIRST_OBJECT_SHORTDESC.");
//     test.done();
// };
/*
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
    
    test.equal(result.toActor[0].text, "FIRST_OBJECT_SHORTDESC (carried): ");
    test.equal(result.toActor[1].text, "There's nothing inside that!");
    test.equal(result.toRoom[0].text, "ACTOR_NAME looks in FIRST_OBJECT_SHORTDESC.");
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
    
    test.equal(result.toActor[0].text, "FIRST_OBJECT_SHORTDESC (worn): ");
    test.equal(result.toActor[1].text, "There's nothing inside that!");
    test.equal(result.toRoom[0].text, "ACTOR_NAME looks in FIRST_OBJECT_SHORTDESC.");
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
    
    test.equal(result.toActor[0].text, "FIRST_OBJECT_SHORTDESC (here): ");
    test.equal(result.toActor[1].text, "There's nothing inside that!");
    test.equal(result.toRoom[0].text, "ACTOR_NAME looks in FIRST_OBJECT_SHORTDESC.");
    test.done();
};
*/
// FIXME : All these tests
// exports.character_getDescriptionReturnsWearingLight = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a torch";
//     char.wearing[global.WEAR_LIGHT] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <used as light>      a torch");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingRightFinger = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a sapphire ring";
//     char.wearing[global.WEAR_FINGER_R] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on finger>     a sapphire ring");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingLeftFinger = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a ruby ring";
//     char.wearing[global.WEAR_FINGER_L] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on finger>     a ruby ring");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingNeck1 = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a jade pendant";
//     char.wearing[global.WEAR_NECK_1] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn around neck>   a jade pendant");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingNeck2 = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "an emerald pendant";
//     char.wearing[global.WEAR_NECK_2] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn around neck>   an emerald pendant");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingBody = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "leather armor";
//     char.wearing[global.WEAR_BODY] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on body>       leather armor");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingHead = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "the Helm of Ursula";
//     char.wearing[global.WEAR_HEAD] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on head>       the Helm of Ursula");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingLegs = function(test) {
//     var char = new Character();
    
//     var item = new Item();
//     item.shortDescription = "Dragonscale Leggings";
//     char.wearing[global.WEAR_LEGS] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on legs>       Dragonscale Leggings");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingFeet = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "some iron boots";
//     char.wearing[global.WEAR_FEET] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on feet>       some iron boots");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingHands = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "Swordsman's Gloves";
//     char.wearing[global.WEAR_HANDS] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on hands>      Swordsman's Gloves");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingArms = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "the blood of your victims";
//     char.wearing[global.WEAR_ARMS] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn on arms>       the blood of your victims");
//     test.done();
// };

// exports.character_lookAtCharacterReturnsWearingShield = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a wooden plank";
//     char.wearing[global.WEAR_SHIELD] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn as shield>     a wooden plank");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingAboutBody = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "The Cloak of Doom";
//     char.wearing[global.WEAR_ABOUT] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn about body>    The Cloak of Doom");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingWaist = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "The Cloak of Doom";
//     char.wearing[global.WEAR_WAIST] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn about waist>   The Cloak of Doom");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingWristR = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a diamond bracelet";
//     char.wearing[global.WEAR_WRIST_R] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn around wrist>  a diamond bracelet");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingWristL = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a zirconium bracelet";
//     char.wearing[global.WEAR_WRIST_L] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <worn around wrist>  a zirconium bracelet");
//     test.done();
// };

// exports.character_getDescriptionReturnsWearingWield = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "Thor's Hammer";
//     char.wearing[global.WEAR_WIELD] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <wielded>            Thor's Hammer");
//     test.done();
// };

// FIXME
// exports.character_getDescriptionReturnsWearingHold = function(test) {
//     var char = new Character();

//     var item = new Item();
//     item.shortDescription = "a Sapphire Dragonscale";
//     char.wearing[global.WEAR_HOLD] = item;

//     var result = char.getDescription();
//     test.equal(result[0], "  <held>               a Sapphire Dragonscale");
//     test.done();
// };
