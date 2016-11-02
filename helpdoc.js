var mongoose = require('mongoose');
var schema = mongoose.Schema;

var helpdocSchema = new schema({
    topic: String,
    value: String
});

function display(argument, callback) {
    console.log(argument);
    
	//helpDocsModel.find({ topic: argument }, function(err, docs) {
	helpdocModel.find({ }, function(err, docs) {
	    console.log(docs);
		console.log(err);
		callback(docs);
	});
}

var helpdocModel = mongoose.model('helpdoc', helpdocSchema);

module.exports = {
	schema: helpdocSchema,
	helpDoc: helpdocModel,
	display: display
};