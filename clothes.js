var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").schema;

var clothesSchema = itemSchema.extend({
	wearSlots: [ Number ],
	maximumBmi: Number
}, { collection : 'items' });

clothesSchema.methods.getType = function() {
	return global.ITEM_CLOTHES;
};

var clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = {
	schema: clothesSchema,
	clothes: clothesModel
};