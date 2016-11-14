var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var clothesSchema = require("./clothes").schema;

var pantsSchema = clothesSchema.extend({
}, { collection : 'items' });

pantsSchema.methods.getType = function() {
	return global.ITEM_PANTS;
};

pantsSchema.methods.getWornDescription = function(bmi) {
    var description = this.shortDescription;
    
    if(this.condition === 1) {
        description = description + " (missing top button)";
    }
    else if(this.condition === 2) {
        description = description + " (missing button, broken zipper)";
    }
    else if(this.condition === 3) {
        description = description + " (missing button, broken zipper, torn)";
    }
    else if(this.condition === 4) {
        description = description + " (completely ruined)";
    }
    
    if(bmi === this.maximumBmi - 3) {
        description = description + " (snug)";
    }
    else if(bmi === this.maximumBmi - 2) {
        description = description + " (tight)";
    }
    else if(bmi === this.maximumBmi - 1) {
        description = description + " (muffintop)";
    }
    else if(bmi >= this.maximumBmi) {
        description = description + " (bellyfat hanging over)";
    }
    
    return description;
};

pantsSchema.methods.weightUpdate = function(characterName, bmi) {
    var result = [];
    
    if(bmi > this.maximumBmi - 2) {
        if(this.condition === 0) {
            result[0] = "A button pops off your pants.";
            result[1] = "A button pops off " + characterName + "'s pants.";
        }
        else if(this.condition === 1) {
            result[0] = "The zipper explodes on your pants.";
            result[1] = "The zipper explodes on " + characterName + "'s pants.";
        }
        else if(this.condition === 2) {
            result[0] = "The seam rips in your pants.";
            result[1] = "The seam rips in " + characterName + "'s pants.";
        }
        else if(this.condition === 3) {
            result[0] = "Your pants explode and are ruined.";
            result[1] = characterName + "'s pants explode and are ruined.";
        }
        
        this.condition = this.condition + 1;
    }

    return result;
};

var pantsModel = mongoose.model('pants', pantsSchema);

module.exports = {
	schema: pantsSchema,
	pants: pantsModel
};