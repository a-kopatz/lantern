var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;

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
    test.equal(actual.toRoom[0].text, "ACTOR_NAME gives FIRST_OBJECT_SHORTDESC to TARGET_NAME.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].items[0], gloves1);
    test.equal(actual.toRoom[1].text, "ACTOR_NAME gives FIRST_OBJECT_SHORTDESC to TARGET_NAME.");
    test.equal(actual.toRoom[1].roomId, 3001);
    test.equal(actual.toRoom[1].items[0], gloves2);
    test.equal(actor.inventory.length, 1);
    test.equal(target.inventory.length, 2);
    test.equal(target.inventory[0], gloves1);
    test.equal(target.inventory[1], gloves2);
    test.equal(actor.inventory[0], pizza);
    test.done();
};