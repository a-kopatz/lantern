var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var npcSchema = require("../npc").schema;
var Output = require("../output");
var utility = require("./utility");

var janitorSchema = npcSchema.extend({
}, { collection : 'npcs' });

janitorSchema.methods.performActivity = function(randomNumber) {
	switch(randomNumber) {
	    case 0:
	        this.move("n");
	        break;
	    case 1:
	        this.move("e");
	        break;
	    case 2:
	        this.move("s");
	        break;
	    case 3:
	        this.move("w");
	        break;
	    case 4:
	        this.move("u");
	        break;
	    case 5:
	        this.move("d");
	        break;
	   default:
	        var randomItem = utility.randomNumber(0, this.room.contents.length - 1);
	        this.takeItem(randomItem.keywords[0]);
	        
	        for(var i = 0; i < this.inventory.length; i++) {
	            this.emitRoomMessage(this.name + " shreds " + this.inventory[i].shortDescription + " into a million pieces.");
	            this.world.removeItem(this.inventory[i]);
	        }

            this.inventory = [];
	        break;
	}
};


var janitorModel = mongoose.model('janitor', janitorSchema);

module.exports = {
	schema: janitorSchema,
	janitor: janitorModel
};