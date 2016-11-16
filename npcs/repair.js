var mongoose = require('mongoose');
var schema = mongoose.Schema;
var extend = require('mongoose-schema-extend');
var npcSchema = require("../npc").schema;
var Output = require("../output");
var utility = require("../utility");
var Furniture = require('../items/furniture').furniture;

var repairSchema = npcSchema.extend({
}, { collection : 'npcs' });

repairSchema.methods.performActivity = function(randomNumber) {
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
	        for(var i = 0; i < this.room.contents.length; i++) {
	            if(this.room.contents[i] instanceof Furniture === true) {
	                // TODO: Change to global constant
	                if(this.room.contents[i].condition === 1) {
	                    this.room.contents[i].condition = 0;
	                    this.emitRoomMessage(this.name + " fixes " + this.room.contents[0].shortDescription + ".");
	                }
	            }
	        }
	        break;
	}
};

var repairModel = mongoose.model('repair', repairSchema);

module.exports = {
	schema: repairSchema,
	repair: repairModel
};