var mongoose = require('mongoose');
var schema = mongoose.Schema;
var constants = require('./constants');
var Item = require('./item');
var Output = require("./output");

var shopSchema = new schema({
    produces: [],
    sellingProfit: Number,
    buyingProfit: Number,
    itemTypes: [],
    unknownItemBuyMessage: String,
    unknownItemSellMessage: String,
    wrongItemTypeMessage: String,
    shopCantAffordMessage: String,
    playerCantAffordMessage: String,
    buyMessage: String,
    sellMessage: String,
    shopkeeperId: Number,
    roomId: Number,
    openHour: Number,
    closesHour: Number
});

shopSchema.methods.isShopOk = function() {
    // if(this.shopKeeper === null || this.shopKeeper === undefined) {
        
    //     this.shopKeeper = this.world.getNPC(this.shopkeeperId);
        
    //     if(this.shopKeeper === null || this.shopKeeper === undefined) {
    //         return false;
    //     }
    // }
    
    // if player can do business here (is open, trades with type, in right room, etc)
    return true;
};

shopSchema.methods.listItemsForSale = function(character) {
    var output = new Output(character);
    
    if(this.isShopOk() === true) {
        if(this.shopKeeper.inventory.length === 0) {
            output.toActorMessage(this.shopKeeper.name + " says, 'Currently, there is nothing for sale.'");
            return output;
        }
        
        output.toActorMessage(" # Available      Item                                               Cost");
        output.toActorMessage("-------------------------------------------------------------------------");
        
        for(var i = 0; i < this.shopKeeper.inventory.length; i++) {
            var item = this.shopKeeper.inventory[i];
            
            var quantity = "1";
            
            if(this.produces.indexOf(item.id) > -1) {
                quantity = "Unlimited";
            }
    
            output.toActorMessage(this.listObject(item, character, quantity));
        }
    }
    else {
        // TODO: Shop is not ok
    }
    
    // TODO: "list shirt", "list pizza", etc
    
    return output;
};

shopSchema.methods.listObject = function(itemForSale, character, quantity) {

    // TODO: Sort inventory and have a proper quantity!
    
    var message = " ";
    
    for(var i = 0; i < (11 - quantity.length); i++) {
        message = message + " ";
    }
    
    message = message + quantity + "      " + itemForSale.getShortDescription().substring(0, 45);
    
    for(var j = 0; j < 45 - itemForSale.getShortDescription().length; j++) {
        message = message + " ";
    }
    
    var buyPrice = this.getBuyPrice(itemForSale, character).toString();

    for(var k = 0; k < 10 - buyPrice.length; k++) {
        message = message + " ";
    }
    
    message = message + buyPrice;
    
    return message;
};


shopSchema.methods.getBuyPrice = function(itemForSale) {
    return Math.max(1, Math.round(itemForSale.cost * this.buyingProfit));
};

shopSchema.methods.getSellPrice = function(itemForSale) {
    return Math.max(0, Math.round(itemForSale.cost * this.sellingProfit));
};

function load(callback) {
    shopModel.find({}, function(err, docs) {
		//console.log(err);
		callback(docs);
	});
}


var shopModel = mongoose.model('shop', shopSchema);

module.exports = {
	schema: shopSchema,
	shop: shopModel,
	load: load
};
