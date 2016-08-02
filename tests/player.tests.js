var Player = require("../player").player;

/////////////////////////////////////////////////


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
