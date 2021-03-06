var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;

var noteSchema = itemSchema.extend({
    written: String
}, { collection : 'items' });

noteSchema.methods.getType = function() {
	return global.ITEM_NOTE;
};

noteSchema.methods.getWrittenContents = function() {
    if(this.isBlank()) {
        return this.shortDescription + " -- There's nothing written on it.";
    }
    else {
        return this.shortDescription + ": " + this.written;
    }
};

noteSchema.methods.isBlank = function() {
    if(this.written === undefined || this.written === null || this.written.length === 0) {
        return true; 
    }
    
    return false;
};

var noteModel = mongoose.model('note', noteSchema);

module.exports = {
	schema: noteSchema,
	note: noteModel
};