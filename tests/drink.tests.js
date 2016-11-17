var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../items/clothes').clothes;
var Drinkcontainer = require('../items/drinkcontainer').drinkcontainer;
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
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0 ];
    actor.volumeConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new Drinkcontainer();
    wineGlass.id = 1;
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.pluralDescription = "wine glasses";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 4;
    actor.inventory.push(wineGlass);

    myWorld.addItem(wineGlass);

    var actual = actor.drinkItem('wine');

    test.equal(actual.toActor[0].text, "You drink some wine from a wine glass.");
    test.equal(actual.toRoom[0].text, "Jack drinks some wine from a wine glass.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0].quantity, 0);
    test.done();
};

exports.character_drinkItemsDoesNotRemoveItemFromInventory = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new Drinkcontainer();
    wineGlass.id = 1;
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.pluralDescription = "wine glasses";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 4;
    actor.inventory.push(wineGlass);

    var waterJug = new Drinkcontainer();
    waterJug.id = 2;
    waterJug.keywords.push("water");
    waterJug.shortDescription = "a water jug";
    waterJug.pluralDescription = "water jugs";
    waterJug.containsLiquid = 0;
    waterJug.quantity = 10;
    actor.inventory.push(waterJug);

    myWorld.addItem(wineGlass);
    myWorld.addItem(waterJug);

    var actual = actor.drinkItem('all');

    test.equal(actual.toActor[0].text, "You drink some water and some wine from a wine glass and a water jug.");
    test.equal(actual.toRoom[0].text, "Jack drinks some water and some wine from a wine glass and a water jug.");
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0].quantity, 0);
    test.equal(actor.inventory[1].quantity, 0);
    test.equal(actor.caloriesConsumed[0], 96);
    test.equal(actor.volumeConsumed[0], 14);
    test.done();
};

exports.character_drinkItemTellsActorWhenEmpty = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new Drinkcontainer();
    wineGlass.id = 1;
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 0;
    actor.inventory.push(wineGlass);
    myWorld.addItem(wineGlass);

    var actual = actor.drinkItem('wine');

    test.equal(actual.toActor[0].text, "a wine glass -- it's empty!");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.inventory[0].quantity, 0);
    test.equal(actor.caloriesConsumed[0], 0);
    test.equal(actor.volumeConsumed[0], 0);
    test.done();
};

exports.character_drinkItemsTellsActorWhenEmpty = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new Drinkcontainer();
    wineGlass.id = 1;
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 0;
    actor.inventory.push(wineGlass);

    var waterJug = new Drinkcontainer();
    waterJug.id = 2;
    waterJug.keywords.push("water");
    waterJug.shortDescription = "a water jug";
    waterJug.containsLiquid = 0;
    waterJug.quantity = 0;
    actor.inventory.push(waterJug);

    myWorld.addItem(wineGlass);
    myWorld.addItem(waterJug);

    var actual = actor.drinkItem('all');

    test.equal(actual.toActor[0].text, "a wine glass -- it's empty!");
    test.equal(actual.toActor[1].text, "a water jug -- it's empty!");
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0].quantity, 0);
    test.equal(actor.inventory[1].quantity, 0);
    test.equal(actor.caloriesConsumed[0], 0);
    test.equal(actor.volumeConsumed[0], 0);
    test.done();
};

exports.character_drinkItemsLooksPretty = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    for(var i = 0; i < 5; i++) {
        var wineGlass = new Drinkcontainer();
        wineGlass.id = 1;
        wineGlass.keywords.push("wine");
        wineGlass.shortDescription = "a wine glass";
        wineGlass.pluralDescription = "wine glasses";
        wineGlass.containsLiquid = 2;
        wineGlass.quantity = 4;
        actor.inventory.push(wineGlass);
    }

    var actual = actor.drinkItem('all');

    test.equal(actual.toActor[0].text, "You drink some wine from 5 wine glasses.");
    test.equal(actor.inventory.length, 5);
    
    for(var i = 0; i < 5; i++) {
        test.equal(actor.inventory[i].quantity, 0);
    }
    
    test.done();
};


// TODO: Test same beverage from different types of containers... a wine glass and a wine bottle

exports.character_drinkSameBeverageFromDifferentContainersLooksRight = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new Drinkcontainer();
    wineGlass.id = 1;
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.containsLiquid = 2;
    wineGlass.quantity = 5;
    actor.inventory.push(wineGlass);

    var waterJug = new Drinkcontainer();
    waterJug.id = 2;
    waterJug.keywords.push("water");
    waterJug.shortDescription = "a water jug";
    waterJug.containsLiquid = 2;
    waterJug.quantity = 10;
    actor.inventory.push(waterJug);

    myWorld.addItem(wineGlass);
    myWorld.addItem(waterJug);

    var actual = actor.drinkItem('all');

    test.equal(actual.toActor[0].text, "You drink some wine from a wine glass and a water jug.");
    test.equal(actual.toRoom[0].text, "Jack drinks some wine from a wine glass and a water jug.");
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0].quantity, 0);
    test.equal(actor.inventory[1].quantity, 0);
    test.done();
};

exports.character_drinkDifferentBeverageFromSameContainersLooksRight = function(test) {
    var actor = new Character();
    actor.name = "Jack";
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass1 = new Drinkcontainer();
    wineGlass1.id = 1;
    wineGlass1.keywords.push("wine");
    wineGlass1.shortDescription = "a wine glass";
    wineGlass1.pluralDescription = "wine glasses";
    wineGlass1.containsLiquid = 2;
    wineGlass1.quantity = 5;
    actor.inventory.push(wineGlass1);

    var wineGlass2 = new Drinkcontainer();
    wineGlass2.id = 1;
    wineGlass2.keywords.push("wine");
    wineGlass2.shortDescription = "a wine glass";
    wineGlass2.pluralDescription = "wine glasses";
    wineGlass2.containsLiquid = 0;
    wineGlass2.quantity = 5;
    actor.inventory.push(wineGlass2);

    var actual = actor.drinkItem('all');

    test.equal(actual.toActor[0].text, "You drink some water and some wine from 2 wine glasses.");
    test.equal(actual.toRoom[0].text, "Jack drinks some water and some wine from 2 wine glasses.");
    test.equal(actor.inventory.length, 2);
    test.equal(actor.inventory[0].quantity, 0);
    test.equal(actor.inventory[1].quantity, 0);
    test.done();
};

