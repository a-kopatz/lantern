var Item = require('../item').item;

exports.item_nonContainerReturnsCorrectMessage = function(test) {
    var item = new Item();
    var result = item.listContents();
    test.equal(result[0], "There's nothing inside that!");
	test.done();
};
