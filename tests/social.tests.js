var constants = require('../constants');
var social = require("../social");
var Character = require("../character").character;
var Room = require("../room").room;

function getSocialActor() {
    var actor = new Character();
    actor.name = "Brandeis";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    return actor;
}

function getSocialTarget() {
    var actor = new Character();
    actor.name = "Viridian";
    actor.gender = global.GENDER_MALE;
    actor.position = global.POS_STANDING;
    
    return actor;
}

exports.social_accuseWorksAsExpectedWhenNoTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = getSocialActor();
    
    var room = new Room();
    room.addCharacter(actor);
    
    var thisSocial = new social(socialDefinition, '', actor);
    
    var output = thisSocial.getOutput();
    test.equal(output.toActor[0].text, "Accuse who??");
    test.equal(output.toTarget.length, 0);
    test.equal(output.toRoom.length, 0);
    test.equal(output.toWorld.length, 0);
    test.done();
};

exports.social_accuseWorksAsExpectedWhenTarget = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = getSocialActor();
    var target = getSocialTarget();

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);
    room.addCharacter(target);

    var thisSocial = new social(socialDefinition, target.name, actor);
    
    var output = thisSocial.getOutput();
    test.equal(output.toActor[0].text, "You look accusingly at TARGET_PRONOUN_OBJECT.");
    test.equal(output.toTarget[0].text, "ACTOR_NAME looks accusingly at you.");
    test.equal(output.toRoom[0].roomId, 3001);
    test.equal(output.toRoom[0].text, "ACTOR_NAME looks accusingly at TARGET_NAME.");
    test.equal(output.toWorld.length, 0);
    test.done();
};

exports.social_accuseWorksAsExpectedWhenTargetMissing = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = getSocialActor();

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, 'MissingFella', actor);
    
    var output = thisSocial.getOutput();
    test.equal(output.toActor[0].text, "Accuse somebody who's not even there??");
    test.equal(output.toTarget.length, 0);
    test.equal(output.toRoom.length, 0);
    test.equal(output.toWorld.length, 0);
    test.done();
};

exports.social_accuseWorksAsExpectedWhenTargetIsSelf = function(test) {
    var socialDefinition = global.SOCIALS[global.SCMD_ACCUSE];
    
    var actor = getSocialActor();
    
    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var thisSocial = new social(socialDefinition, actor.name, actor);
    
    var output = thisSocial.getOutput();
    test.equal(output.toActor[0].text, "You accuse yourself.");
    test.equal(output.toTarget.length, 0);
    test.equal(output.toRoom[0].roomId, 3001);
    test.equal(output.toRoom[0].text, "ACTOR_NAME seems to have a bad conscience.");
    test.equal(output.toWorld.length, 0);
    test.done();
};