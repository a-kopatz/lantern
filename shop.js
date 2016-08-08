ar mongoose = require('mongoose');
var schema = mongoose.Schema;
var constants = require('./constants');
var Item = require('./item');

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
