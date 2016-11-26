var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;

var furnitureSchema = itemSchema.extend({
    condition: Number,
	maximumWeight: Number
}, { collection : 'items' });

furnitureSchema.methods.getType = function() {
	return global.ITEM_FURNITURE;
};

furnitureSchema.methods.getDetailedDescription = function() {
    var result = [];

	result.push(this.shortDescription + " is a piece of furniture that can be sat or rested on.");  
	
	if(this.condition === 1) {
		result.push("It is broken.  Somebody must have exceeded its weight limit.");
	}
	else {
		result.push("It is in good condition.");
	}
	
	if(this.using !== undefined && this.using !== null) {
		switch(this.using.position) {
			case global.POS_SITTING:
				this.using.name + " is currently sitting on it.";
				break;
			case global.POS_RESTING:
				this.using.name + " is currently resting on it.";
				break;
			case global.POS_SLEEPING:
				this.using.name + " is currently sleeping on it.";
				break;
			default:
				this.using.name + " is currently using it.";
				break;
		}
	}
	
    return result;
};

furnitureSchema.methods.weightUpdate = function(characterName, characterWeight) {
	var result = [];

	if(characterWeight >= this.maximumWeight) {
		result[0] = this.shortDescription + " explodes under your weight and is ruined.";
		result[1] = this.shortDescription + " explodes under " + characterName + "'s weight and is ruined.";
		this.condition = 1;
	}
	else if(characterWeight >= this.maximumWeight - 10) {
		result[0] = this.shortDescription + " creaks loudly under your mass.";
		result[1] = this.shortDescription + " creaks loudly under " + characterName + "'s mass.";
	}
	else if(characterWeight >= this.maximumWeight - 20) {
		result[0] = this.shortDescription + " creaks under your weight.";
		result[1] = this.shortDescription + " creaks under " + characterName + "'s weight.";
	}
	
	return result;
};


var furnitureModel = mongoose.model('furniture', furnitureSchema);

module.exports = {
	schema: furnitureSchema,
	furniture: furnitureModel
};