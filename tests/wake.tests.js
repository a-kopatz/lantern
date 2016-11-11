var Character = require("../character").character;
var Room = require("../room").room;

///////////////////////////////////////////////////////////

exports.character_wakeReturnsErrorWhenNotSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_RESTING;
    
    var actual = actor.wake();
    
    test.equal(actual.toActor[0].text, "You are already awake...");
    test.equal(actor.position, global.POS_RESTING);
    test.done();
};

exports.character_wakeReturnsErrorWhenDead = function(test) {
    var actor = new Character();
    actor.position = global.POS_DEAD;
    
    var actual = actor.wake();
    
    test.equal(actual.toActor[0].text, "You can't wake up! You're in pretty bad shape!");
    test.equal(actor.position, global.POS_DEAD);
    test.done();
};

exports.character_wakeWorksWhenSleeping = function(test) {
    var actor = new Character();
    actor.position = global.POS_SLEEPING;
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    
    var actual = actor.wake();
    
    test.equal(actual.toActor[0].text, "You awaken, and sit up.");
    test.equal(actual.toRoom[0].roomId, 3001);
    test.equal(actual.toRoom[0].text, "ACTOR_NAME awakens and sits up.");
    test.equal(actor.position, global.POS_SITTING);
    test.done();
};