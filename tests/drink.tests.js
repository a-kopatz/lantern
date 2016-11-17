var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../items/clothes').clothes;
var DrinkContainer = require('../items/drinkcontainer').drinkContainer;
var World = require('../world');

/////////////////////////////////////////////////

exports.character_drinkItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var actual = actor.drinkItem('');
    test.equal(actual.toActor[0].text, "Drink what?!?");
    test.done();
};

exports.character_drinkItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.drinkItem('computer');
    test.equal(actual.toActor[0].text, "Drink what?!?");
    test.done();
};

exports.character_drinkItemReturnsErrorWhenItemIsNotDrinkContainer = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0];
    actor.volumeConsumed = [ 0, 0, 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var socks = new Item();
    socks.keywords.push("socks");
    socks.shortDescription = "a pair of socks";
    socks.type = global.ITEM_TRASH;
    actor.inventory.push(socks);

    var actual = actor.drinkItem('socks');
    test.equal(actual.toActor[0].text, "a pair of socks -- You can't drink from that!");
    test.equal(actor.inventory[0], socks);
    test.done();
};

exports.character_drinkItemDoesNotRemoveItemFromInventory = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    actor.volumeConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new DrinkContainer();
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 4;
    actor.inventory.push(wineGlass);

    myWorld.addItem(wineGlass);

    var actual = actor.drinkItem('wine');

    test.equal(actual.toActor[0].text, "You drink some wine.");
    test.equal(actual.toRoom[0].text, "ACTOR_NAME drinks some wine.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0].quantity, 0);
    test.done();
};

exports.character_drinkItemDoesNotRemoveItemFromInventory = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0 ];
    actor.volumeConsumed = [ 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new DrinkContainer();
    wineGlass.id = 1;
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 4;
    actor.inventory.push(wineGlass);

    var waterJug = new DrinkContainer();
    waterJug.id = 2;
    waterJug.keywords.push("water");
    waterJug.shortDescription = "a water jug";
    waterJug.containsLiquid = 0;
    waterJug.quantity = 10;
    actor.inventory.push(waterJug);

    myWorld.addItem(wineGlass);
    myWorld.addItem(waterJug);

    var actual = actor.drinkItem('all');

    test.equal(actual.toActor[0].text, "You drink some water and some wine.");
    test.equal(actual.toRoom[0].text, "Jack drinks some water and some wine.");
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0].quantity, 0);
    test.equal(actor.inventory[1].quantity, 0);
    test.equal(actor.caloriesConsumed[0], 96);
    test.equal(actor.volumeConsumed[0], 14);
    test.done();
};
