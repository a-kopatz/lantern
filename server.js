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
var shop = require('./shop');
var zone = require('./zone');
var interpreter = require('./interpreter');
var time = require('./time');
var Time = require('./time').time;
var mail = require('./mail');

var Post = require('./post').post;

var bank = require('./items/bank');
var bulletinboard = require('./items/bulletinboard');
var clothes = require('./items/clothes');
var shirt = require('./items/shirt');
var pants = require('./items/pants');
var food = require('./items/food');
var note = require('./items/note');
var pen = require('./items/pen');
var key = require('./items/key');
var vendingmachine = require('./items/vendingmachine');
var scale = require('./items/scale');

var npc = require('./npc');
var postmaster = require('./npcs/postmaster');
var cat = require('./npcs/cat');
var janitor = require('./npcs/janitor');
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
});

setInterval(servicePlayerCommandQueues, 1);
setInterval(hourElapsed, global.PULSE_MUD_HOUR * 1000);
setInterval(npcActivity, global.PULSE_NPC * 1000);

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
            socket.connectionState = global.CON_RMOTD;
            emitMessage(motd);
        }
        else if (sexInput === 'F') {
            socket.player.gender = global.GENDER_FEMALE;
            socket.connectionState = global.CON_RMOTD;
            emitMessage(motd);
        }
        else {
            emitMessage('That is not a sex... What IS your sex (M/F)?');
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
            console.log('found linkless player');
            
            if(gameWorld.players[i].disconnectTimer === undefined || gameWorld.players[i].disconnectTimer === null) {
                gameWorld.players[i].disconnectTimer = 1;
            }
            else {
                gameWorld.players[i].disconnectTimer = gameWorld.players[i].disconnectTimer + 1;
            }

            console.log('found linkless player and disconnectTimer is now: ' + gameWorld.players[i].disconnectTimer);

            if(gameWorld.players[i].disconnectTimer >= 2) {

                if (gameWorld.players[i].using !== undefined && gameWorld.players[i].using !== null) {
                    // Free up any furniture in use
                    gameWorld.players[i].using.using = null;
                }
                
                gameWorld.players[i].emitMessage(gameWorld.players[i] + " has been linkless for too long and extracted from the game!");
                gameWorld.players[i].room.removeCharacter(gameWorld.players[i]);
                gameWorld.players[i].world.removeCharacter(gameWorld.players[i]);

                
                // console.log(gameWorld.players[i].name + " would be extracted now because it's been more than 5");
                // console.log("but I suck and there's a horrible bug here somewhere.");
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

var introMessage = "Welcome to Lantern.\n\rBy what name do you wish to be known?";
var motd = "This is the message of the day.\n\rWe are under construction.  Pardon about the dust.\n\rThe game itself is highly unstable, so apologies in advance!\n\r*** PRESS RETURN: ";
var menu = "Welcome to Lantern!\n\r0) Exit from Lantern.\n\r1) Enter the game.\n\r2) Get Help!\n\r  Make a choice: ";
var welcomeMessage = "\r\nWelcome to Lantern!  May your visit here be... Interesting.\r\n\r\n";
var menuHelp = "Write something smart here.\n\r";

exports.setConnectionModeMenu = setConnectionModeMenu;
