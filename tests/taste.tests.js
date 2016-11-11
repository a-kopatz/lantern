var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;
var World = require('../world');

///////////////////////////////////////////////////////////

exports.character_tasteItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var actual = actor.tasteItem('');
    test.equal(actual.toActor[0].text, "Taste what?!?");
    test.done();
};

exports.character_tasteItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var actual = actor.tasteItem('computer');
    test.equal(actual.toActor[0].text, "Taste what?!?");
    test.done();
};

exports.character_tasteItemReturnsErrorWhenItemIsNotFood = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var socks = new Item();
    socks.keywords.push("socks");
    socks.shortDescription = "a pair of socks";
    socks.type = global.ITEM_TRASH;
    actor.inventory.push(socks);

    var actual = actor.tasteItem('socks');
    test.equal(actual.toActor[0].text, "a pair of socks -- You can't taste THAT!");
    test.equal(actor.inventory[0], socks);
    test.done();
};

exports.character_tasteItemDoesNotRemoveItemFromInventory = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var donut = new Item();
    donut.keywords.push("donut");
    donut.shortDescription = "a cream-filled donut";
    donut.type = global.ITEM_FOOD;
    actor.inventory.push(donut);

    myWorld.addItem(donut);

    var actual = actor.tasteItem('donut');

    test.equal(actual.toActor[0].text, "You taste FIRST_OBJECT_SHORTDESC.  It is delicious!!!");
    test.equal(actual.toActor[0].items[0], donut);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME tastes FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].items[0], donut);
    test.equal(actor.inventory.length, 1);
    test.done();
};