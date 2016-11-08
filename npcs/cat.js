var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var npcSchema = require("../npc").schema;
var Output = require("../output");

var catSchema = npcSchema.extend({
}, { collection : 'npcs' });

catSchema.methods.performActivity = function() {
	//this.emitRoomMessage(this.name + " meows.");
};


var catModel = mongoose.model('cat', catSchema);

module.exports = {
	schema: catSchema,
	cat: catModel
};