var Output = require("./output");

// Object constructor
function Social(social, parameter, actor) {
    this.social = social;
    this.parameter = parameter;
    this.actor = actor;
}

Social.prototype.getOutput = function() {
    if (this.parameter === '') {
        return this.getOutputWithoutTarget();
    } 
    
    if(this.social.targetFoundMessages === undefined) {
        return this.getOutputWithoutTarget();
    } 
    
    if(this.actor.room !== undefined) {
        var target = this.actor.room.getCharacter(this.parameter);
        
        if(target === null) {
            return this.getOutputToActorTargetMissing();
        }
        
        if(target === this.actor) {
            return this.getOutputWhenSelfIsTarget();
        }
        
        this.target = target;
        
        if(this.target.position < this.social.minimumTargetPosition) {
            return this.getWrongPosition();
        }
    }
    
    return this.getOutputToActorTargetRoom();
};

Social.prototype.getOutputWithoutTarget = function() {
    var output = new Output(this.actor);
    output.toActor.push( { text: this.social.noTargetMessages.toActor } );

    if(this.social.noTargetMessages.toRoom !== "#") {
        // output.toRoom.push( { text: this.social.noTargetMessages.toRoom } );
        output.toRoom.push( { roomId: this.actor.room.id, textArray: [ { text: this.social.noTargetMessages } ] } );
    }

    return output;
};

Social.prototype.getOutputWhenSelfIsTarget = function() {
    var output = new Output(this.actor);

    output.toActor.push( { text: this.social.targetSelfMessages.toActor } );
    // output.toRoom.push( { text: this.social.targetSelfMessages.toRoom } );
    output.toRoom.push( { roomId: this.actor.room.id, textArray: [ { text: this.social.targetSelfMessages.toRoom } ] } );
    
    return output;
};

Social.prototype.getOutputToActorTargetRoom = function() {
    var output = new Output(this.actor);

    output.target = this.target;

    output.toActor.push( { text: this.social.targetFoundMessages.toActor } );
    output.toTarget.push( { text: this.social.targetFoundMessages.toTarget } );
    // output.toRoom.push( { text: this.social.targetFoundMessages.toRoom } );
    output.toRoom.push( { roomId: this.actor.room.id, textArray: [ { text: this.social.targetFoundMessages.toRoom } ] } );
    
    return output;
};

Social.prototype.getOutputToActorTargetMissing = function() {
    var output = new Output(this.actor);
    output.toActor.push( { text: this.social.targetNotFoundMessages.toActor } );
    return output;
};

Social.prototype.getWrongPosition = function() {
    var output = new Output(this.actor);
    output.target = this.target;
    output.toActor.push( { text: 'TARGET_NAME is not in a proper position for that.' } );
    return output;
};

// Exports
module.exports = Social;