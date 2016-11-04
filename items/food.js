var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;

var foodSchema = itemSchema.extend({
	calories: Number
}, { collection : 'items' });

foodSchema.methods.getType = function() {
	return global.ITEM_FOOD;
};

var foodModel = mongoose.model('food', foodSchema);

module.exports = {
	schema: foodSchema,
	food: foodModel
};