var Pants = require("../items/pants").pants;

exports.returnsSimpleDescriptionWhenEverythingNormal = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(25);

    test.equal(result, "a pair of pants");
	test.done();
};

exports.returnsSnugWhenWearerIsFatter = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(27);

    test.equal(result, "a pair of pants (snug)");
	test.done();
};

exports.returnsTightWhenWearerIsFatter = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(28);

    test.equal(result, "a pair of pants (tight)");
	test.done();
};

exports.returnsMuffinTopWhenWearerIsFatter = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(29);

    test.equal(result, "a pair of pants (muffintop)");
	test.done();
};

exports.returnsHangingOverWhenWearerIsFatter = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(30);

    test.equal(result, "a pair of pants (bellyfat hanging over)");
	test.done();
};

exports.returnsDamageAppropriately_1 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 1;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(25);

    test.equal(result, "a pair of pants (missing top button)");
	test.done();
};

exports.returnsDamageAppropriately_2 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 2;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(25);

    test.equal(result, "a pair of pants (missing button, broken zipper)");
	test.done();
};

exports.returnsDamageAppropriately_3 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 3;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(25);

    test.equal(result, "a pair of pants (missing button, broken zipper, torn)");
	test.done();
};

exports.returnsDamageAppropriately_4 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 4;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(25);

    test.equal(result, "a pair of pants (completely ruined)");
	test.done();
};

exports.returnsMixedAndMatchedStateAndDamage = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 2;
    pants.maximumBmi = 30;

    var result = pants.getWornDescription(50);

    test.equal(result, "a pair of pants (missing button, broken zipper) (bellyfat hanging over)");
	test.done();
};

exports.weightUpdateDoesNotDamagePants = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.weightUpdate('Tina', 25);

    test.equal(result.length, 0);
	test.done();
};

exports.weightUpdateDamagesPantsWhenCharacterIsFat_1 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 0;
    pants.maximumBmi = 30;

    var result = pants.weightUpdate('Tina', 30);

    test.equal(result[0], "A button pops off your pants.");
    test.equal(result[1], "A button pops off Tina's pants.");
    test.equal(pants.condition, 1);
	test.done();
};

exports.weightUpdateDamagesPantsWhenCharacterIsFat_2 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 1;
    pants.maximumBmi = 30;

    var result = pants.weightUpdate('Tina', 30);

    test.equal(result[0], "The zipper explodes on your pants.");
    test.equal(result[1], "The zipper explodes on Tina's pants.");
    test.equal(pants.condition, 2);
	test.done();
};

exports.weightUpdateDamagesPantsWhenCharacterIsFat_3 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 2;
    pants.maximumBmi = 30;

    var result = pants.weightUpdate('Tina', 30);

    test.equal(result[0], "The seam rips in your pants.");
    test.equal(result[1], "The seam rips in Tina's pants.");
    test.equal(pants.condition, 3);
	test.done();
};

exports.weightUpdateDamagesPantsWhenCharacterIsFat_4 = function(test) {
    var pants = new Pants();
    pants.shortDescription = "a pair of pants";
    pants.condition = 3;
    pants.maximumBmi = 30;

    var result = pants.weightUpdate('Tina', 30);

    test.equal(result[0], "Your pants explode and are ruined.");
    test.equal(result[1], "Tina's pants explode and are ruined.");
    test.equal(pants.condition, 4);
	test.done();
};



