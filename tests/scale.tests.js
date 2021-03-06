var Scale = require("../items/scale").scale;
var Character = require("../character").character;
var Room = require('../room').room;

exports.scale_weighsCharacter = function(test) {
    var actor = new Character();
    actor.name = "Joe";
    actor.weight = "244";

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var scale = new Scale();
    scale.shortDescription = "a scale";
    room.contents.push(scale);

    var command = { };
    command.item = scale;

    var result = scale.weighCharacter(actor, command);

    test.equal(result.toActor[0].text, 'You climb onto the scale.');
    test.equal(result.toActor[1].text, "a scale announces, 'You weigh 244 pounds.'");
    test.equal(result.toRoom[0].text, 'ACTOR_NAME climbs onto the scale.');
    test.equal(result.toRoom[1].text, "a scale announces, 'ACTOR_NAME weighs 244 pounds.'");
	test.done();
};

exports.scale_canBeBroken = function(test) {
    var actor = new Character();
    actor.name = "Joe";
    actor.weight = "244";

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var scale = new Scale();
    scale.shortDescription = "a scale";
    scale.maximumWeight = 200;
    scale.condition = 0;
    room.contents.push(scale);

    var command = { };
    command.item = scale;

    var result = scale.weighCharacter(actor, command);

    test.equal(result.toActor[0].text, 'You climb onto the scale.');
    test.equal(result.toActor[1].text, "Springs fly out of a scale! You've broken it.");
    test.equal(result.toRoom[0].text, 'ACTOR_NAME climbs onto the scale.');
    test.equal(result.toRoom[1].text, "Springs fly out of a scale! Joe has broken it.");
    test.equal(scale.condition, global.CONDITION_BROKEN);
	test.done();
};

exports.scale_cannotBeUsedIfBroken = function(test) {
    var actor = new Character();
    actor.name = "Joe";
    actor.weight = "244";

    var room = new Room();
    room.id = 3001;
    room.addCharacter(actor);

    var scale = new Scale();
    scale.shortDescription = "a scale";
    scale.maximumWeight = 200;
    scale.condition = global.CONDITION_BROKEN;
    room.contents.push(scale);

    var command = { };
    command.item = scale;

    var result = scale.weighCharacter(actor, command);

    test.equal(result.toActor[0].text, "You can't use a scale -- it's broken." );
    test.equal(scale.condition, global.CONDITION_BROKEN);
	test.done();
};