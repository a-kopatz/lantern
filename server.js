var express = require('express');
var http = require('http');
var path = require('path');
var constants = require('./constants');
var configuration = require('./configuration');
var arrayExtensions = require('./arrayExtensions');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

// This needs to happen before our domain objects are loaded
mongoose.connect(global.LOCAL_MONGO);

autoIncrement.initialize(mongoose.connection);

// These are here to force mongoose to register the schema prior to use
var player = require('./player').player;
var world = require('./world');
var room = require('./room');

// TODO: Remove shop
var shop = require('./shop');
// TODO: Remove zone
var zone = require('./zone');

var resetcommand = require('./resetcommand');

var interpreter = require('./interpreter');
var time = require('./time');
var Time = require('./time').time;
var mail = require('./mail');

var Post = require('./post').post;

var item = require('./item');
var bank = require('./items/bank');
var bulletinboard = require('./items/bulletinboard');
var clothes = require('./items/clothes');
var shirt = require('./items/shirt');
var pants = require('./items/pants');
var food = require('./items/food');
var drinkcontainer = require('./items/drinkcontainer');
var note = require('./items/note');
var pen = require('./items/pen');
var key = require('./items/key');
var vendingmachine = require('./items/vendingmachine');
var scale = require('./items/scale');
var feedingmachine = require('./items/feedingmachine');

var npc = require('./npc');
var postmaster = require('./npcs/postmaster');
var cat = require('./npcs/cat');
var janitor = require('./npcs/janitor');
var repair = require('./npcs/repair');
var shopkeeper = require('./npcs/shopkeeper');

// -----
// Logging Test

var winston = require('winston');
require('winston-loggly-bulk');

 winston.add(winston.transports.Loggly, {
    token: global.WINSTON_TOKEN,
    subdomain: global.WINSTON_SUBDOMAIN,
    tags: ["Winston-NodeJS"],
    json:true
});

winston.log('info',"Server startup -- sending log now!");

// -----

// TODO: Room
// TODO: Zone
// TODO: World

var app = express();
var server = app.listen(process.env.PORT);
app.use(express.static(path.resolve(__dirname, 'client')));


var sockets = [];
var io = require('socket.io').listen(server);
var commandInterpreter = new interpreter();

http.createServer(app).listen(app.get('port'), function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
  console.log("Express server listening on port " + process.env.PORT);
});

var gameWorld = new world();

time.load(function(time) {
    if(time.length === 0) {
        gameWorld.time = new Time();
        gameWorld.time.hour = 3;
	    gameWorld.time.day = 1;
	    gameWorld.time.month = 1;
	    gameWorld.time.year = 2088;
    }
    else {
        gameWorld.time = time[0];
    }
});

gameWorld.postMap = new Map();

// FIXME: duplicate code -> it's wrong.
// TODO: Make board types a collection and loop through each
Post.find( { 'board':'social' } ).limit(30).sort({'id': -1}).exec(function(err, posts){
    gameWorld.postMap.set('social', posts);
});

Post.find( { 'board':'bug' } ).limit(30).sort({'id': -1}).exec(function(err, posts){
    gameWorld.postMap.set('bug', posts);
});

Post.find( { 'board':'community' } ).limit(30).sort({'id': -1}).exec(function(err, posts){
    gameWorld.postMap.set('community', posts);
});
// End FIXME


room.load(function(roomDocs) {
    gameWorld.rooms = roomDocs;

    for(var i = 0; i < gameWorld.rooms.length; i++) {
        gameWorld.rooms[i].world = gameWorld;
    }
    
    zone.load(function(zoneDocs) {
        gameWorld.zones = zoneDocs;
        
        for(var i = 0; i < gameWorld.zones.length; i++) {
            gameWorld.zones[i].world = gameWorld;
            gameWorld.zones[i].reset();
        }
        
        // TODO: Put this back -- probably a timing issue?
        // shop.load(function(shopDocs) {
        //     console.log(shopDocs);
        //     gameWorld.shops = shopDocs;

        //     for(var i = 0; i < gameWorld.shops.length; i++) {
        //         gameWorld.shops[i].world = gameWorld;
        //         gameWorld.shops[i].initialize();
        //     }
        // });
    });

    resetcommand.load(function(resetcommandDocs) {
        gameWorld.resetCommands = resetcommandDocs;

        for(var i = 0; i < gameWorld.resetCommands.length; i++) {
            gameWorld.resetCommands[i].reset(gameWorld);
        }
    });
});

setInterval(servicePlayerCommandQueues, 1);
setInterval(hourElapsed, global.PULSE_MUD_HOUR * 1000);
setInterval(npcActivity, global.PULSE_NPC * 1000);
setInterval(itemActivity, global.PULSE_ITEM * 1000);

io.sockets.on("connection", function(socket) {
    socket.disconnectTimer = 0;
    sockets.push(socket);
    console.log("A new user connected! Socket count:" + sockets.length);
    socket.player = null;
    socket.connectionState = global.CON_GET_NAME;
    emitMessage(introMessage);
    
    socket.on('disconnect', function() {
        if(socket.player !== null) {
            socket.player.emitRoomMessage(socket.player.name + " has lost " + socket.player.getPossessivePronoun() + " link!");
        }
        
        if(sockets.indexOf(socket) > -1) {
            sockets.splice(sockets.indexOf(socket), 1);
            console.log("A user disconnected! Socket count:" + sockets.length);
        }
    });
    
    socket.on('message', function(message) {
        handleSocketMessage(message);
    });
    
    function handleSocketMessage(message) {
        socket.disconnectTimer = 0;

        switch(socket.connectionState) {
            case global.CON_PLAYING:
                
                if(socket.player.isWriting === true) {
                    socket.player.handleWriting(message['input']);
                }
                else {
                    socket.player.commandQueue.push(message['input']);
                }
                break;
            case global.CON_GET_NAME:
                getName(message);
                break;
            case global.CON_NAME_CNFRM:
                confirmName(message);
                break;
            case global.CON_PASSWORD:
                getPassword(message);
                break;
            case global.CON_NEWPASSWD:
                newPassword(message);
                break;
            case global.CON_CNFPASSWD:
                confirmPassword(message);
                break;
            case global.CON_QSEX:
                getPlayerSex(message);
                break;
            case global.CON_CONSENT:
                getPlayerConsent(message);
                break;
            case global.CON_RMOTD:
                setConnectionModeMenu(socket);
                break;
            case global.CON_MENU:
                switch (message['input']) {
                    case '0':
                        emitMessage("Goodbye!");
                        socket.disconnect();
                        break;
                    case '1':
                        enterGame();
                        break;
                    case '2':
                        displayHelp();
                        break;
                    default:
                        emitMessage("That's not a menu choice!\r\n");
                        emitMessage(menu);
                        break;
                }
                break;
            case global.CON_DOOREDIT_KEYWORDS:
                var array = message['input'].split(',');
                socket.editingExit.keywords = [];
                for(var i = 0; i < array.length; i++) {
                    socket.editingExit.keywords.push(array[i]);
                }
                socket.connectionState = global.CON_DOOREDIT_CLOSABLE;
                socket.emit('message', { message: 'Is the exit closable? (true/false)', prompt: "IsClosable: > " });
                break;
            case global.CON_DOOREDIT_CLOSABLE:
                socket.editingExit.isClosable = message['input'];
                socket.connectionState = global.CON_DOOREDIT_ISCLOSED;
                socket.emit('message', { message: 'Is the exit currently closed? (true/false)', prompt: "IsClosed: > " });
                break;
            case global.CON_DOOREDIT_ISCLOSED:
                socket.editingExit.isClosed = message['input'];
                socket.connectionState = global.CON_DOOREDIT_LOCKABLE;
                socket.emit('message', { message: 'Is the exit lockable? (true/false)', prompt: "IsLockable: > " });
                break;
            case global.CON_DOOREDIT_LOCKABLE:
                socket.editingExit.isLockable = message['input'];
                socket.connectionState = global.CON_DOOREDIT_ISLOCKED;
                socket.emit('message', { message: 'Is the exit currently locked? (true/false)', prompt: "IsLocked: > " });
                break;
            case global.CON_DOOREDIT_ISLOCKED:
                socket.editingExit.isLocked = message['input'];
                socket.connectionState = global.CON_DOOREDIT_ISPICKPROOF;
                socket.emit('message', { message: 'Can the doorlock pickproof? (true/false)', prompt: "IsPickProof: > " });
                break;
            case global.CON_DOOREDIT_ISPICKPROOF:
                socket.editingExit.isPickproof = message['input'];
                socket.connectionState = global.CON_DOOREDIT_KEYID;
                socket.emit('message', { message: 'What is the ID of the key for the door? (-1 = no key)', prompt: "Key ID: > " });
                break;                
            case global.CON_DOOREDIT_KEYID:
                socket.editingExit.keyId = message['input'];
                socket.connectionState = global.CON_DOOREDIT_BMILIMIT;
                socket.emit('message', { message: 'What is the BMI Limit to pass through the exit? (-1 = no limit)', prompt: "BMI Limit: > " });
                break;
            case global.CON_DOOREDIT_BMILIMIT:
                socket.editingExit.bmiLimit = message['input'];
                socket.emit('message', { message: 'OK!', prompt: "> " });
                room.saveExit(socket.editingRoomId, socket.player, socket.editingExit);
                socket.connectionState = global.CON_PLAYING;
                break;
            case global.CON_ITEMEDIT_KEYWORDS:
                var array = message['input'].split(',');
                socket.editingItem.keywords = [];
                for(var i = 0; i < array.length; i++) {
                    socket.editingItem.keywords.push(array[i]);
                }
                socket.connectionState = global.CON_ITEMEDIT_SHORTDESC;
                socket.emit('message', { message: 'Enter the short description: (Ex: a hamburger)', prompt: "Short Description: > " });
                break;
            case global.CON_ITEMEDIT_SHORTDESC:
                socket.editingItem.shortDescription = message['input'];
                socket.connectionState = global.CON_ITEMEDIT_LONGDESC;
                socket.emit('message', { message: 'Enter the long description: (Ex: A small hamburger has been left here.)', prompt: "Long Description: > " });
                break;
            case global.CON_ITEMEDIT_LONGDESC:
                socket.editingItem.longDescription = message['input'];
                socket.connectionState = global.CON_ITEMEDIT_PLURALDESC;
                socket.emit('message', { message: 'Enter the plural description: (Ex: hamburgers)', prompt: "Plural Description: > " });
                break;
            case global.CON_ITEMEDIT_PLURALDESC:
                socket.editingItem.pluralDescription = message['input'];
                socket.connectionState = global.CON_ITEMEDIT_TAKEABLE;
                socket.emit('message', { message: 'Can the item be taken? (true/false)', prompt: "IsTakeable: > " });
                break;
            case global.CON_ITEMEDIT_TAKEABLE:
                socket.editingItem.canBeTaken = message['input'];
                if(socket.editingItem instanceof food.food) {
                    socket.connectionState = global.CON_FOODEDIT_CALORIES;
                    socket.emit('message', { message: 'How many calories are in the food?', prompt: "Calories: > " });
                }
                // Other item types go here
                break;
            case global.CON_FOODEDIT_CALORIES:
                socket.editingItem.calories = message['input'];
                socket.emit('message', { message: 'OK!', prompt: "> " });
                item.itemSave(socket.player, socket.editingItem);
                socket.connectionState = global.CON_PLAYING;
                break;
            case global.CON_NPCEDIT_KEYWORDS:
                var array = message['input'].split(',');
                socket.editingNpc.keywords = [];
                for(var i = 0; i < array.length; i++) {
                    socket.editingNpc.push(array[i]);
                }
                socket.connectionState = global.CON_NPCEDIT_NAME;
                socket.emit('message', { message: 'Enter the name of the NPC: (Ex: Fat Joe)', prompt: "Name: > "  });
                break;
            case global.CON_NPCEDIT_NAME:
                socket.editingNpc.name = message['input'];
                socket.connectionState = global.CON_NPCEDIT_SHORTDESC;
                socket.emit('message', { message: 'Enter the short description: (Ex: A cat is here, being annoying.)', prompt: 'Short Descriptions: > ' });
                break;
            case global.CON_NPCEDIT_SHORTDESC:
                socket.editingNpc.shortDescription = message['input'];
                socket.connectionState = global.CON_NPCEDIT_LONGDESC;
                socket.emit('message', { message: 'Enter the long description: (Ex: The cat seems to be happy, even if it does nothing.) ', prompt: 'Long Description: > ' });
                break;
            case global.CON_NPCEDIT_LONGDESC:
                socket.editingNpc.longDescription = message['input'];
                npc.npcSave(socket.player, socket.editingNpc);
                socket.connectionState = global.CON_PLAYING;
                break;
            case global.CON_RESETEDIT_COMMANDTYPE:
                switch(message['input'].toUpperCase()) {
                    case "N":
                        socket.editingResetcommandString = socket.editingResetcommandString + "N";
                        socket.connectionState = global.CON_RESETEDIT_NPC;
                        socket.emit('message', { message: 'What is the ID of the NPC?', prompt: 'NPC ID: > ' });
                        break;
                    case "I":
                        socket.editingResetcommandString = socket.editingResetcommandString + "I";
                        socket.connectionState = global.CON_RESETEDIT_ITEM;
                        socket.emit('message', { message: 'What is the ID of the Item?', prompt: 'Item ID: > ' });
                        break;
                    case "P":
                        socket.editingResetcommandString = socket.editingResetcommandString + "I";
                        socket.connectionState = global.CON_RESETEDIT_PUTITEMINITEM;
                        socket.emit('message', { message: 'What is the ID of the Item?', prompt: 'Item ID: > ' });
                        break;
                    case "V":
                        socket.editingResetcommandString = socket.editingResetcommandString + "V";
                        socket.connectionState = global.CON_RESETEDIT_NPCVENDING_ITEM;
                        socket.emit('message', { message: 'What is the ID of the Item?', prompt: 'Item ID: > ' });
                        break;
                    default:
                        socket.emit('message', { message: 'That is apparently not supported yet!' });
                        break;
                }
                break;
            case global.CON_RESETEDIT_NPC:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETEDIT_NPC_MAX_ALLOWED;
                socket.emit('message', { message: 'What is maximum allowed to exist in the game at once?', prompt: 'Maximum Allowed: > ' });
                break;
            case global.CON_RESETEDIT_ITEM:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETEDIT_ITEM_MAX_ALLOWED;
                socket.emit('message', { message: 'What is maximum allowed to exist in the game at once?', prompt: 'Maximum Allowed: > ' });
                break;
            case global.CON_RESETEDIT_NPC_MAX_ALLOWED:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETEDIT_NPC_ROOMID;
                socket.emit('message', { message: 'What room number do you want the NPC to load into?', prompt: 'Room ID: > ' });
                break;
            case global.CON_RESETEDIT_ITEM_MAX_ALLOWED:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETEDIT_ITEM_ROOMID;
                socket.emit('message', { message: 'What room number do you want the Item to load into?', prompt: 'Room ID: > ' });
                break;
            case global.CON_RESETEDIT_PUTITEMINITEM:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETITEM_PUTITEMINITEM_MAX_ALLOWED;
                socket.emit('message', { message: 'What is maximum allowed to exist in the game at once?', prompt: 'Maximum Allowed: > ' });
                break;
            case global.CON_RESETEDIT_NPCVENDING_ITEM:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETEDIT_NPCVENDING_MAX_ALLOWED;
                socket.emit('message', { message: 'What is maximum allowed to exist in the game at once?', prompt: 'Maximum Allowed: > ' });
                break;
            case global.CON_RESETEDIT_NPC_ROOMID:
            case global.CON_RESETEDIT_ITEM_ROOMID:
            case global.CON_RESETITEM_PUTITEMINITEM_MAX_ALLOWED:
            case global.CON_RESETEDIT_NPCVENDING_MAX_ALLOWED:
                socket.editingResetcommandString = socket.editingResetcommandString + " " + message['input'];
                socket.connectionState = global.CON_RESETEDIT_DONE;
                socket.emit('message', { message: 'Are you done? (yes/no)', prompt: 'Enter yes or no: > ' });
                break;
            case global.CON_RESET_DONE:
                if(message['input'].toLowerCase() === 'yes') {
                    socket.connectionState = global.CON_RESETEDIT_DESCRIPTION;
                    socket.emit('message', { message: 'Please add a short comment or description to what this does.'} );
                    socket.emit('message', { message: 'Example: "Put Shopkeeper Willie in the Friend Zone (Room 17)"', prompt: 'Comment: > '} );
                }
                else if(message['input'].toLowerCase() === 'no') {
                    socket.editingResetcommandString = socket.editingResetcommandString + ";";
                    socket.emit('message', { message: 'Next command in this sequence?', prompt: 'N / I / P / G / V: > ' });
                    character.socket.connectionState = global.CON_RESETEDIT_COMMANDTYPE;
                }
                break;


            case global.CON_RESETEDIT_DESCRIPTION: 
                socket.emit('message', { message: 'OK!', prompt: "> " });
                resetcommand.resetcommandSave(socket.player, socket.editingItem);
                socket.connectionState = global.CON_PLAYING;
                break;
        }
    }
    
    function getName(message) {
        var playerName = message['input'].trim();
        playerName = playerName.substring(0, 1).toUpperCase() + playerName.substring(1).toLowerCase();
        socket.player = new player();
        socket.player.name = playerName;
        socket.player.load(playerName, afterPlayerLoaded);
        socket.connectionState = global.CON_BLOCKED;
    }
    
    function afterPlayerLoaded(playerDocuments) {
         if (playerDocuments.length === 0) {
             emitMessage("Did I get that right, " + socket.player.name + " (Y/N)?");
             socket.connectionState = global.CON_NAME_CNFRM;
         }
         else {
             emitMessage('Password: ', 'Gray', 'true');
             socket.connectionState = global.CON_PASSWORD;
             socket.player = playerDocuments[0];
         }
    }
    
    function confirmName(message) {
        var msg = message['input'].trim().substring(0, 1).toUpperCase();
        
        if (msg == 'Y') {
            //mudlog.info('New player: ' + socket.player.name);
            emitMessage("New character.\n\rGive me a password for " + socket.player.name + ": ", 'Gray', 'true');
            socket.connectionState = global.CON_NEWPASSWD;
        }
        else if (msg == 'N') {
            emitMessage("Okay, what IS it, then? ");
            socket.connectionState = global.CON_GET_NAME;
        }
        else {
            emitMessage('Please type Yes or No: ');
        }
    }
    
    function getPassword(message) {
        if (message['input'] != socket.player.password) {
            emitMessage('Wrong password.\n\rPassword: ', 'Gray', 'true');
        }
        else {
            
            for(var i = 0; i < sockets.length; i++) {
                if(sockets[i] !== socket) {
                    if(sockets[i].player !== null) {
                        if(sockets[i].player.name === socket.player.name) {
                            sockets[i].player.emitRoomMessage(sockets[i].player.name + " suddenly keels over in pain, surrounded by a white aura...");
                            sockets[i].player.emitRoomMessage(sockets[i].player.name + "'s body has been taken over by a new spirit!!!");
                    
                            emitMessage("You take over your own body, already in use!", "Yellow");
                            socket.player = sockets[i].player;
                            socket.player.disconnectTimer = 0;
                            sockets[i].disconnect();
                            
                            socket.connectionState = global.CON_PLAYING;
                            socket.player.socket = socket;
                            return;
                        }
                    }
                }
            }

            // var linklessCharacter = gameWorld.getPlayer(socket.player.name);
            
            // if(linklessCharacter !== null) {
            //     emitMessage("Reconnecting...");
            //     linklessCharacter.emitRoomMessage(linklessCharacter.name + " has reconnected.");
            //     socket.connectionState = global.CON_PLAYING;
            //     socket.player = linklessCharacter;
            //     linklessCharacter.socket = socket;
            //     return;                
            // }

            socket.connectionState = global.CON_RMOTD;
            emitMessage(motd);
        }
    }

    function newPassword(message) {
        if (message['input'].length < 3 || message['input'].length > 10) {
            emitMessage('Illegal password.\n\rPassword: ', 'Gray', 'true');
        }
        else {
            socket.player.password = message['input'];
            emitMessage('Please retype password: ', 'Gray', 'true');
            socket.connectionState = global.CON_CNFPASSWD;
        }
    }

    function confirmPassword(message) {
        if (message['input'] !== socket.player.password) {
            emitMessage("Passwords don't match... start over.\n\rPassword: ", 'Gray', 'true');
            socket.connectionState = global.CON_NEWPASSWD;
        }
        else {
            emitMessage('What is your sex (M/F)?');
            socket.connectionState = global.CON_QSEX;
        }
    }
    
    function getPlayerSex(message) {
        var sexInput = message['input'].trim().substring(0, 1).toUpperCase();

        if (sexInput === 'M') {
            socket.player.gender = global.GENDER_MALE;
            socket.connectionState = global.CON_CONSENT;
            emitMessage(consentMessage);
        }
        else if (sexInput === 'F') {
            socket.player.gender = global.GENDER_FEMALE;
            socket.connectionState = global.CON_CONSENT;
            emitMessage(consentMessage);
        }
        else {
            emitMessage('That is not a sex... What IS your sex (M/F)?');
        }
    }
    
    function getPlayerConsent(message) {
        if(message['input' !== 'CONSENT']) {
            emitMessage('Sorry, but you have to type "consent" to agree to the terms!');
            emitMessage(consentMessage);
        }
        else {
            socket.connectionState = global.CON_RMOTD;
            emitMessage(motd);
        }
    }
    
    function displayHelp() {
        emitMessage(menuHelp);
    }
    
    function enterGame() {
        for(var i = 0; i < gameWorld.players. length; i++) {
            if(gameWorld.players[i].name === socket.player.name) {
                
                if(gameWorld.players[i].socket !== null) {
                    gameWorld.players[i].socket.disconnect();    
                }
                
                socket.player = gameWorld.players[i];
                emitMessage("You take over your own body, already in use!", "Yellow");
                socket.connectionState = global.CON_PLAYING;
                socket.player.socket = socket;
                socket.player.commandQueue = [];
                return;                
            }
        }

        if (socket.player.experience === undefined) {
            // socket.player.start(gameWorld.time);
            socket.player.start();
            socket.player.save(function(err) {
                // TODO: Log error, I guess?
            });
        }

        emitMessage(welcomeMessage);
        socket.connectionState = global.CON_PLAYING;
        socket.player.socket = socket;

        socket.player.commandQueue = [];
        socket.player.enterGame(gameWorld);

        // TODO: Put this back later
        // mail.find({ recipientName: socket.player.name.toLowerCase() }, function(err, maildocs) {
        //     if (err) {
        //         // TODO: Log error, I guess?
        //     }
            
        //     if(maildocs !== null) {
        //         if(maildocs.length > 0) {
        //             socket.player.emitMessage("You have mail waiting.");
        //         }
        //     }
        // });
    }

    function emitMessage(text, color, mask) {
        socket.emit('message', {
            message: text,
            color: color,
            mask: mask
        });
    }
});

function setConnectionModeMenu(socket) {
    socket.connectionState = global.CON_MENU;   
    socket.emit('message', { message: menu, prompt: "> " });
}

function servicePlayerCommandQueues() {
    for(var i = 0; i < sockets.length; i++) {
        if(sockets[i].player != null) {
            if(sockets[i].player.commandQueue != undefined) {
                if(sockets[i].player.commandQueue.length > 0) {
                    var nextCommand = sockets[i].player.commandQueue.shift();
                    commandInterpreter.handleInput(sockets[i].player, nextCommand);
                }
            }
        }
    }
}

function hourElapsed() {
    gameWorld.hourElapsed();
    
    for(var i = 0; i < gameWorld.players.length; i++) {
        if(gameWorld.players[i].socket.disconnected === true) {
            if(gameWorld.players[i].disconnectTimer === undefined || gameWorld.players[i].disconnectTimer === null) {
                gameWorld.players[i].disconnectTimer = 1;
            }
            else {
                gameWorld.players[i].disconnectTimer = gameWorld.players[i].disconnectTimer + 1;
            }

            if(gameWorld.players[i].disconnectTimer >= global.MAX_LINKLESSTIME) {

                if (gameWorld.players[i].using !== undefined && gameWorld.players[i].using !== null) {
                    // Free up any furniture in use
                    gameWorld.players[i].using.using = null;
                }
                
                gameWorld.players[i].emitRoomMessage(gameWorld.players[i].name + " has been linkless for too long and extracted from the game!");
                gameWorld.players[i].room.removeCharacter(gameWorld.players[i]);
                gameWorld.players[i].world.removeCharacter(gameWorld.players[i]);
            }
        }
        else {
            gameWorld.players[i].socketDisconnectTimer = 0;
        }
    }
}

function npcActivity() {
    gameWorld.updateNPCs();
}

function itemActivity() {
    gameWorld.updateItems();
}


var introMessage = "Welcome to Lantern.\n\rBy what name do you wish to be known?";
var motd = "This is the message of the day.\n\rWe are under construction.  Pardon about the dust.\n\rThe game itself is highly unstable, so apologies in advance!\n\r*** PRESS RETURN: ";
var menu = "Welcome to Lantern!\n\r0) Exit from Lantern.\n\r1) Enter the game.\n\r2) Get Help!\n\r  Make a choice: ";
var welcomeMessage = "\r\nWelcome to Lantern!  May your visit here be... Interesting.\r\n\r\n";
var menuHelp = "In the late 21st century, humans have created a perfect world where nobody needs to work, nobody gets \n\r" + 
    "old, and all health risks from obesity have been eliminated.  People are free to pursue leisure activities, and \n\r" +
    "most people have found gluttony to be their favorite passtime.  Fortunately, you've arrived at a wonderful resort \n\r" +
    "on your 18th birthday to being your life's adventure.\n\r";
var consentMessage = "\r\nThis is an adult-themed game.  As such, it includes mature subject matter that is inappropriate for children.  \n\r" +
    "By typing the word CONSENT at the prompt, you are indicating that you are an adult (18 years or older).  \n\r" +
    "And you are indicating that you understand this statement and shall not hold the administrators or creators of the game liable \n\r" +
    "for any and all things that you see or are exposed to during gameplay.\n\r" +
    "Type CONSENT to indicate that you agree to these terms: ";

exports.setConnectionModeMenu = setConnectionModeMenu;


room.roomSchema.plugin(autoIncrement.plugin, { model: 'room', field: 'id', startAt: 1 });
item.itemSchema.plugin(autoIncrement.plugin, { model: 'item', field: 'id', startAt: 1 });
food.foodSchema.plugin(autoIncrement.plugin, { model: 'food', field: 'id', startAt: 5000 });
resetcommand.resetcommandSchema.plugin(autoIncrement.plugin, { model: 'resetcommand', field: 'id', startAt: 1 });