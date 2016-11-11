var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;

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
    test.equal(actual.toRoom[0].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].items[0], gloves1);
    test.equal(actual.toRoom[1].text, "ACTOR_NAME takes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[1].items[0], gloves2);
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0], gloves1);
    test.equal(actor.inventory[1], gloves2);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], atm);
    test.done();
};
