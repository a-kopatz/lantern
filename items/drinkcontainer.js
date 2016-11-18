var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;

var drinkcontainerSchema = itemSchema.extend({
	quantity: Number,
	containsLiquid: Number
}, { collection : 'items' });

drinkcontainerSchema.methods.getType = function() {
	return global.ITEM_DRINKCONTAINER;
};

// Like when looked at... "The beer glass is full of a brown liquid."
drinkcontainerSchema.methods.getDetailedDescription = function() {
    var result = [];
    
    if(this.detailedDescription !== undefined && this.detailedDescription !== null) {
        result.push(this.detailedDescription);
    }
    else {
        result.push("You see nothing special about it.");
    }
    
    if(this.quantity === 0) {
    	result.push("It's empty.");
    }
    else {
    	var drink = global.DRINKS[this.containsLiquid];
    	result.push("It's full of a " + drink.color + " liquid.");
    }
    
    return result;
};

var drinkcontainerModel = mongoose.model('drinkcontainer', drinkcontainerSchema);

module.exports = {
	schema: drinkcontainerSchema,
	drinkcontainer: drinkcontainerModel
};