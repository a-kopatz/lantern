var Character = require("../character").character;
var Room = require("../room").room;

///////////////////////////////////////////////////////////

exports.character_restWorksWhenStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You sit down and rest your tired bones.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME sits down and rests.");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_restWorksWhenSitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You rest your tired bones.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME rests.");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_restReturnsErrorWhenAlreadyResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You are resting already.");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_restReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.rest();
    
    test.equal(actual.toActor[0].text, "You have to wake up first.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};