var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var constants = require("./constants");
//var character = require("./character");
var characterSchema = require("./character").schema;
// var utility = require("./utility");

var npcSchema = characterSchema.extend({
    id: Number,
    keywords: [ String ],
	shortDescription: String,
	longDescription: String //,
	// loadPosition: Number,
	// defaultPosition: Number,
	// isSentinel: Boolean,
	// isScavenger: Boolean
}, { collection: 'npcs' });

npcSchema.methods.isNpc = function() {
	return true;
};

npcSchema.methods.getShortDescription = function() {
	return this.shortDescription;
};

// npcSchema.methods.isPostmaster = function() {
// // TODO: Change implementation to avoid hardwiring specific numbers (or at least don't do that assignment here)
// 	if(this.id === 3010) {
// 		return true;
// 	}
	
// 	return false;
// };

npcSchema.methods.initialize = function() {

};

function load(id, npc, commands, world, instructionNumber, callback) {
	npcModel.find({id: id}, function(err, docs) {
		//console.log(err);
		callback(docs, npc, commands, world, instructionNumber);
	
	});
}

var npcModel = mongoose.model('npc', npcSchema);

module.exports = {
	schema: npcSchema,
	npc: npcModel,
	load: load
};


