var Character = require("../character").character;
var Room = require("../room").room;

///////////////////////////////////////////////////////////

exports.character_sitWorksWhenStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You sit down.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME sits down.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

exports.character_sitReturnsErrorWhenAlreadySitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You're sitting already.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

exports.character_sitWorksWhenResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You stop resting, and sit up.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME stops resting.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};

exports.character_sitReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.sit();
    
    test.equal(actual.toActor[0].text, "You have to wake up first.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};