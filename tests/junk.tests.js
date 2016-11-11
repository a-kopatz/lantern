var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../items/clothes').clothes;
var World = require('../world');

///////////////////////////////////////////////////////////

exports.character_junkItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var world = new World();
    world.addCharacter(actor);
    
    var actual = actor.junkItem('');
    test.equal(actual.toActor[0].text, "junk what?!?");
    test.done();
};

exports.character_junkItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var world = new World();
    world.addCharacter(actor);
    
    var actual = actor.junkItem('computer');
    test.equal(actual.toActor[0].text, "junk what?!?");
    test.done();
};

exports.character_junkItemDoesNotAddToRoomInventory = function(test) {
    var actor = new Character();
    actor.name = "Joe";

    var world = new World();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var gloves = new Item();
    gloves.keywords.push("gloves");
    gloves.shortDescription = "a pair of gloves";

    world.addCharacter(actor);
    world.addItem(gloves);

    actor.inventory.push(gloves);
    
    var actual = actor.junkItem('gloves');
    test.equal(actual.toActor[0].text, "You junk a pair of gloves.");
    test.equal(actual.toRoom[0].text, "Joe junks a pair of gloves.");
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 0);
    test.equal(world.items.length, 0);
    test.done();
};

exports.character_junkAllDotItemDoesNotAddToRoomContents = function(test) {
    var actor = new Character();
    actor.name = "Joe";

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var world = new World();
    
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
    
    world.addCharacter(actor);
    world.addItem(gloves1);
    world.addItem(gloves2);
    world.addItem(pizza);
    
    var actual = actor.junkItem('all.gloves');
    
    test.equal(actual.toActor[0].text, "You junk a pair of blue gloves and a pair of black gloves.");
    test.equal(actual.toRoom[0].text, "Joe junks a pair of blue gloves and a pair of black gloves.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0], pizza);
    test.equal(room.contents.length, 0);
    test.equal(world.items.length, 1);
    test.done();
};

exports.character_junkAllDoesEverything = function(test) {
    var actor = new Character();
    actor.name = "Joe";
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var world = new World();
    
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
    
    world.addCharacter(actor);
    world.addItem(gloves1);
    world.addItem(gloves2);
    world.addItem(pizza);
    world.addItem(anotherPizza);
    
    var actual = actor.junkItem('all');
    
    test.equal(actual.toActor[0].text, "You junk a pair of blue gloves and a pair of black gloves and 2 cheese pizzas.");
    test.equal(actual.toRoom[0].text, "Joe junks a pair of blue gloves and a pair of black gloves and 2 cheese pizzas.");
    test.equal(actor.inventory.length, 0);
    test.equal(room.contents.length, 0);
    test.equal(world.items.length, 0);
    test.done();
};

