var Player = require("../player").player;
var Food = require("../items/food").food;

/////////////////////////////////////////////////

exports.player_nameWorks = function(test) {
	var thisPlayer = new Player();
	thisPlayer.name = "Rex";
	test.equal(thisPlayer.name, "Rex");
	test.done();
};

exports.player_passwordWorks = function(test) {
    var thisPlayer = new Player();
    thisPlayer.password = "Pa$$w0rd1";
    test.equal(thisPlayer.password, "Pa$$w0rd1");
    test.done();
};


exports.character_toggleAuction_togglesOnAndReturns = function(test) {
    var player = new Player();
    player.isNoAuction = true;
    
    var actual = player.toggleAuction();
    
    test.equal(actual.toActor[0].text, "You can now hear auctions.");
    test.equal(player.isNoAuction, false);
	test.done();
};

exports.character_toggleAuction_togglesOnAndReturns_1 = function(test) {
    var player = new Player();
    player.isNoAuction = true;
    
    var actual = player.toggleAuction(false);
    
    test.equal(actual.toActor[0].text, "You can now hear auctions.");
    test.equal(player.isNoAuction, false);
	test.done();
};

exports.character_toggleAuction_togglesOffAndReturns = function(test) {
    var player = new Player();
    player.isNoAuction = false;
    
    var actual = player.toggleAuction();
    
    test.equal(actual.toActor[0].text, "You are now deaf to auctions.");
    test.equal(player.isNoAuction, true);
	test.done();
};

exports.character_toggleAuction_togglesOffAndReturns_1 = function(test) {
    var player = new Player();
    player.isNoAuction = false;
    
    var actual = player.toggleAuction(true);
    
    test.equal(actual.toActor[0].text, "You are now deaf to auctions.");
    test.equal(player.isNoAuction, true);
	test.done();
};

// TODO: Test the rest of the toggles



exports.player_listInventoryShowsNothingCarried = function(test) {
    var player = new Player();
    
    var actual = player.listInventory();
    test.equal(actual.toActor[0].text, "You are carrying:");
    test.equal(actual.toActor[1].text, "  Absolutely nothing!!!");
    test.done();
};

exports.player_listInventoryShowSingularAndPlural = function(test) {
    var player = new Player();

    var donut1 = new Food();
    donut1.id = 1;
    donut1.keywords.push("donut");
    donut1.shortDescription = "a vanilla donut";
    donut1.pluralDescription = "vanilla donuts";
    player.inventory.push(donut1);

    for(var i = 0; i < 3; i++) {
        var donut2 = new Food();
        donut2.id = 2;
        donut2.keywords.push("donut");
        donut2.shortDescription = "a chocolate donut";
        donut2.pluralDescription = "chocolate donuts";
        player.inventory.push(donut2);
    }

    var actual = player.listInventory();
    test.equal(actual.toActor[0].text, "You are carrying:");
    test.equal(actual.toActor[1].text, "  a vanilla donut");
    test.equal(actual.toActor[2].text, "  3 chocolate donuts");
    test.done();
};

