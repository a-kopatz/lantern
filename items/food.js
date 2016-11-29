var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var itemSchema = require("../item").itemSchema;

var foodSchema = itemSchema.extend({
	calories: Number
}, { collection : 'items' });

foodSchema.methods.getType = function() {
	return global.ITEM_FOOD;
};

function addFood(character) {
	var newFood = new foodModel();
	
	newFood.save(function(err) {
        // TODO: Log error, I guess?
        if(err !== null) {
            console.log(err);
        }
        character.emitMessage('New item saved!');
        
        foodModel.find( { "_id":newFood._id }, function(err, docs) {
			// TODO: Log error, I guess?
			
			if(docs.length > 0) {
				character.emitMessage('New item is ' + docs[0].id);
			}
        });
    });
}


var foodModel = mongoose.model('food', foodSchema);

module.exports = {
	foodSchema: foodSchema,
	food: foodModel, 
	addFood: addFood
};