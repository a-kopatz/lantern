var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;

var keySchema = itemSchema.extend({
}, { collection : 'items' });

keySchema.methods.getType = function() {
	return global.ITEM_KEY;
};

var keyModel = mongoose.model('key', keySchema);

module.exports = {
	schema: keySchema,
	key: keyModel
};