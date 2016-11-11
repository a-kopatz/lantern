var Character = require("../character").character;
var Room = require("../room").room;

///////////////////////////////////////////////////////////

exports.character_sleepWorksWhenStanding = function(test) {
    var actor = new Character();
    actor.position = global.POS_STANDING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You go to sleep.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME lies down and falls asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

exports.character_sleepWorksWhenSitting = function(test) {
    var actor = new Character();
    actor.position = global.POS_SITTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You go to sleep.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME lies down and falls asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

exports.character_sleepWorksWhenResting = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You go to sleep.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME lies down and falls asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};

exports.character_sleepReturnsErrorWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var actual = actor.sleep();
    
    test.equal(actual.toActor[0].text, "You are already sound asleep.");
    test.equal(actor.position, global.POS_SLEEPING);
    test.done();
};