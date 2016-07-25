var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var reportSchema = require("./report").schema;

var bugSchema = reportSchema.extend({
});

var bugModel = mongoose.model('bug', bugSchema);

module.exports = {
	schema: bugSchema,
	bug: bugModel,
};