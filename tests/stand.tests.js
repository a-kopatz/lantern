var Character = require("../character").character;
var Room = require("../room").room;

/////////////////////////////////////////////////

exports.character_standReturnsErrorWhenAlreadyStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var actual = actor.stand();

    test.equal(actual.toActor[0].text, "You are already standing.");
    test.equal(actor.position, global.POS_STANDING);
    test.done();
};

exports.character_standWorksWhenSitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.stand();

    test.equal(actual.toActor[0].text, "You stand up.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME clambers to ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(actor.position, global.POS_STANDING);
    test.done();
};

exports.character_standWorksWhenResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.stand();
    
    test.equal(actual.toActor[0].text, "You stop resting, and stand up.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME stops resting, and clambers on ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(actor.position, global.POS_STANDING);
    test.done();
};

exports.character_standReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.stand();
    
    test.equal(actual.toActor[0].text, "You have to wake up first!");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};
