var Character = require("../character").character;
var Room = require("../room").room;
var Food = require("../items/food").food;
var FeedingMachine = require("../items/feedingmachine").feedingmachine;

////////////////////////////////////////////////////

exports.returnsGoodDetailedDescription = function(test) {
    var feedingmachine = new FeedingMachine();
    feedingmachine.keywords.push("feeding");

    var result = feedingmachine.getDetailedDescription();

    // TODO: Test
    
	test.done();
};