var Character = require("../character").character;
var Room = require("../room").room;
var Item = require('../item').item;

exports.character_lookTargetReturnsErrorWhenNothingFound = function(test) {
    var actor = new Character();
    actor.keywords = [];
    
    var room = new Room();
    room.id = 1;

    room.addCharacter(actor);
    
    // Player typed 'look at monkey'
    var result = actor.lookTarget("monkey");
    test.equal(result.toActor[0].text, "You do not see that here.");
    test.done();
};

// exports.character_lookTargetReturnsSelf = function(test) {
//     var actor = new Character();
//     actor.name = 'Jo';
//     actor.keywords = [ 'jo' ];
    
//     var room = new Room();
//     room.id = 1;

//     room.addCharacter(actor);
    
//     // Player typed 'look at jo'
//     var result = actor.lookTarget("jo");
//     // test.equal(result.toActor[0].text, "You do not see that here.");
    
//     console.log(result);
    
//     test.done();
// };

// exports.character_lookAtItemReturnsNothingSpecial = function(test) {
//     var actor = new Character();
//     actor.keywords = [];
    
//     var room = new Room();
//     room.id = 1;

//     room.addCharacter(actor);

//     var item = new Item();
//     item.keywords.push("blob");
//     item.shortDescription = "a blob of crap";
//     room.contents.push(item);
    
//     // var result = actor.lookTarget( { tokens: [ "blob");
    
//     // test.equal(result.toActor[0].text, "FIRST_OBJECT_SHORTDESC (here): ");
//     // test.equal(result.toActor[1].text, "There's nothing inside that!");
//     // test.equal(result.toRoom[0].text, "ACTOR_NAME looks in FIRST_OBJECT_SHORTDESC.");
//     // test.done();

//     // // Player typed 'look at monkey'
//     // var result = actor.lookTarget( { tokens: [ "monkey" ], allTokens: [ "look", "at", "monkey" ] } );
//     // test.equal(result.toActor[0].text, "You do not see that here.");
//     test.done();
// };


