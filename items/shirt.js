var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var clothesSchema = require("./clothes").schema;

var shirtSchema = clothesSchema.extend({
}, { collection : 'items' });

shirtSchema.methods.getType = function() {
	return global.ITEM_SHIRT;
};

shirtSchema.methods.getWornDescription = function(bmi) {
    var description = this.shortDescription;
    
    if(this.condition === 1) {
        description = description + " (missing a button)";
    }
    else if(this.condition === 2) {
        description = description + " (missing two buttons)";
    }
    else if(this.condition === 3) {
        description = description + " (missing all the buttons)";
    }
    else if(this.condition === 4) {
        description = description + " (ruined)";
    }
    
    if(bmi === this.maximumBmi - 3) {
        description = description + " (snug)";
    }
    else if(bmi === this.maximumBmi - 2) {
        description = description + " (tight)";
    }
    else if(bmi === this.maximumBmi - 1) {
        description = description + " (stretched to limit)";
    }
    else if(bmi === this.maximumBmi) {
        description = description + " (belly hanging out)";
    }
    
    return description;
};

shirtSchema.methods.weightUpdate = function(characterName, bmi) {
    var result = [];
    
    if(bmi > this.maximumBmi - 2) {
        if(this.condition === 0) {
            result[0] = "A button pops off your shirt.";
            result[1] = "A button pop's off " + characterName + "'s shirt.";
        }
        else if(this.condition === 1) {
            result[0] = "A second button pops off your shirt.";
            result[1] = "A second button pops off " + characterName + "'s shirt.";
        }
        else if(this.condition === 2) {
            result[0] = "All the remaining buttons fly off your shirt.";
            result[1] = "All the remaining buttons fly off " + characterName + "'s shirt.";
        }
        else if(this.condition === 3) {
            result[0] = "Your shirt explodes and is ruined.";
            result[1] = characterName + "'s shirt explodes and is ruined.";
        }
        
        this.condition = this.condition + 1;
    }

    return result;
};


var shirtModel = mongoose.model('shirt', shirtSchema);

module.exports = {
	schema: shirtSchema,
	shirt: shirtModel
};