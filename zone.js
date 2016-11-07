var mongoose = require('mongoose');
var constants = require('./constants');
var schema = mongoose.Schema;
var Item = require('./item');
var item = require('./item').item;
var Npc = require('./npc');
var npc = require('./npc').npc;

var zoneSchema = new schema({
    id: Number,
    name: String,
    lowestRoomNumber: Number,
    highestRoomNumber: Number,
    lifespan: Number,
    resetMode: Number,
    resetCommands: [],
    age: Number,
});

zoneSchema.methods.reset = function() {
    for(var i = 0; i < this.resetCommands.length; i++) {
        executeZoneResetCommands(this.resetCommands[i], 0, this.world, null);
    }
};


function executeZoneResetCommands(commands, instructionNumber, world, lastThingLoaded) {
    var maxExisting;

    if(instructionNumber < commands.length) {
        var command = commands[instructionNumber].split(" ");
        
        switch(command[0]) {
            case "*":  // ignore
                break;
            case "N":  // npc (non-player character)
                var thisNpc = new npc();
                
                var npcId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countNPCs(npcId) < maxExisting) {
                    Npc.load(npcId, thisNpc, commands, world, instructionNumber, afterNpcLoaded);
                }
                break;
            case "O":  // item
                var roomItem = new item();
                var roomItemId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countItem(roomItemId) < maxExisting) {
                    Item.load(roomItemId, roomItem, commands, world, null, instructionNumber, afterRoomItemLoaded);
                }
                break;
            case "P":  // place item inside item
                var placedItem = new item();
                var placedItemId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countItem(givenItemId) < maxExisting) {
                    Item.load(placedItemId, placedItem, commands, world, lastThingLoaded, instructionNumber, afterPlacedItemLoaded);
                }
                break;
            case "G":
                var givenItem = new item();
                var givenItemId = parseInt(command[2], 10);
                maxExisting = parseInt(command[3], 10);
                
                if(world.countItem(givenItemId) < maxExisting) {
                    Item.load(givenItemId, givenItem, commands, world, lastThingLoaded, instructionNumber, afterGivenItemLoaded);
                }
                break;
            // case "E":
            //     var equippedItem = new item();
            //     var equippedItemId = parseInt(command[2], 10);
            //     maxExisting = parseInt(command[3], 10);
                
            //     if(world.countItem(givenItemId) < maxExisting) {
            //         Item.load(equippedItemId, equippedItem, commands, world, lastThingLoaded, instructionNumber, afterEquippedItemLoaded);
            //     }
            //     break;
            case "D":
                var room = world.getRoom(parseInt(command[2], 10));
                
                if(room !== null) {
                    var exit = room.getExit(command[3]);
                    
                	if(exit !== null) {
            		    switch(parseInt(command[4], 10)) {
            		        case 0:
            		            exit.isClosed = false;
            		            break;
                            case 1:
                                // mudlog.info("Closing door in " + direction + " direction in room " + room.id);
                                exit.isClosed = true;
                                exit.isLocked = false;
                                break;
                            case 2:
                                // mudlog.info("Locking door in " + direction + " direction in room " + room.id);
                                exit.isClosed = true;
                                exit.isLocked = true;
                                break;
            		    }
                    }
                }
                break;

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
     var roomId = parseInt(command[4], 10);

// //     mudlog.info("Loading " + mob.name + "(" + mob.id + ") with " + hitpointTotal + " hitpoints in room " + roomId);


    world.addCharacter(npc);

    var targetRoom = world.getRoom(roomId);
    
    if(targetRoom === null) {
        return;
    }
    
    targetRoom.addCharacter(npc);


    
    executeZoneResetCommands(commands, (instructionNumber + 1), world, npc);
}

function afterRoomItemLoaded(document, item, commands, world, mob, instructionNumber) {
    item = document[0];
    
    if(item !== undefined) {
        var command = commands[instructionNumber].split(" ");
        var roomId = parseInt(command[4], 10);
        
    //     mudlog.info("Adding object " + item.shortDescription + "(" + item.id + ") to room " + roomId);
        
        world.addItem(item);
        
        var targetRoom = world.getRoom(roomId);
        
        if(targetRoom === null) {
            return;
        }
        
        targetRoom.addItem(item);
        executeZoneResetCommands(commands, (instructionNumber + 1), world, item);
    }
}

function afterGivenItemLoaded(document, item, commands, world, npc, instructionNumber) {
    item = document[0];
    
    if(item !== undefined) {
        world.addItem(item);
    
//         mudlog.info("Giving " + item.id + " to mob " + mob.id);
        npc.inventory.push(item);
        executeZoneResetCommands(commands, (instructionNumber + 1), world, npc);
    }
//     else {
//         mudlog.warn("Undefined item load attempted - " + commands + " - " + instructionNumber);
//     }
}

// function afterEquippedItemLoaded(document, item, commands, world, mob, instructionNumber) {
//     item = document[0];
//     var command = commands[instructionNumber].split(" ");
//     var location = parseInt(command[4], 10);

//     // mudlog.info("Equipping " + item.id + " onto mob " + mob.id + " at location " + location);

//     world.addItem(item);
//     mob.wearing[location] = item;
//     executeZoneResetCommands(commands, (instructionNumber + 1), world, mob);
// }


function afterPlacedItemLoaded(document, item, commands, world, containerItem, instructionNumber) {
    item = document[0];
    world.addItem(item);
    
    if(containerItem.contents === undefined || containerItem.contents === undefined) {
        containerItem.contents = [];
    }
    
    containerItem.contents.push(item);
    executeZoneResetCommands(commands, (instructionNumber + 1), world, containerItem);
}

function load(callback) {
	zoneModel.find({}, function(err, docs) {
		//console.log(err);
		callback(docs);
	});
}

var zoneModel = mongoose.model('zone', zoneSchema);

module.exports = {
	zoneSchema: zoneSchema,
	zone: zoneModel,
	load: load
};


