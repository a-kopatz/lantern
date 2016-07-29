var mongoose = require('mongoose');
var schema = mongoose.Schema;

var extraSchema = new schema({
    shortDescription: String,
    longDescription: String,
	keywords: []
});

extraSchema.methods.getShortDescription = function() {
    return this.shortDescription;
};

extraSchema.methods.getDescription = function() {
    var result = [];
    result.push(this.longDescription);
    return result;
};

var extraModel = mongoose.model('extra', extraSchema);

module.exports = {
	schema: extraSchema,
	extra: extraModel
};