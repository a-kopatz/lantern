var Output = require('../output');
var Character = require("../character").character;
var Room = require("../room").room;
var World = require("../world");
var Item = require("../item").item;
var constants = require('../constants');

exports.output_formatReplacesActorName = function(test) {
    var actor = new Character();
    actor.name = 'Mike';
    var output = new Output(actor);
    
    var returnMessage = output.format("ACTOR_NAME says hi.", null);
    test.equal(returnMessage, "Mike says hi.");
    test.done();
};

exports.output_formatReplacesActorPossessive = function(test) {
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    var output = new Output(actor);
    
    var returnMessage = output.format("Blah blah ACTOR_PRONOUN_POSSESSIVE blah.", null);
    test.equal(returnMessage, "Blah blah his blah.");
    test.done();
};

exports.output_formatReplacesActorObject = function(test) {
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    var output = new Output(actor);
    
    var returnMessage = output.format("Something something ACTOR_PRONOUN_OBJECT.", null);
    test.equal(returnMessage, "Something something him.");
    test.done();
};

exports.output_formatReplacesActorSubject = function(test) {
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    var output = new Output(actor);
    
    var returnMessage = output.format("Yadda yadda ACTOR_PRONOUN_SUBJECT yadda.", null);
    test.equal(returnMessage, "Yadda yadda he yadda.");
    test.done();
};

exports.output_formatReplacesTargetName = function(test) {
    var actor = new Character();
    actor.name = 'Mike';
    var output = new Output(actor);
    
    var target = new Character();
    target.name = 'Joe';
    output.target = target;
    
    var returnMessage = output.format("TARGET_NAME says hi.", null);
    test.equal(returnMessage, "Joe says hi.");
    test.done();
};

exports.output_formatReplacesTargetPossessive = function(test) {
    var actor = new Character();
    var output = new Output(actor);

    var target = new Character();
    target.gender = global.GENDER_FEMALE;
    output.target = target;
    
    var returnMessage = output.format("Blah blah TARGET_PRONOUN_POSSESSIVE blah.", null);
    test.equal(returnMessage, "Blah blah her blah.");
    test.done();
};

exports.output_formatReplacesTargetObject = function(test) {
    var actor = new Character();
    var output = new Output(actor);

    var target = new Character();
    target.gender = global.GENDER_FEMALE;
    output.target = target;
    
    var returnMessage = output.format("Something something TARGET_PRONOUN_OBJECT.", null);
    test.equal(returnMessage, "Something something her.");
    test.done();
};

exports.output_formatReplacesTargetSubject = function(test) {
    var actor = new Character();
    var output = new Output(actor);

    var target = new Character();
    target.gender = global.GENDER_FEMALE;
    output.target = target;    
    
    var returnMessage = output.format("Yadda yadda TARGET_PRONOUN_SUBJECT yadda.", null);
    test.equal(returnMessage, "Yadda yadda she yadda.");
    test.done();
};

exports.output_formatReplacesFirstObjectShortDescription = function(test) {
    var actor = new Character();
    actor.name = "Erik";
    
    var item = new Item();
    item.shortDescription = "a cheesesteak sandwich";
    
    var output = new Output(actor);
    output.firstObject = item;

    var target = new Character();
    target.gender = global.GENDER_FEMALE;
    output.target = target;    
    
    var returnMessage = output.format("ACTOR_NAME eats FIRST_OBJECT_SHORTDESC.", null, [item] );
    test.equal(returnMessage, "Erik eats a cheesesteak sandwich.");
    test.done();
};

exports.output_formatReplacesFirstAndSecondObjectShortDescriptions = function(test) {
    var actor = new Character();
    actor.name = "Ricky Bobby";
    
    var item1 = new Item();
    item1.shortDescription = "a broken watch";

    var item2 = new Item();
    item2.shortDescription = "a bag";
    
    var output = new Output(actor);
    output.firstObject = item1;
    output.secondObject = item2;

    var target = new Character();
    target.gender = global.GENDER_FEMALE;
    output.target = target;    
    
    var returnMessage = output.format("ACTOR_NAME puts FIRST_OBJECT_SHORTDESC into SECOND_OBJECT_SHORTDESC.", null, [item1, item2] );
    test.equal(returnMessage, "Ricky Bobby puts a broken watch into a bag.");
    test.done();
};

exports.output_emitSendsMessageToActor = function(test) {
    var actor = new Character();
    var output = new Output(actor);
    output.toActor.push( { text: 'Accuse who??' } );

    var result = output.emit();

    test.equal(result[0], 'Accuse who??');
    test.done();
};

exports.output_generatesCompleteExpectedOutput = function(test) {
    var actor = new Character();
    actor.name = 'Actur';
    actor.gender = global.GENDER_MALE;
    
    var target = new Character();
    target.name = 'Targut';

    var observer = new Character();

    var world = new World();
    actor.world = world;
    
    var room = new Room();
    room.id = 3001;

    room.addCharacter(actor);
    room.addCharacter(target);
    room.addCharacter(observer);
    
    world.rooms.push(room);
    
    var output = new Output(actor);
    output.actor = actor;
    output.target = target;
    output.toActor = [ { text: 'You look accusingly at him.' }, { text: 'You think he is not trustworthy.' } ];
    output.toTarget = [ { text: 'ACTOR_NAME looks accusingly at you.' }, { text: 'He thinks you are not trustworthy.' } ];
    output.toRoom = [ { roomId: 3001, text: 'ACTOR_NAME looks accusingly at TARGET_NAME.' }, { roomId: 3001, text: 'Must be time for his nap.' } ];

    var result = output.emit();

    test.equal(result[0].length, 2);
    test.equal(result[0][0], 'You look accusingly at him.');
    test.equal(result[0][1], 'You think he is not trustworthy.');
    test.equal(result[1].length, 2);
    test.equal(result[1][0], 'Actur looks accusingly at you.');
    test.equal(result[1][1], 'He thinks you are not trustworthy.');
    test.equal(result[2], 'Actur looks accusingly at Targut.');
    test.equal(result[3], 'Must be time for his nap.');
    test.done();
};

