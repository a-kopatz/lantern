var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var reportSchema = require("./report").schema;

var typoSchema = reportSchema.extend({
});

var typoModel = mongoose.model('typo', typoSchema);

module.exports = {
	schema: typoSchema,
	typo: typoModel,
};