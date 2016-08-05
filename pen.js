var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").schema;

var penSchema = itemSchema.extend({
}, { collection : 'items' });

penSchema.methods.getType = function() {
	return global.ITEM_NOTE;
};

var penModel = mongoose.model('pen', penSchema);

module.exports = {
	schema: penSchema,
	pen: penModel
};