// Object constructor
function Output(actor) {
    this.actor = actor;
    this.target = null;
    
    this.toActor = [];
    this.toTarget = [];
    this.toRoom = [];
    this.toWorld = [];
    
    this.subCommand = null;
}

Output.prototype.format = function(text, textTarget) {
    // TODO: Stuff like textTarget can see that actor or target --> name else 'someone'
    
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

    return returnMessage;
};

Output.prototype.emit = function() {
    var result = [];
    
    result.push(this.emitToActor());
    
    if(this.target !== null) {
        result.push(this.emitToTarget());
    }

    result.push(this.emitToRoom());
    
    if(this.toWorld.length > 0) {
        result.push(this.emitToWorld());
    }

    return result;
};

Output.prototype.__emit = function(target, textArray) {
    for(var i = 0; i < textArray.length; i++) {
        if(textArray[i].color !== undefined) {
            target.emitMessage(this.format(textArray[i].text), textArray[i].color);
        } else {
            target.emitMessage(this.format(textArray[i].text));
        }
    }
};

Output.prototype.emitToActor = function() {
    this.__emit(this.actor, this.toActor);
};

Output.prototype.emitToTarget = function() {
    this.__emit(this.target, this.toTarget);
};

Output.prototype.emitToRoom = function() {
    for(var i = 0; i < this.toRoom.length; i++) {
        var room = this.actor.world.getRoom(this.toRoom[i].roomId);
        var players = room.getPlayers();

        for (var j = 0; j < players.length; j++) {
            var textTarget = players[j];
        
            if (textTarget !== this.actor && textTarget !== this.target) {
                this.__emit(textTarget, this.toRoom[i].textArray);
            }
        }
    }
};

Output.prototype.emitToWorld = function() {
    if(this.actor.world !== null) {
        
        var players = this.actor.world.players;
        
     	for(var i = 0; i < players.length; i++) {
     		if(players[i] !== this.actor) {
     	        if(this.players[i].room !== undefined) {
     	            if(players[i].room.isSoundproof === false) {
     	                this.checkWorldMessage(players[i]);
     	            }
                }
     		}
     	}
	}
};

Output.prototype.checkWorldMessage = function(targetPlayer) {
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