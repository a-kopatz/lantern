var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").schema;

var furnitureSchema = itemSchema.extend({
    condition: Number,
	maximumBmi: Number
}, { collection : 'items' });

furnitureSchema.methods.getType = function() {
	return global.ITEM_FURNITURE;
};

furnitureSchema.methods.weightUpdate = function(characterName, bmi) {
	var result = [];

	if(bmi >= this.maximumBmi) {
		result[0] = this.shortDescription + " explodes under your weight and is ruined.";
		result[1] = this.shortDescription + " explodes under " + characterName + "'s weight and is ruined.";
		this.condition = 1;
	}
	else if(bmi === this.maximumBmi - 1) {
		result[0] = this.shortDescription + " creaks loudly under your mass.";
		result[1] = this.shortDescription + " creaks loudly under " + characterName + "'s mass.";
	}
	else if(bmi === this.maximumBmi - 2) {
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