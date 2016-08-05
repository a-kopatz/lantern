var Npc = require("../npc").npc;

exports.isNpc_works = function(test) {
	var npc = new Npc();
	test.equal(npc.isNpc(), true);
	test.done();
};
