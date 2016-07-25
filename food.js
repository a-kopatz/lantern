var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").schema;

var foodSchema = itemSchema.extend({
	calories: Number
});

var foodModel = mongoose.model('food', foodSchema);

module.exports = {
	schema: foodSchema,
	food: foodModel
};