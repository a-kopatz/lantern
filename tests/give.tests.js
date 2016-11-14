var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;

///////////////////////////////////////////////////////////

exports.character_giveItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    actor.name = 'Mac';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.giveItem('glue', 'jo');
    test.equal(actual.toActor[0].text, 'Give what to who?!?');
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
    test.equal(actual.toActor[0].text, "Give something to yourself?  That's silly.");
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
    gloves1.id = 1;
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.id = 2;
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.id = 3;
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    pizza.canBeTaken = false;
    actor.inventory.push(pizza);
    
    var actual = actor.giveItem('all.gloves', 'nick');
    
    test.equal(actual.toActor[0].text, "You give a pair of blue gloves and a pair of black gloves to Nick.");
    test.equal(actual.toTarget[0].text, "Mac gives you a pair of blue gloves and a pair of black gloves.");
    test.equal(actual.toRoom[0].text, "Mac gives a pair of blue gloves and a pair of black gloves to Nick.");
    test.equal(actor.inventory.length, 1);
    test.equal(target.inventory.length, 2);
    test.equal(target.inventory[0], gloves1);
    test.equal(target.inventory[1], gloves2);
    test.equal(actor.inventory[0], pizza);
    test.done();
};

exports.character_giveItemGivesAllItems = function(test) {
    var actor = new Character();
    actor.name = 'Mac';
    
    var target = new Character();
    target.name = 'Nick';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);
    
    var gloves1 = new Item();
    gloves1.id = 1;
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.canBeTaken = true;
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.id = 2;
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.canBeTaken = true;
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.id = 3;
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    pizza.canBeTaken = false;
    actor.inventory.push(pizza);
    
    var actual = actor.giveItem('all', 'nick');
    
    test.equal(actual.toActor[0].text, "You give a pair of blue gloves and a pair of black gloves and a cheese pizza to Nick.");
    test.equal(actual.toTarget[0].text, "Mac gives you a pair of blue gloves and a pair of black gloves and a cheese pizza.");
    test.equal(actual.toRoom[0].text, "Mac gives a pair of blue gloves and a pair of black gloves and a cheese pizza to Nick.");
    test.equal(actor.inventory.length, 0);
    test.equal(target.inventory.length, 3);
    test.equal(target.inventory[0], gloves1);
    test.equal(target.inventory[1], gloves2);
    test.equal(target.inventory[2], pizza);
    test.done();
};