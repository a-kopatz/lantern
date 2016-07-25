var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var reportSchema = require("./report").schema;

var ideaSchema = reportSchema.extend({
});

var ideaModel = mongoose.model('idea', ideaSchema);

module.exports = {
	schema: ideaSchema,
	idea: ideaModel,
};