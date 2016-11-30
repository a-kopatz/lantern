var mongoose = require('mongoose');
var constants = require('./constants');
var schema = mongoose.Schema;
var Item = require('./item');
var item = require('./item').item;
var Npc = require('./npc');
var npc = require('./npc').npc;
var autoIncrement = require('mongoose-auto-increment');

var resetcommandSchema = new schema({
    id: { type: Number, default: -1 },
    command: String
    // TODO: Probably add a timer to say how often to attempt the command?
});

function load(callback) {
	resetcommandModel.find({}, function(err, docs) {
		//console.log(err);
		callback(docs);
	});
}

resetcommandSchema.methods.reset = function(world) {
    var commands = this.command.split(';');
    executeResetCommands(commands, 0, world, null);
};

function executeResetCommands(commands, instructionNumber, world, lastThingLoaded) {
    var maxExisting;

    if(instructionNumber < commands.length) {
        var command = commands[instructionNumber].split(" ");
        
        switch(command[0]) {
            case "N":  // npc (non-player character)
                var thisNpc = new npc();
                
                var npcId = parseInt(command[1], 10);
                maxExisting = parseInt(command[2], 10);
                
                if(world.countNPCs(npcId) < maxExisting) {
                    Npc.load(npcId, thisNpc, commands, world, instructionNumber, afterNpcLoaded);
                }
                break;
            case "O":  // Put item in a room
                var roomItem = new item();
                var roomItemId = parseInt(command[1], 10);
                maxExisting = parseInt(command[2], 10);
                
                if(world.countItem(roomItemId) < maxExisting) {
                    Item.load(roomItemId, roomItem, commands, world, null, instructionNumber, afterRoomItemLoaded);
                }
                break;
            case "P":  // place item inside item
                var placedItem = new item();
                var placedItemId = parseInt(command[1], 10);
                maxExisting = parseInt(command[2], 10);
                
                if(world.countItem(givenItemId) < maxExisting) {
                    Item.load(placedItemId, placedItem, commands, world, lastThingLoaded, instructionNumber, afterPlacedItemLoaded);
                }
                break;
            case "G":  // Give item to NPC
                var givenItem = new item();
                var givenItemId = parseInt(command[1], 10);
                maxExisting = parseInt(command[2], 10);
                
                if(world.countItem(givenItemId) < maxExisting) {
                    Item.load(givenItemId, givenItem, commands, world, lastThingLoaded, instructionNumber, afterGivenItemLoaded);
                }
                break;
            case "V":
                var vendorItem = new item();
                var vendorItemId = parseInt(command[1], 10);
                
                Item.load(vendorItemId, vendorItem, commands, world, lastThingLoaded, instructionNumber, afterVendorItemLoaded);
                break;
            // TODO: E and D (Equip and Door)

        }
    }
}

function afterNpcLoaded(document, npc, commands, world, instructionNumber) {
    npc = document[0];

    if(npc === undefined) {
        return;
    }

    npc.initialize();
    
    var command = commands[instructionNumber].split(" ");
    var roomId = parseInt(command[3], 10);

    world.addCharacter(npc);

    var targetRoom = world.getRoom(roomId);
    
    if(targetRoom === null) {
        return;
    }
    
    targetRoom.addCharacter(npc);

    executeResetCommands(commands, (instructionNumber + 1), world, npc);
}

function afterRoomItemLoaded(document, item, commands, world, mob, instructionNumber) {
    item = document[0];
    
    if(item !== undefined) {
        var command = commands[instructionNumber].split(" ");
        var roomId = parseInt(command[3], 10);
        
        world.addItem(item);
        
        var targetRoom = world.getRoom(roomId);
        
        if(targetRoom === null) {
            return;
        }
        
        targetRoom.addItem(item);
        executeResetCommands(commands, (instructionNumber + 1), world, item);
    }
}

function afterGivenItemLoaded(document, item, commands, world, npc, instructionNumber) {
    item = document[0];
    
    if(item !== undefined) {
        world.addItem(item);
        npc.inventory.push(item);
        executeResetCommands(commands, (instructionNumber + 1), world, npc);
    }
}

function afterVendorItemLoaded(document, item, commands, world, npc, instructionNumber) {
    item = document[0];
    
    if(item !== undefined) {
        world.addItem(item);
    
        if(npc.sellsItems === undefined || npc.sellsItems === null) {
            npc.sellsItems = [];
        }
        
        npc.sellsItems.push(item);
        executeResetCommands(commands, (instructionNumber + 1), world, npc);
    }
}

function afterPlacedItemLoaded(document, item, commands, world, containerItem, instructionNumber) {
    item = document[0];
    world.addItem(item);
    
    if(containerItem.contents === undefined || containerItem.contents === undefined) {
        containerItem.contents = [];
    }
    
    containerItem.contents.push(item);
    executeResetCommands(commands, (instructionNumber + 1), world, containerItem);
}

var resetcommandModel = mongoose.model('resetcommand', resetcommandSchema);

module.exports = {
	resetcommandSchema: resetcommandSchema,
	resetcommand: resetcommandModel,
	load: load
};
