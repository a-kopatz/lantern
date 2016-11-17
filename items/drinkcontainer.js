var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;

var drinkContainerSchema = itemSchema.extend({
	quantity: Number,
	containsLiquid: Number
}, { collection : 'items' });

drinkContainerSchema.methods.getType = function() {
	return global.ITEM_DRINKCONTAINER;
};

var drinkContainerModel = mongoose.model('drinkContainer', drinkContainerSchema);

module.exports = {
	schema: drinkContainerSchema,
	drinkContainer: drinkContainerModel
};