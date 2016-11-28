var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("./item").itemSchema;

var containerSchema = itemSchema.extend({
    contents: [],
    isClosed: Boolean
}, { collection : 'items' });

containerSchema.methods.getType = function() {
	return global.ITEM_CONTAINER;
};

// containerSchema.methods.isClosed = function() {
//     return this.isClosed;
// };

containerSchema.methods.listContents = function() {
    var messages = [];
    
    if(this.isClosed === true) {
            messages.push( { text: "   It is closed." } );
    }
    else {
	    if(this.contents.length === 0) {
            messages.push( { text: "   Nothing!" } );
        }
        else {
            for(var i = 0; i < this.contents.length; i++) {
                if(this.contents[i] !== undefined && this.contents[i] !== null) {
                    messages.push( { text: this.contents[i].shortDescription } );
                }
            }
        }
    }
    
    return messages;
};

var containerModel = mongoose.model('container', containerSchema);

module.exports = {
	schema: containerSchema,
	container: containerModel
};