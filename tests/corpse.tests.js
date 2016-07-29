var Item = require('../item').item;
var Corpse = require('../corpse').corpse;

exports.item_emptyCorpseReturnsNothing = function(test) {
    var corpse = new Corpse();
    var result = corpse.listContents();
    test.equal(result[0].text, "   Nothing!");
	test.done();
};

exports.item_corpseReturnsListOfContents = function(test) {
    var corpse = new Corpse();
    
    var shirt = new Item();
    shirt.shortDescription = "a blue shirt";
    corpse.contents.push(shirt);
    
    var pants = new Item();
    pants.shortDescription = "gray pants";
    corpse.contents.push(pants);
    
    var result = corpse.listContents();
    test.equal(result[0].text, "a blue shirt");
    test.equal(result[1].text, "gray pants");
	test.done();
};

