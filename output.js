// Object constructor
function Output(actor) {
    this.actor = actor;
    this.target = null;
    this.items = [];

    this.toActor = [];
    this.toTarget = [];
    this.toRoom = [];
    this.toWorld = [];
    
    this.subCommand = null;
}

Output.prototype.format = function(text, textTarget, itemArray) {
    // TODO: Stuff like textTarget can see that actor or target --> name else 'someone'
    // Use function character.canSee(target)

    if(text === undefined || text === null) {
        console.log('WTF?');
        return '';
    } else if(text.length < 1) {
        return '';
    }
    
    var returnMessage = text.replace(/ACTOR_NAME/g, this.actor.name)
        .replace(/ACTOR_PRONOUN_POSSESSIVE/g, this.actor.getPossessivePronoun())
        .replace(/ACTOR_PRONOUN_OBJECT/g, this.actor.getObjectPronoun())
        .replace(/ACTOR_PRONOUN_SUBJECT/g, this.actor.getPersonalPronoun());
        
    if(this.target !== null) {
        returnMessage = returnMessage.replace(/TARGET_NAME/g, this.target.name)
            .replace(/TARGET_PRONOUN_POSSESSIVE/g, this.target.getPossessivePronoun())
            .replace(/TARGET_PRONOUN_OBJECT/g, this.target.getObjectPronoun())
            .replace(/TARGET_PRONOUN_SUBJECT/g, this.target.getPersonalPronoun());
    }
    
    if(itemArray !== undefined && itemArray !== null && itemArray.length > 0) {
        if(itemArray[0] !== undefined && itemArray[0] !== null) {
            returnMessage = returnMessage.replace(/FIRST_OBJECT_SHORTDESC/g, itemArray[0].shortDescription);
            returnMessage = returnMessage.replace(/FIRST_OBJECT_DESC/g, itemArray[0].longDescription);
        }
        
        if(itemArray.length > 1) {
            if(itemArray[1] !== undefined && itemArray[1] !== null) {
                returnMessage = returnMessage.replace(/SECOND_OBJECT_SHORTDESC/g, itemArray[1].shortDescription);  
                returnMessage = returnMessage.replace(/SECOND_OBJECT_DESC/g, itemArray[1].longDescription);
            }
        }
    }

    return returnMessage;
};

Output.prototype.toActorMessage = function(message, item) {
    this.toActor.push( { text: message, items: [ item ] } );
};

Output.prototype.toRoomMessage = function(roomId, message) {
    this.toRoom.push( { roomId: roomId, text: message } );
};

Output.prototype.toRoomMessage = function(roomId, message, item) {
    this.toRoom.push( { roomId: roomId, text: message, items: [ item ] } );
};


Output.prototype.emit = function() {
    var result = [];

    result.push(this.emitToActor());
    
    if(this.target !== null && this.toTarget.length > 0) {
        result.push(this.emitToTarget());
    }

    if(this.toRoom.length > 0) {
        result = result.concat(this.emitToRoom());
    }
    
    if(this.toWorld.length > 0) {
        result = result.concat(this.emitToWorld());
    }

    return result;
};

Output.prototype.__emit = function(target, data) {
    var result = [];

    for(var i = 0; i < data.length; i++) {
    //     if(data.color !== undefined) {
    //         //result.push(target.emitMessage(this.format(data[i].text, target, data[i].items), data[i].color));
    //         result.push(this.__simpleEmit(data[i]));
    //     } else {
    //         //result.push(target.emitMessage(this.format(data[i].text, target, data[i].items)));
    //         result.push(this.__simpleEmit(data[i]));
    //     }
        result.push(this.__simpleEmit(target, data[i]));
    }
    
    return result;
};

Output.prototype.__simpleEmit = function(target, data) {
    if(data.color !== undefined) {
        return target.emitMessage(this.format(data.text, target, data.items), data.color);
    }
    else {
        return target.emitMessage(this.format(data.text, target, data.items));
    }
};


Output.prototype.emitToActor = function() {
    var emitted = this.__emit(this.actor, this.toActor);
    return emitted;
};

Output.prototype.emitToTarget = function() {
    return this.__emit(this.target, this.toTarget);
};

Output.prototype.emitToRoom = function() {
    var result = [];
    
    for(var i = 0; i < this.toRoom.length; i++) {

         var room = this.actor.world.getRoom(this.toRoom[i].roomId);
         
         if(room !== null) {
             var players = room.getPlayers();
    
            for (var j = 0; j < players.length; j++) {
                var textTarget = players[j];
            
                if (textTarget !== this.actor && textTarget !== this.target) {
                    result.push(this.__simpleEmit(textTarget, this.toRoom[i]));
                }
            }
         }
    }
    
    return result;
};

Output.prototype.emitToWorld = function() {
    if(this.actor.world !== null) {
        
        var players = this.actor.world.players;
        
     	for(var i = 0; i < players.length; i++) {
     		if(players[i] !== this.actor) {
     	        if(players[i].room !== undefined) {
     	            if(players[i].room.isSoundproof === false) {
     	                this.checkAndEmitWorldMessage(players[i]);
     	            }
                }
     		}
     	}
	}
};

Output.prototype.checkAndEmitWorldMessage = function(targetPlayer) {
    switch(this.subCommand) {
        case global.SCMD_HOLLER:
        	if(targetPlayer.isNoHoller === false) {
        		this.emitWorldMessage(targetPlayer);
			}
			break;
		case global.SCMD_SHOUT:
			if(targetPlayer.isNoShout === false) {
				this.emitWorldMessage(targetPlayer);
			}
			break;
		case global.SCMD_GOSSIP:
			if(targetPlayer.isNoGossip === false) {
				this.emitWorldMessage(targetPlayer);
			}
			break;
		case global.SCMD_AUCTION:
			if(targetPlayer.isNoAuction === false) {
				this.emitWorldMessage(targetPlayer);
			}
			break;
		case global.SCMD_GRATZ:
			if(targetPlayer.isNoGratz === false) {
				this.emitWorldMessage(targetPlayer);
			}
			break;
		case global.SCMD_QSAY:
			if(targetPlayer.isNoQuest === false) {
                this.emitWorldMessage(targetPlayer);
            }
			break;
		default:
		    this.emitWorldMessage(targetPlayer);
    }
};

Output.prototype.emitWorldMessage = function(player) {
    this.__emit(player, this.toWorld);
};

// Exports
module.exports = Output;