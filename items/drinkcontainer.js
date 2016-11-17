var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;

var drinkcontainerSchema = itemSchema.extend({
	quantity: Number,
	containsLiquid: Number
}, { collection : 'items' });

drinkcontainerSchema.methods.getType = function() {
	return global.ITEM_DRINKCONTAINER;
};

var drinkcontainerModel = mongoose.model('drinkcontainer', drinkcontainerSchema);

module.exports = {
	schema: drinkcontainerSchema,
	drinkcontainer: drinkcontainerModel
};