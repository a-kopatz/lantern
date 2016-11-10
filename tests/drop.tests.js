var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../items/clothes').clothes;
var World = require('../world');

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
    actor.name = "Joe";
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves = new Item();
    gloves.keywords.push("gloves");
    gloves.shortDescription = "a pair of gloves";

    actor.inventory.push(gloves);
    
    var actual = actor.dropItem('gloves');
    test.equal(actual.toActor[0].text, "You drop a pair of gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "Joe drops a pair of gloves.");
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 1);
    test.equal(room.contents[0], gloves);
    test.done();
};

exports.character_dropAllDotItemAddsToRoomContents = function(test) {
    var actor = new Character();
    actor.name = "Joe";

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves1 = new Item();
    gloves1.id = 1;
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.pluralDescription = "a pair of blue gloves";
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.id = 2;
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.pluralDescription = "a pair of black gloves";
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    actor.inventory.push(pizza);
    
    var actual = actor.dropItem('all.gloves');
    
    test.equal(actual.toActor[0].text, "You drop a pair of blue gloves and a pair of black gloves.");
    test.equal(actual.toRoom[0].textArray[0].text, "Joe drops a pair of blue gloves and a pair of black gloves.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0], pizza);
    test.equal(room.contents.length, 2);
    test.equal(room.contents[0], gloves1);
    test.equal(room.contents[1], gloves2);
    test.done();
};

exports.character_dropAllDropsEverythingToRoom = function(test) {
    var actor = new Character();
    actor.name = "Joe";
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves1 = new Item();
    gloves1.id = 1;
    gloves1.keywords.push("gloves");
    gloves1.shortDescription = "a pair of blue gloves";
    gloves1.pluralDescription = "a pair of blue gloves";
    actor.inventory.push(gloves1);
    
    var gloves2 = new Item();
    gloves2.id = 2;
    gloves2.keywords.push("gloves");
    gloves2.shortDescription = "a pair of black gloves";
    gloves2.pluralDescription = "a pair of black gloves";
    actor.inventory.push(gloves2);
    
    var pizza = new Item();
    pizza.id = 3;
    pizza.keywords.push("pizza");
    pizza.shortDescription = "a cheese pizza";
    pizza.pluralDescription = "cheese pizzas";
    actor.inventory.push(pizza);
    
    var anotherPizza = new Item();
    anotherPizza.id = 3;
    anotherPizza.keywords.push("pizza");
    anotherPizza.shortDescription = "a cheese pizza";
    anotherPizza.pluralDescription = "cheese pizzas";
    actor.inventory.push(anotherPizza);
    
    
    var actual = actor.dropItem('all');
    
    test.equal(actual.toActor[0].text, "You drop a pair of blue gloves and a pair of black gloves and 2 cheese pizzas.");
    test.equal(actual.toRoom[0].textArray[0].text, "Joe drops a pair of blue gloves and a pair of black gloves and 2 cheese pizzas.");
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 4);
    test.equal(room.contents[0], gloves1);
    test.equal(room.contents[1], gloves2);
    test.equal(room.contents[2], pizza);
    test.done();
};
