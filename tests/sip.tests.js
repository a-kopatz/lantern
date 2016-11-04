var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../items/clothes').clothes;
var World = require('../world');

/////////////////////////////////////////////////

exports.character_sipItemReturnsErrorWhenNoKeyword = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var actual = actor.sipItem('');
    test.equal(actual.toActor[0].text, "Sip what?!?");
    test.done();
};

exports.character_sipItemReturnsErrorWhenItemNotFound = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sipItem('computer');
    test.equal(actual.toActor[0].text, "Sip what?!?");
    test.done();
};

exports.character_sipItemReturnsErrorWhenItemIsNotDrinkContainer = function(test) {
    var actor = new Character();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var socks = new Item();
    socks.keywords.push("socks");
    socks.shortDescription = "a pair of socks";
    socks.type = global.ITEM_TRASH;
    actor.inventory.push(socks);

    var actual = actor.sipItem('socks');
    test.equal(actual.toActor[0].text, "a pair of socks -- You can't sip THAT!");
    test.equal(actor.inventory[0], socks);
    test.done();
};

exports.character_sipItemDoesNotRemoveItemFromInventory = function(test) {
    var actor = new Character();
    actor.caloriesConsumed = [ 0 ];
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var myWorld = new World();
    myWorld.addCharacter(actor);
    
    var wineGlass = new Item();
    wineGlass.keywords.push("wine");
    wineGlass.shortDescription = "a wine glass";
    wineGlass.type = global.ITEM_DRINKCONTAINER;
    wineGlass.containsLiquid = 2;
    actor.inventory.push(wineGlass);

    myWorld.addItem(wineGlass);

    var actual = actor.sipItem('wine');

    test.equal(actual.toActor[0].text, "You sip the wine.");
    test.equal(actual.toActor[0].items[0], wineGlass);
    test.equal(actual.toRoom[0].textArray[0].text, "ACTOR_NAME sips wine from FIRST_OBJECT_SHORTDESC.");
    test.equal(actual.toRoom[0].textArray[0].items[0], wineGlass);
    test.equal(actor.inventory.length, 1);
    test.done();
};

