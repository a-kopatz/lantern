var constants = require('../constants');
var Interpreter = require("../interpreter");

exports.interpreter_cleanMakesInputLowercase = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "ALL CAPS INPUT";
    test.equal(thisIntepreter.cleanInput(dirtyInput), "all caps input");	
	test.done();
};

exports.interpreter_cleanRemovesLeadingSpaces = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "    tell jim hi";
    test.equal(thisIntepreter.cleanInput(dirtyInput), "tell jim hi");
	test.done();
};

exports.interpreter_cleanRemovesTrailingSpaces = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "tell jim hi                     ";
    test.equal(thisIntepreter.cleanInput(dirtyInput), "tell jim hi");	
	test.done();
};

exports.interpreter_cleanRemovesDoubleSpaces = function(test) {
	var thisIntepreter = new Interpreter();
	var dirtyInput = "tell     jim  hi      there";
    test.equal(thisIntepreter.cleanInput(dirtyInput), "tell jim hi there");
	test.done();
};

exports.interpreter_tokenizeMakesTokens = function(test) {
	var thisIntepreter = new Interpreter();
	var input = "tell jim hi";
	
	var expectedTokens = ["tell", "jim", "hi"];
	var actualTokens = thisIntepreter.tokenize(input);
    test.equal(actualTokens[0], expectedTokens[0]);
    test.equal(actualTokens[1], expectedTokens[1]);
    test.equal(actualTokens[2], expectedTokens[2]);
	test.done();
};
