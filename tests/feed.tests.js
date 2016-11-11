var Character = require("../character").character;
var Room = require("../room").room;
var Food = require('../items/food').food;
var World = require('../world');

exports.character_feedItemsReturnsErrorWhenNaN = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var actual = actor.feedItems('H', 'donut', 'kevin');
    test.equal(actual.toActor[0].text, 'Feed how many of what to who?!?');
    test.done();
};

exports.characterfeedItemsReturnsErrorWhenNotFound = function(test) {
    var actor = new Character();
    actor.name = 'Tina';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var actual = actor.feedItems('2', 'donut', 'kevin');
    test.equal(actual.toActor[0].text, 'Feed what to who?!?');
    test.done();
};

exports.character_eatItemsReturnsErrorWhenNotEnoughFound = function(test) {
    var actor = new Character();
    actor.name = 'Tina';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var donut = new Food();
    donut.keywords.push("donut");
    actor.inventory.push(donut);

    myWorld.addItem(donut);

    var actual = actor.eatItems('2', 'donut', 'kevin');
    test.equal(actual.toActor[0].text, "You don't have 2 of 'donut'.");
    test.equal(actor.inventory.length, 1);
    test.done();
};

exports.character_eatItemsReturnsErrorWhenTargetNotFound = function(test) {
    var actor = new Character();
    actor.name = 'Tina';
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    for(var i = 0; i < 3; i++) {
        var donut = new Food();
        donut.keywords.push("donut");
        actor.inventory.push(donut);

        myWorld.addItem(donut);
    }

    var actual = actor.feedItems('2', 'donut', 'kevin');
    test.equal(actual.toActor[0].text, "No-one by that name here.");
    test.equal(actor.inventory.length, 3);
    test.done();
};

exports.character_feedTwoItemsFeedsBoth = function(test) {
    var actor = new Character();
    actor.name = 'Tina';

    var target = new Character();
    target.name = 'Tobey';
    target.caloriesConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    myWorld.addCharacter(target);
    
    for(var i = 0; i < 2; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.pluralDescription = "donuts";
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }

    var actual = actor.feedItems('2', 'donut', 'tobey');
    test.equal(actual.toActor[0].text, "You feed 2 donuts to Tobey.");
    test.equal(actual.toTarget[0].text, "Tina feeds you 2 donuts.");
    test.equal(actual.toRoom[0].text, "Tina feeds 2 donuts to Tobey.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_feedTwoItemsEatsBoth = function(test) {
    var actor = new Character();
    actor.name = 'Tina';

    var target = new Character();
    target.name = 'Tobey';
    target.caloriesConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    myWorld.addCharacter(target);
    
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

    var actual = actor.feedItems('2', 'donut', 'tobey');
    test.equal(actual.toActor[0].text, "You feed a vanilla donut and a chocolate donut to Tobey.");
    test.equal(actual.toTarget[0].text, "Tina feeds you a vanilla donut and a chocolate donut.");
    test.equal(actual.toRoom[0].text, "Tina feeds a vanilla donut and a chocolate donut to Tobey.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_feedTenItemsEatsAll = function(test) {
    var actor = new Character();
    actor.name = 'Tina';

    var target = new Character();
    target.name = 'Tobey';
    target.caloriesConsumed = [ 0 ];
        
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    myWorld.addCharacter(target);

    for(var i = 0; i < 10; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var actual = actor.feedItems('10', 'donut', 'tobey');
    test.equal(actual.toActor[0].text, "You feed 10 vanilla donuts to Tobey.");
    test.equal(actual.toTarget[0].text, "Tina feeds you 10 vanilla donuts.");
    test.equal(actual.toRoom[0].text, "Tina feeds 10 vanilla donuts to Tobey.");
    test.equal(actor.inventory.length, 0);
    test.done();
};

exports.character_feedFiveItemsEatsTheRightNumber = function(test) {
    var actor = new Character();
    actor.name = 'Tina';

    var target = new Character();
    target.name = 'Tobey';
    target.caloriesConsumed = [ 0 ];
        
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);

    var myWorld = new World();
    myWorld.addCharacter(actor);
    myWorld.addCharacter(target);
    
    for(var i = 0; i < 10; i++) {
        var donut = new Food();
        donut.id = 1;
        donut.keywords.push("donut");
        donut.shortDescription = "a vanilla donut";
        donut.pluralDescription = "vanilla donuts";
        actor.inventory.push(donut);
        myWorld.addItem(donut);
    }
    
    var actual = actor.feedItems('5', 'donut', 'tobey');
    test.equal(actual.toActor[0].text, "You feed 5 vanilla donuts to Tobey.");
    test.equal(actual.toTarget[0].text, "Tina feeds you 5 vanilla donuts.");
    test.equal(actual.toRoom[0].text, "Tina feeds 5 vanilla donuts to Tobey.");
    test.equal(actor.inventory.length, 5);
    test.done();
};
