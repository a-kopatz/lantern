var mongoose = require('mongoose');
var schema = mongoose.Schema;
var constants = require("./constants");

var itemSchema = new schema({
    id: Number,
    keywords: [ String ],
   	category: { type: Number, default: global.CATEGORY_ITEM },
    shortDescription: String,
    longDescription: String,
    actionDescription: String,
    canBeDonated: Boolean,
    canBeTaken: Boolean,
    type: String,
    cost: Number,
	extras: [{
		description: String,
	   	category: { type: Number, default: global.CATEGORY_EXTRA },
		keywords: []
	}]
});

function load(id, item, commands, world, previousThing, instructionNumber, callback) {
	itemModel.find({id: id}, function(err, docs) {
		console.log(err);
		callback(docs, item, commands, world, previousThing, instructionNumber);
	});
}

var itemModel = mongoose.model('item', itemSchema);

module.exports = {
	schema: itemSchema,
	item: itemModel,
	load: load
};
