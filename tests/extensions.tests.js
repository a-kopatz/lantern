exports.findItem_returnsNullOnNanIndex = function(test) {
    var myArray = [ "a", "b", "c", "d" ];
    var result = myArray.findItem("j", "b");
    test.equal(result, null);
	test.done();
};

exports.findItem_returnsItemOnFullKeyword = function(test) {
    var item1 = {
        keywords: ["bottle"]
    };
    
    var item2 = {
        keywords: ["barrel"]
    };
    
    var item3 = {
        keywords: ["brush"]
    };

    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.findItem(1, "barrel");
    test.equal(result, item2);
	test.done();
};

exports.findItem_returnsItemOnPartialKeyword = function(test) {
    var item1 = {
        keywords: ["bottle"]
    };
    
    var item2 = {
        keywords: ["barrel"]
    };
    
    var item3 = {
        keywords: ["brush"]
    };

    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.findItem(1, "bar");
    test.equal(result, item2);
	test.done();
};

exports.findItem_returnsItemOnUppercaseKeyword = function(test) {
    var item1 = {
        keywords: ["bottle"]
    };
    
    var item2 = {
        keywords: ["barrel"]
    };
    
    var item3 = {
        keywords: ["brush"]
    };

    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.findItem(1, "BARREL");
    test.equal(result, item2);
	test.done();
};

exports.findItem_returnsSecondItemOnFullKeyword = function(test) {
    var item1 = {
        keywords: ["bottle", "barrel"]
    };
    
    var item2 = {
        keywords: ["barrel"]
    };
    
    var item3 = {
        keywords: ["brush", "barrel"]
    };

    var item4 = {
        keywords: ["brush", "barrel"]
    };
    
    var myInventory = [ item1, item2, item3, item4 ];
    var result = myInventory.findItem(2, "barrel");
    test.equal(result, item2);
	test.done();
};

exports.findItems_findsItemsOnFullKeyword = function(test) {
    var item1 = {
        keywords: ["bottle"]
    };
    
    var item2 = {
        keywords: ["barrel"]
    };
    
    var item3 = {
        keywords: ["barrel"]
    };

    var item4 = {
        keywords: ["box"]
    };
    
    var myInventory = [ item1, item2, item3, item4 ];
    var result = myInventory.findItems("barrel");
    test.equal(2, result.length);
    test.equal(result[0], item2);
    test.equal(result[1], item3);
	test.done();
};

exports.findItems_findsItemsOnPartialKeyword = function(test) {
    var item1 = {
        keywords: ["bottle"]
    };
    
    var item2 = {
        keywords: ["box"]
    };
    
    var item3 = {
        keywords: ["barrel"]
    };

    var item4 = {
        keywords: ["box"]
    };
    
    var myInventory = [ item1, item2, item3, item4 ];
    var result = myInventory.findItems("bo");
    test.equal(3, result.length);
    test.equal(result[0], item1);
    test.equal(result[1], item2);
    test.equal(result[2], item4);
	test.done();
};

exports.findItems_findsItemsOnMixedCaseKeyword = function(test) {
    var item1 = {
        keywords: ["bottle"]
    };
    
    var item2 = {
        keywords: ["barrel"]
    };
    
    var item3 = {
        keywords: ["barrel"]
    };

    var item4 = {
        keywords: ["box"]
    };
    
    var myInventory = [ item1, item2, item3, item4 ];
    var result = myInventory.findItems("BARREL");
    test.equal(2, result.length);
    test.equal(result[0], item2);
    test.equal(result[1], item3);    
	test.done();
};

exports.containsItemById_returnsTrueWhenFound = function(test) {
    var item1 = { 
        id: 12
    };

    var item2 = { 
        id: 23
    };

    var item3 = { 
        id: 34
    };
    
    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.containsItemById(23);
    test.equal(true, result);
    test.done();
};

exports.containsItemById_returnsFalseWhenNotFound = function(test) {
    var item1 = { 
        id: 12
    };

    var item2 = { 
        id: 23
    };

    var item3 = { 
        id: 34
    };
    
    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.containsItemById(36);
    test.equal(false, result);
    test.done();
};

exports.findByKeyword_findsAllItems = function(test) {
    var item1 = { 
        keywords : ["sword"]
    };

    var item2 = { 
        keywords : ["sword"]
    };

    var item3 = { 
        keywords : ["sword"]
    };
    
    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.findByKeyword("all");
    
    test.equal(result.items.length, 3);
    test.equal(result.mode, "all");
    test.done();
};

exports.findByKeyword_findsAllSwordItems = function(test) {
    var item1 = { 
        keywords : ["sword"]
    };

    var item2 = { 
        keywords : ["kite"]
    };

    var item3 = { 
        keywords : ["sword"]
    };
    
    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.findByKeyword("all.sword");
    
    test.equal(result.items.length, 2);
    test.equal(result.mode, "all.item");
    test.equal(result.token, "sword");
    test.done();
};

exports.findByKeyword_findsNDotSweaterItems = function(test) {
    var item1 = { 
        keywords : ["sweater"]
    };

    var item2 = { 
        keywords : ["sweater"]
    };

    var item3 = { 
        keywords : ["sweater"]
    };
    
    var myInventory = [ item1, item2, item3 ];
    var result = myInventory.findByKeyword("2.sweater");
    
    test.equal(result.items.length, 1);
    test.equal(result.items[0], item2);
    test.equal(result.mode, "n.item");
    test.equal(result.token, "sweater");
    test.done();
};