var mongoose = require('mongoose');
var schema = mongoose.Schema;
// var constants = require("./constants");
// var extra = require('./extra').schema;
var autoIncrement = require('mongoose-auto-increment');

var replySchema = new schema({
    id: { type: Number, default: -1 },
	creator: String,
	created: Date,
	text: String
});

var postSchema = new schema({
    id: { type: Number, default: -1 },
    board: String,
    creator: String,
    created: Date,
    title: String,
    text: String,
    replies: [ replySchema ],
});

postSchema.plugin(autoIncrement.plugin, { model: 'post', field: 'id', startAt: 1 });

var replyModel = mongoose.model('reply', replySchema);
var postModel = mongoose.model('post', postSchema);

module.exports = {
    replySchema: replySchema,
    reply: replyModel,
	postSchema: postSchema,
	post: postModel
};

