var mongoose = require('mongoose');
var schema = mongoose.Schema;

var reportSchema = new schema({
    reporter: String,
    created: { type: Date, default: Date.now },
    message: String
});

var reportModel = mongoose.model('report', reportSchema);

module.exports = {
	schema: reportSchema,
	report: reportModel,
};