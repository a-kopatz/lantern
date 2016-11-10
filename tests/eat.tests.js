var Character = require("../character").character;
var Room = require("../room").room;
var Food = require('../items/food').food;
var World = require('../world');

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
    actor.caloriesConsumed = [ 0 ];
    
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
    test.equal(actual.toActor[0].text, "You eat a vanilla donut and a chocolate donut.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_eatTenItemsEatsAll = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    
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
    test.equal(actual.toActor[0].text, "You eat 10 vanilla donuts.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_eatFiveItemsEatsTheRightNumber = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    
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
    test.equal(actual.toActor[0].text, "You eat 5 vanilla donuts.");
    test.equal(actor.inventory.length, 5);
    test.done();
};
