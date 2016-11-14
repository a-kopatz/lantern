var Shirt = require("../items/shirt").shirt;

exports.returnsSimpleDescriptionWhenEverythingNormal = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(25);

    test.equal(result, "a nice shirt");
	test.done();
};

exports.returnsSnugWhenWearerIsFatter = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(27);

    test.equal(result, "a nice shirt (snug)");
	test.done();
};

exports.returnsTightWhenWearerIsFatter = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(28);

    test.equal(result, "a nice shirt (tight)");
	test.done();
};

exports.returnsStretchedWhenWearerIsFatter = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(29);
    
    test.equal(result, "a nice shirt (stretched to limit)");
	test.done();
};

exports.returnsHangingOutWhenWearerIsFatter = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(30);
    
    test.equal(result, "a nice shirt (belly hanging out)");
	test.done();
};

exports.returnsDamageAppropriately_1 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 1;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(25);

    test.equal(result, "a nice shirt (missing a button)");
	test.done();
};

exports.returnsDamageAppropriately_2 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 2;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(25);

    test.equal(result, "a nice shirt (missing two buttons)");
	test.done();
};

exports.returnsDamageAppropriately_3 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 3;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(25);

    test.equal(result, "a nice shirt (missing all the buttons)");
	test.done();
};

exports.returnsDamageAppropriately_4 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 4;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(25);

    test.equal(result, "a nice shirt (ruined)");
	test.done();
};

exports.returnsMixedAndMatchedStateAndDamage = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 2;
    shirt.maximumBmi = 30;

    var result = shirt.getWornDescription(50);

    test.equal(result, "a nice shirt (missing two buttons) (belly hanging out)");
	test.done();
};

exports.weightUpdateDoesNotDamageShirt = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.weightUpdate('Tina', 25);

    test.equal(result.length, 0);
	test.done();
};

exports.weightUpdateDamagesShirtWhenCharacterIsFat_1 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 0;
    shirt.maximumBmi = 30;

    var result = shirt.weightUpdate('Tina', 30);

    test.equal(result[0], "A button pops off your shirt.");
    test.equal(result[1], "A button pops off Tina's shirt.");
    test.equal(shirt.condition, 1);
	test.done();
};

exports.weightUpdateDamagesShirtWhenCharacterIsFat_2 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 1;
    shirt.maximumBmi = 30;

    var result = shirt.weightUpdate('Tina', 30);

    test.equal(result[0], "A second button pops off your shirt.");
    test.equal(result[1], "A second button pops off Tina's shirt.");
    test.equal(shirt.condition, 2);
	test.done();
};

exports.weightUpdateDamagesPantsWhenCharacterIsFat_3 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 2;
    shirt.maximumBmi = 30;

    var result = shirt.weightUpdate('Tina', 30);

    test.equal(result[0], "All the remaining buttons fly off your shirt.");
    test.equal(result[1], "All the remaining buttons fly off Tina's shirt.");
    test.equal(shirt.condition, 3);
	test.done();
};

exports.weightUpdateDamagesShirtWhenCharacterIsFat_4 = function(test) {
    var shirt = new Shirt();
    shirt.shortDescription = "a nice shirt";
    shirt.condition = 3;
    shirt.maximumBmi = 30;

    var result = shirt.weightUpdate('Tina', 30);

    test.equal(result[0], "Your shirt explodes and is ruined.");
    test.equal(result[1], "Tina's shirt explodes and is ruined.");
    test.equal(shirt.condition, 4);
	test.done();
};



