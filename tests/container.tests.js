var Item = require('../item').item;
var Container = require('../container').container;

exports.item_emptyContainerReturnsNothing = function(test) {
    var container = new Container();
    container.isClosed = false;
    var result = container.listContents();
    test.equal(result[0].text, "   Nothing!");
    test.done();
};

exports.item_closedContainerReturnsError = function(test) {
    var container = new Container();
    container.isClosed = true;
    var result = container.listContents();
    test.equal(result[0].text, "   It is closed.");
    test.done();
};

exports.item_openContainerReturnsListOfContents = function(test) {
    var container = new Container();
    container.isClosed = false;
    
    var shirt = new Item();
    shirt.shortDescription = "a red shirt";
    container.contents.push(shirt);
    
    var pants = new Item();
    pants.shortDescription = "black pants";
    container.contents.push(pants);
    
    var result = container.listContents();
    test.equal(result[0].text, "a red shirt");
    test.equal(result[1].text, "black pants");
	test.done();
};

 

