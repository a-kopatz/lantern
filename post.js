var mongoose = require('mongoose');
var schema = mongoose.Schema;
// var constants = require("./constants");
// var extra = require('./extra').schema;

var replySchema = new schema({
    id: { type: Number, default: 0 },
	creator: String,
	created: Date,
	text: String
});

var postSchema = new schema({
    id: { type: Number, default: 0 },
    board: String,
    creator: String,
    created: Date,
    title: String,
    text: String,
    replies: [ replySchema ],
});

var replyModel = mongoose.model('reply', replySchema);
var postModel = mongoose.model('post', postSchema);

module.exports = {
    replySchema: replySchema,
    reply: replyModel,
	postSchema: postSchema,
	post: postModel
};

