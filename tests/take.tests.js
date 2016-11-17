var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;

///////////////////////////////////////////////////////////

exports.character_takeItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.takeItem('');
    test.equal(actual.toActor[0].text, 'Take what?');
    test.done();
};

exports.character_takeItemReturnsErrorWhenAllDotNotFound = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.takeItem('all.bread');
    test.equal(actual.toActor[0].text, "Take what?");
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
    atm.id = 8;
    atm.keywords.push("atm");
    atm.shortDescription = "an ATM machine";
    atm.canBeTaken = false;
    room.addItem(atm);

    var actual = actor.takeItem('atm');

    test.equal(actual.toActor[0].text, "an ATM machine -- You can't take THAT!");
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 1);
    test.done();
};

exports.character_takeItemTakesItemFromRoom = function(test) {
    var actor = new Character();
    actor.name = 'Po';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves1 = new Item();
    gloves1.id = 1;
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    room.addItem(gloves1);
    
    var gloves2 = new Item();
    gloves2.id = 2;
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    room.addItem(gloves2);
    
    var atm = new Item();
    atm.id = 9999;
    atm.keywords.push("atm");
    atm.shortDescription = "an ATM machine";
    atm.canBeTaken = false;
    room.addItem(atm);
    
    var actual = actor.takeItem('all.gloves');

    test.equal(actual.toActor[0].text, "You take a pair of blue gloves and a pair of black gloves.");
    test.equal(actual.toRoom[0].text, "Po takes a pair of blue gloves and a pair of black gloves.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0], gloves1);
    test.equal(actor.inventory[1], gloves2);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], atm);
    test.done();
};

exports.character_takeItemTakesAllFromRoom = function(test) {
    var actor = new Character();
    actor.name = 'Jim';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves = new Item();
    gloves.id = 1;
    gloves.keywords.push("gloves");
    gloves.shortDescription = "a pair of gloves";
    gloves.canBeTaken = true;
    room.addItem(gloves);
    
    var scarf = new Item();
    scarf.id = 2;
    scarf.keywords.push("scarf");
    scarf.shortDescription = "a plaid scarf";
    scarf.canBeTaken = true;
    room.addItem(scarf);
    
    var atm = new Item();
    atm.id = 3;
    atm.keywords.push("atm");
    atm.shortDescription = "an ATM machine";
    atm.canBeTaken = false;
    room.addItem(atm);
    
    var shirt = new Item();
    shirt.id = 4;
    shirt.keywords.push("shirt");
    shirt.shortDescription = "an ugly shirt";
    shirt.canBeTaken = true;
    room.addItem(shirt);
    
    var actual = actor.takeItem('all');
    
    test.equal(actual.toActor[0].text, "You take a pair of gloves and a plaid scarf and an ugly shirt.");
    test.equal(actual.toRoom[0].text, "Jim takes a pair of gloves and a plaid scarf and an ugly shirt.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toActor[1].text, "an ATM machine -- You can't take THAT!");
    test.equal(actor.inventory.length, 3);
    test.equal(actor.inventory[0], gloves);
    test.equal(actor.inventory[1], scarf);
    test.equal(actor.inventory[2], shirt);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], atm);
    test.done();
};

exports.character_takeAllFromRoomStopsWhenArmsAreFull = function(test) {
    var actor = new Character();
    actor.name = 'Jim';
    actor.inventory = [];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    for(var i = 0; i < 51; i++) {
        var gloves = new Item();
        gloves.id = 1;
        gloves.keywords.push("gloves");
        gloves.shortDescription = "a pair of gloves";
        gloves.pluralDescription = "pair of gloves";
        gloves.canBeTaken = true;
        room.addItem(gloves);
    }

    var actual = actor.takeItem('all');
    
    test.equal(actual.toActor[0].text, "You take 50 pair of gloves.");
    test.equal(actual.toActor[1].text, "a pair of gloves -- You can't hold any more items!");
    test.equal(actual.toRoom[0].text, "Jim takes 50 pair of gloves.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actor.inventory.length, 50);
    test.equal(room.contents.length, 1);
    test.done();
};





