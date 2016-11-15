var Furniture = require("../items/furniture").furniture;

exports.returnsNothingWhenUserIsUnderBmiLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumBmi = 30;

    var result = chair.weightUpdate('Timmy', 25);

    test.equal(result.length, 0);
	test.done();
};

exports.creaksWhenUserIsTwoUnderLimit = function(test) {
    var chair = new Furniture();
    chair.shortDescription = "a chair";
    chair.condition = 0;
    chair.maximumBmi = 30;

    var result = chair.weightUpdate('Timmy', 28);

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
    chair.maximumBmi = 30;

    var result = chair.weightUpdate('Timmy', 29);

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
    chair.maximumBmi = 30;

    var result = chair.weightUpdate('Timmy', 30);

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
    chair.maximumBmi = 30;

    var result = chair.weightUpdate('Timmy', 35);

    test.equal(result.length, 2);
    test.equal(result[0], "a chair explodes under your weight and is ruined.");
    test.equal(result[1], "a chair explodes under Timmy's weight and is ruined.");
    test.equal(chair.condition, 1);
	test.done();
};
