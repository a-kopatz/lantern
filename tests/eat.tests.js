var Character = require("../character").character;
var Room = require("../room").room;
var Food = require('../items/food').food;
var World = require('../world');
var Shirt = require("../items/shirt").shirt;
var Furniture = require("../items/furniture").furniture;

exports.character_eatItemsReturnsErrorWhenNaN = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var actual = actor.eatItems('H', 'donut');
    test.equal(actual.toActor[0].text, "Eat how many of what?!?");
    test.done();
};

exports.character_eatItemsReturnsErrorWhenNotFound = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var actual = actor.eatItems('2', 'donut');
    test.equal(actual.toActor[0].text, "Eat what?!?");
    test.done();
};

exports.character_eatItemsReturnsErrorWhenNotEnoughFound = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var donut = new Food();
    donut.keywords.push("donut");
    actor.inventory.push(donut);

    myWorld.addItem(donut);

    var actual = actor.eatItems('2', 'donut');
    test.equal(actual.toActor[0].text, "You don't have 2 of 'donut'.");
    test.equal(actor.inventory.length, 1);
    test.done();
};

exports.character_eatTwoItemsEatsBoth = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var donut1 = new Food();
    donut1.id = 1;
    donut1.keywords.push("donut");
    donut1.pluralDescription = "donuts";
    actor.inventory.push(donut1);
    myWorld.addItem(donut1);
    
    var donut2 = new Food();
    donut2.id = 1;
    donut2.keywords.push("donut");
    actor.inventory.push(donut2);
    myWorld.addItem(donut2);

    var actual = actor.eatItems('2', 'donut');
    test.equal(actual.toActor[0].text, "You eat 2 donuts.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_eatTwoItemsEatsBoth = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var donut1 = new Food();
    donut1.id = 1;
    donut1.keywords.push("donut");
    donut1.shortDescription = "a vanilla donut";
    donut1.pluralDescription = "vanilla donuts";
    actor.inventory.push(donut1);
    myWorld.addItem(donut1);
    
    var donut2 = new Food();
    donut2.id = 2;
    donut2.keywords.push("donut");
    donut2.shortDescription = "a chocolate donut";
    donut2.pluralDescription = "chocolate donuts";
    actor.inventory.push(donut2);
    myWorld.addItem(donut2);

    var actual = actor.eatItems('2', 'donut');
    test.equal(actual.toActor[0].text.slice(-38), "a vanilla donut and a chocolate donut.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_eatTenItemsEatsAll = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    for(var i = 0; i < 10; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var actual = actor.eatItems('10', 'donut');
    test.equal(actual.toActor[0].text.slice(-18), "10 vanilla donuts.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_eatFiveItemsEatsTheRightNumber = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    for(var i = 0; i < 10; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var actual = actor.eatItems('5', 'donut');
    test.equal(actual.toActor[0].text.slice(-17), "5 vanilla donuts.");
    test.equal(actor.inventory.length, 5);
    test.done();
};

exports.character_eatStopsWhenPlayerIsFull = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];
    actor.maximumFullness = 50;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    for(var i = 0; i < 10; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        donut.calories = 200;
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var actual = actor.eatItems('9', 'donut');
    
    test.equal(actual.toActor[1].text, "Your stomach can't hold any more!!!");
    test.equal(actor.inventory.length, 8);
    test.done();
};

exports.character_eatAllEatsFoodOnly = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 0, 0, 0 ];
    actor.name = "Melanie";
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var shirt = new Shirt();
    shirt.id = 99;
    shirt.keywords.push("shirt");
    shirt.shortDescription = "a shirt";
    shirt.pluralDescription = "shirts";
    actor.inventory.push(shirt);
    myWorld.addItem(shirt);
        
    for(var i = 0; i < 3; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        donut.calories = 10;
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var chair = new Furniture();
    chair.id = 2;
    chair.keywords.push("chair");
    chair.shortDescription = "a chair";
    chair.pluralDescription = "chairs";
    actor.inventory.push(chair);
    myWorld.addItem(chair);
    
    var actual = actor.eatItem('all');

    test.equal(actual.toActor[0].text.slice(-18), " 3 vanilla donuts.");
    test.equal(actual.toRoom[0].text.slice(-18), " 3 vanilla donuts.");
    test.equal(actual.toActor[1].text, "a shirt -- You can't eat that!");
    test.equal(actual.toActor[2].text, "a chair -- You can't eat that!");

    test.equal(actor.caloriesConsumed[0], 30);
    test.equal(actor.caloriesConsumed.length, 3);
    test.equal(actor.inventory.length, 2);
    test.done();
};

exports.character_eatStopsWhenPlayerIsFullOfLiquid = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0, 0, 0 ];
    actor.volumeConsumed = [ 50, 0, 0 ];
    actor.maximumFullness = 50;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    for(var i = 0; i < 10; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        donut.calories = 100;
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var actual = actor.eatItems('9', 'donut');
    
    test.equal(actual.toActor[1].text, "Your stomach can't hold any more!!!");
    test.equal(actor.inventory.length, 8);
    test.done();
};
