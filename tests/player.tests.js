var Player = require("../player").player;

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
