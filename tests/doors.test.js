var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var World = require('../world');

///////////////////////////////////////////////////////////

exports.character_openCloseDoorReturnsErrorWhenKeywordNotFound = function(test) {
    var world = new World();
    var room = new Room();
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("door", true);
    test.equal(result.toActor[0].text, "There doesn't appear to be any 'door' here.");
    test.done();
};

exports.character_closeDoorReturnsErrorWhenDoorIsClosed = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_CLOSEDOOR);
    test.equal(result.toActor[0].text, "But it's already closed.");
    test.done();
};

exports.character_closeDoorReturnsErrorWhenDoorIsNotClosable = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.isClosable = false;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_CLOSEDOOR);
    test.equal(result.toActor[0].text, "That can't be opened and closed.");
    test.done();
};

exports.character_closeDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.isClosable = true;
    exit.toRoomId = 2;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isClosed = false;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_CLOSEDOOR);

    test.equal(room.exits[0].isClosed, true);
    test.equal(result.toActor[0].text, "You close the hatch.");
    test.equal(result.toRoom[0].text, "ACTOR_NAME closes the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isClosed, true);
    test.equal(result.toRoom[1].text, "The door is closed from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

exports.character_openDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.toRoomId = 2;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isClosed = true;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_OPENDOOR);

    test.equal(room.exits[0].isClosed, false);
    test.equal(result.toActor[0].text, "You open the hatch.");
    test.equal(result.toRoom[0].text, "ACTOR_NAME opens the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isClosed, false);
    test.equal(result.toRoom[1].text, "The door is opened from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

exports.character_openDoorReturnsErrorWhenDoorIsLocked = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.isLocked = true;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.openCloseDoor("hatch", global.SCMD_OPENDOOR);
    test.equal(result.toActor[0].text, "It's locked.");
    test.done();
};

///////////////////////////////////////////////////////////

exports.character_lockUnlockDoorReturnsErrorWhenKeywordNotFound = function(test) {
    var world = new World();
    var room = new Room();
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("door", global.SCMD_LOCKDOOR);
    test.equal(result.toActor[0].text, "There doesn't appear to be any 'door' here.");
    test.done();
};

exports.character_lockUnlockDoorReturnsErrorWhenDoorIsOpen = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_UNLOCKDOOR);
    test.equal(result.toActor[0].text, "But it's wide open...");
    test.done();
};

exports.character_lockUnlockDoorReturnsErrorWhenDoorIsNotClosable = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = false;
    exit.isClosable = false;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_UNLOCKDOOR);
    
    // You can't get to the 'real' error condition
    test.equal(result.toActor[0].text, "But it's wide open...");
    test.done();
};

exports.character_lockUnlockDoorReturnsErrorWhenDoorIsNotClosable = function(test) {
    var world = new World();
    var room = new Room();
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.keyId = 99;
    exit.keywords.push("hatch");
    
    room.exits.push(exit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_LOCKDOOR);
    test.equal(result.toActor[0].text, "You don't seem to have the right key for that.");
    test.done();
};

exports.character_unlockDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.isLocked = true;
    exit.isLockable = true;
    exit.toRoomId = 2;
    exit.keyId = 5;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isClosed = true;
    oppositeExit.isLocked = true;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var item = new Item();
    item.id = 5;
    actor.inventory.push(item);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_UNLOCKDOOR);

    test.equal(room.exits[0].isClosed, true);
    test.equal(room.exits[0].isLocked, false);
    test.equal(result.toActor[0].text, "You unlock the hatch.");
    test.equal(result.toRoom[0].text, "ACTOR_NAME unlocks the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isClosed, true);
    test.equal(oppositeRoom.exits[0].isLocked, false);
    test.equal(result.toRoom[1].text, "The door is unlocked from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};

exports.character_lockDoorWorks = function(test) {
    var world = new World();
    var room = new Room();
    room.id = 1;
    
    var oppositeRoom = new Room();
    oppositeRoom.id = 2;
    
    var exit = new Exit();
    exit.isClosed = true;
    exit.isClosable = true;
    exit.isLocked = false;
    exit.isLockable = true;
    exit.toRoomId = 2;
    exit.keyId = 5;
    exit.direction = "U";
    exit.keywords.push("hatch");

    room.exits.push(exit);
    
    var oppositeExit = new Exit();
    oppositeExit.isLocked = false;
    oppositeExit.toRoomId = 1;
    oppositeExit.direction = "D";
    oppositeExit.keywords.push("door");
    
    oppositeRoom.exits.push(oppositeExit);
    
    var actor = new Character();
    room.addCharacter(actor);
    world.addCharacter(actor);
    
    world.rooms.push(room);
    world.rooms.push(oppositeRoom);
    
    var item = new Item();
    item.id = 5;
    actor.inventory.push(item);
    
    var result = actor.lockUnlockDoor("hatch", global.SCMD_LOCKDOOR);

    test.equal(room.exits[0].isLocked, true);
    test.equal(result.toActor[0].text, "You lock the hatch.");
    test.equal(result.toRoom[0].text, "ACTOR_NAME locks the hatch.");
    test.equal(result.toRoom[0].roomId, 1);
    test.equal(oppositeRoom.exits[0].isLocked, true);
    test.equal(result.toRoom[1].text, "The door is locked from the other side.");
    test.equal(result.toRoom[1].roomId, 2);
    test.done();
};