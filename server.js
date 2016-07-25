var express = require('express');
var http = require('http');
var path = require('path');
var constants = require('./constants');
var arrayExtensions = require('./arrayExtensions');
var player = require('./player').player;
var mongoose = require('mongoose');
var world = require('./world');
var room = require('./room');
var zone = require('./zone');
var food = require('./food');
var interpreter = require('./interpreter');
// var stardate = require('./stardate');

// TODO: Room
// TODO: Zone
// TODO: World

var app = express();
var server = app.listen(process.env.PORT);
app.use(express.static(path.resolve(__dirname, 'client')));

mongoose.connect('mongodb://localhost/lantern');

var sockets = [];
var io = require('socket.io').listen(server);
var commandInterpreter = new interpreter();

http.createServer(app).listen(app.get('port'), function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
  console.log("Express server listening on port " + process.env.PORT);
});

var gameWorld = new world();

// stardate.load(function(date) {
//     console.log('stardate:' + date);
//     gameWorld.stardate = date[0];
// });

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
        
//         shop.load(function(shopDocs) {
//             gameWorld.shops = shopDocs;
            
//             for(var i = 0; i < gameWorld.shops.length; i++) {
//                 gameWorld.shops[i].world = gameWorld;
//                 gameWorld.shops[i].initialize();
//             }
//         });
    });
});

setInterval(servicePlayerCommandQueues, 1);
setInterval(hourElapsed, global.PULSE_MUD_HOUR * 1000);

io.sockets.on("connection", function(socket) {
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
                    
                            emitMessage("You take over your own body, already in use!");
                            socket.player = sockets[i].player;
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
    
    function enterGame() {
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

        // Mail.find({ recipientName: socket.player.name.toLowerCase() }, function(err, mail) {
        //     if (err) {
        //         // TODO: Log error, I guess?
        //     }
            
        //     if(mail !== null) {
        //         if(mail.length > 0) {
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
}

var introMessage = "Welcome to Lantern.\n\rBy what name do you wish to be known?";
var motd = "This is the message of the day.\n\rCurrently, there's not much here.\n\r*** PRESS RETURN: ";
var menu = "Welcome to Lantern!\n\r0) Exit from Lantern.\n\r1) Enter the game.\n\r\n\r  Make a choice: ";
var welcomeMessage = "\r\nWelcome to Lantern!  May your visit here be... Interesting.\r\n\r\n";


exports.setConnectionModeMenu = setConnectionModeMenu;
