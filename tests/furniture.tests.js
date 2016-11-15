var Furniture = require("../items/furniture").furniture;

exports.returnsNothingWhenUserIsUnderLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumWeight = 100;

    var result = chair.weightUpdate('Timmy', 25);

    test.equal(result.length, 0);
	test.done();
};

exports.creaksWhenUserIsTwoUnderLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumWeight = 100;

    var result = chair.weightUpdate('Timmy', 85);

    test.equal(result.length, 2);
    test.equal(result[0], "a chair creaks under your weight.");
    test.equal(result[1], "a chair creaks under Timmy's weight.");
    test.equal(chair.condition, 0);
	test.done();
};

exports.creaksLoudlyWhenUserIsOneUnderLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumWeight = 100;

    var result = chair.weightUpdate('Timmy', 95);

    test.equal(result.length, 2);
    test.equal(result[0], "a chair creaks loudly under your mass.");
    test.equal(result[1], "a chair creaks loudly under Timmy's mass.");
    test.equal(chair.condition, 0);
	test.done();
};

exports.isRuinedWhenUserMeetsLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumWeight = 100;

    var result = chair.weightUpdate('Timmy', 100);

    test.equal(result.length, 2);
    test.equal(result[0], "a chair explodes under your weight and is ruined.");
    test.equal(result[1], "a chair explodes under Timmy's weight and is ruined.");
    test.equal(chair.condition, 1);
	test.done();
};

exports.isRuinedWhenUserExceedsLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumWeight = 100;

    var result = chair.weightUpdate('Timmy', 101);

    test.equal(result.length, 2);
    test.equal(result[0], "a chair explodes under your weight and is ruined.");
    test.equal(result[1], "a chair explodes under Timmy's weight and is ruined.");
    test.equal(chair.condition, 1);
	test.done();
};

exports.returnsGoodDescriptionWhenNotBroken = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;

    var result = chair.getDetailedDescription();

    test.equal(result.length, 2);
    test.equal(result[0], "a chair is a piece of furniture that can be sat or rested on.");
    test.equal(result[1], "It is in good condition.");
	test.done();
};

exports.returnsBrokenDescriptionWhenBroken = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 1;

    var result = chair.getDetailedDescription();

    test.equal(result.length, 2);
    test.equal(result[0], "a chair is a piece of furniture that can be sat or rested on.");
    test.equal(result[1], "It is broken.  Somebody must have exceeded its weight limit.");
	test.done();
};
