var Character = require("../character").character;
var Room = require("../room").room;
var Food = require("../items/food").food;
var VendingMachine = require("../items/vendingmachine").vendingmachine;

////////////////////////////////////////////////////

exports.buyReturnsErrorIfNotEnoughTokens = function(test) {
    var myCharacter = new Character();
    myCharacter.money = 500;

    var vendingmachine = new VendingMachine();
    
    var command = {};
    command.tokens = [];
    command.tokens.push('buy');

    var result = vendingmachine.buyItem(myCharacter, command);

    test.equal(result.toActor[0].text, "But what do you want to buy?!?");
	test.done();
};

exports.buyReturnsErrorWhenItemIsNotForSale = function(test) {
    var myCharacter = new Character();
    myCharacter.money = 500;

    var vendingmachine = new VendingMachine();
    vendingmachine.contents = [];
    
    var command = {};
    command.tokens = [];
    command.tokens.push('buy');
    command.tokens.push('donut');
    command.item = vendingmachine;

    var result = vendingmachine.buyItem(myCharacter, command);

    test.equal(result.toActor[0].text, "That does not seem to be for sale in this vending machine.");
	test.done();
};

exports.buyFromVendingMachineBuysOneItem = function(test) {
    var myCharacter = new Character();
    myCharacter.name = "Jo";
    myCharacter.money = 500;

    var room = new Room();
    room.addCharacter(myCharacter);

    var vendingmachine = new VendingMachine();
    vendingmachine.shortDescription = "a vending machine";

    var donut = new Food();
    donut.keywords.push("donut");
    donut.shortDescription = "a donut";
    donut.cost = 1;
    vendingmachine.contents.push(donut);

    var command = {};
    command.tokens = [];
    command.tokens.push('buy');
    command.tokens.push('donut');
    command.item = vendingmachine;

    var result = vendingmachine.buyItem(myCharacter, command);

    test.equal(result.toActor[0].text, "You buy a donut from a vending machine.");
    test.equal(result.toRoom[0].text, "Jo buys a donut from a vending machine.");
    test.equal(myCharacter.inventory.length, 1);
    test.equal(myCharacter.money, 499);
	test.done();
};

exports.buyFromVendingMachineBuysMultipleItems = function(test) {
    var myCharacter = new Character();
    myCharacter.name = "Jo";
    myCharacter.money = 500;

    var room = new Room();
    room.addCharacter(myCharacter);

    var vendingmachine = new VendingMachine();
    vendingmachine.shortDescription = "a vending machine";

    var donut = new Food();
    donut.keywords.push("donut");
    donut.shortDescription = "a donut";
    donut.pluralDescription = "donuts";
    donut.cost = 1;
    vendingmachine.contents.push(donut);

    var command = {};
    command.tokens = [];
    command.tokens.push('buy');
    command.tokens.push('5');
    command.tokens.push('donut');
    command.item = vendingmachine;

    var result = vendingmachine.buyItem(myCharacter, command);

    test.equal(result.toActor[0].text, "You buy 5 donuts from a vending machine.");
    test.equal(result.toRoom[0].text, "Jo buys 5 donuts from a vending machine.");
    test.equal(myCharacter.inventory.length, 5);
    test.equal(myCharacter.money, 495);
	test.done();
};

exports.buyBlocksPurchseWhenNotEnoughMoneyForSingle = function(test) {
    var myCharacter = new Character();
    myCharacter.name = "Jo";
    myCharacter.money = 500;

    var room = new Room();
    room.addCharacter(myCharacter);

    var vendingmachine = new VendingMachine();
    vendingmachine.shortDescription = "a vending machine";

    var donut = new Food();
    donut.keywords.push("donut");
    donut.shortDescription = "a donut";
    donut.pluralDescription = "donuts";
    donut.cost = 50000;
    vendingmachine.contents.push(donut);

    var command = {};
    command.tokens = [];
    command.tokens.push('buy');
    command.tokens.push('donut');
    command.item = vendingmachine;

    var result = vendingmachine.buyItem(myCharacter, command);

    test.equal(result.toActor[0].text, "You do not have enough money to buy that item.");
    test.equal(myCharacter.inventory.length, 0);
    test.equal(myCharacter.money, 500);
	test.done();
};

exports.buyBlocksPurchseWhenNotEnoughMoneyForMultiple = function(test) {
    var myCharacter = new Character();
    myCharacter.name = "Jo";
    myCharacter.money = 500;

    var room = new Room();
    room.addCharacter(myCharacter);

    var vendingmachine = new VendingMachine();
    vendingmachine.shortDescription = "a vending machine";

    var donut = new Food();
    donut.keywords.push("donut");
    donut.shortDescription = "a donut";
    donut.pluralDescription = "donuts";
    donut.cost = 10;
    vendingmachine.contents.push(donut);

    var command = {};
    command.tokens = [];
    command.tokens.push('buy');
    command.tokens.push('5000');
    command.tokens.push('donut');
    command.item = vendingmachine;

    var result = vendingmachine.buyItem(myCharacter, command);

    test.equal(result.toActor[0].text, "You do not have enough money to buy that many.");
    test.equal(myCharacter.inventory.length, 0);
    test.equal(myCharacter.money, 500);
	test.done();
};


