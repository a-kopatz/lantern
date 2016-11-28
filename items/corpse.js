var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;
// var constants = require("./constants");

var corpseSchema = itemSchema.extend({
    contents: []
}, { collection : 'items' });

corpseSchema.methods.getType = function() {
	return global.ITEM_CORPSE;
};

corpseSchema.methods.listContents = function() {
    var messages = [];
    
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
    
    return messages;
};

var corpseModel = mongoose.model('corpse', corpseSchema);

module.exports = {
	schema: corpseSchema,
	corpse: corpseModel
};