var Character = require("../character").character;
var Room = require("../room").room;
var Bank = require("../items/bank").bank;



/////////////////////////////////////////////////

exports.checkBalanceReturnsWhenBalanceIsZero = function(test) {
    var myCharacter = new Character();
    myCharacter.bank = 0;
    var bank = new Bank();
    
    var result = bank.checkBalance(myCharacter);

    test.equal(result.toActor[0].text, "You have no money deposited.");
	test.done();
};

exports.checkBalanceReturnsWhenBalanceIsOne = function(test) {
    var myCharacter = new Character();
    myCharacter.bank = 1;
    var bank = new Bank();
    
    var result = bank.checkBalance(myCharacter);

    test.equal(result.toActor[0].text, "You have exactly 1 pathetic dollar deposited.");
	test.done();
};

exports.checkBalanceReturnsWhenBalanceIsAnythingElse = function(test) {
    var myCharacter = new Character();
    myCharacter.bank = 501;
    var bank = new Bank();
    
    var result = bank.checkBalance(myCharacter);

    test.equal(result.toActor[0].text, "You have 501 dollars deposited.");
	test.done();
};

exports.depositReturnsErrorIfAmountIsGreaterThanMoney = function(test) {
    var myCharacter = new Character();
    myCharacter.money = 500;
    var bank = new Bank();
    
    var command = {};
    command.tokens = [];
    command.tokens.push('');
    command.tokens.push('501');
    
    var result = bank.depositMoney(myCharacter, command);

    test.equal(result.toActor[0].text, "You don't have that much money!");
	test.done();
};

exports.depositReturnsErrorIfAmountIsNegative = function(test) {
    var myCharacter = new Character();
    myCharacter.money = 500;
    var bank = new Bank();
    
    var command = {};
    command.tokens = [];
    command.tokens.push('');
    command.tokens.push('-1');
    
    var result = bank.depositMoney(myCharacter, command);

    test.equal(result.toActor[0].text, "Deposit a negative amount?!??!  Just make a withdrawal instead.");
	test.done();
};

exports.depositWorksAsExpected = function(test) {
    var myCharacter = new Character();
    myCharacter.name = "Jason";
    myCharacter.money = 500;
    myCharacter.bank = 500;
    var bank = new Bank();
    
    var myRoom = new Room();
    myRoom.id = 3001;
    myRoom.addCharacter(myCharacter);
    
    var command = {};
    command.tokens = [];
    command.tokens.push('');
    command.tokens.push('500');
    
    var result = bank.depositMoney(myCharacter, command);

    test.equal(result.toActor[0].text, "You deposit 500 dollars.");
    test.equal(result.toRoom[0].text, "ACTOR_NAME makes a bank transaction.");
    test.equal(myCharacter.bank, 1000);
    test.equal(myCharacter.money, 0);
	test.done();
};

exports.withdrawReturnsErrorIfAmountIsGreaterThanMoney = function(test) {
    var myCharacter = new Character();
    myCharacter.bank = 500;
    var bank = new Bank();
    
    var command = {};
    command.tokens = [];
    command.tokens.push('');
    command.tokens.push('501');
    
    var result = bank.withdrawMoney(myCharacter, command);

    test.equal(result.toActor[0].text, "You don't have that much money in the bank!");
	test.done();
};

exports.withdrawReturnsErrorIfAmountIsNegative = function(test) {
    var myCharacter = new Character();
    myCharacter.money = 500;
    var bank = new Bank();
    
    var command = {};
    command.tokens = [];
    command.tokens.push('');
    command.tokens.push('-1');
    
    var result = bank.withdrawMoney(myCharacter, command);

    test.equal(result.toActor[0].text, "Withdraw a negative amount?!??!  Just make a deposit instead.");
	test.done();
};

exports.withdrawWorksAsExpected = function(test) {
    var myCharacter = new Character();
    myCharacter.name = "Jason";
    myCharacter.money = 500;
    myCharacter.bank = 500;
    var bank = new Bank();
    
    var myRoom = new Room();
    myRoom.id = 3001;
    myRoom.addCharacter(myCharacter);
    
    var command = {};
    command.tokens = [];
    command.tokens.push('');
    command.tokens.push('500');
    
    var result = bank.withdrawMoney(myCharacter, command);

    test.equal(result.toActor[0].text, "You withdraw 500 dollars.");
    test.equal(result.toRoom[0].text, "ACTOR_NAME makes a bank transaction.");
    test.equal(myCharacter.bank, 0);
    test.equal(myCharacter.money, 1000);
	test.done();
};
