var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;

var clothesSchema = itemSchema.extend({
	wearSlots: [ Number ],
	condition: Number,
	maximumBmi: Number
}, { collection : 'items' });

clothesSchema.methods.getType = function() {
	return global.ITEM_CLOTHES;
};

clothesSchema.methods.getWornDescription = function() {
	return this.shortDescription;
};

clothesSchema.methods.weightUpdate = function() {
	return [];
};

var clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = {
	schema: clothesSchema,
	clothes: clothesModel
};