var mongoose = require('mongoose');
var schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var helpdocSchema = new schema({
	id: { type: Number, default: -1 },
    topic: String,
    value: String,
    seeAlso: [ String ]
});


function display(argument, callback) {
	helpdocModel.find( { "topic":argument }, function(err, docs) {
	 //   console.log(docs);
		console.log(err);
		callback(docs);
	});
}

function addTopic(topic, character) {
    display(topic, function(helpdocsFromDb) {
        if(helpdocsFromDb.length === 0) {
            var newHelpDoc = new helpdocModel();
            newHelpDoc.topic = topic;
            newHelpDoc.value = 'This topic is incomplete.  It is a placeholder.';
            newHelpDoc.save(function(err) {
                // TODO: Log error, I guess?
                if(err !== null) {
                    console.log(err);
                }
                character.emitMessage('New topic, "' + topic + '",  saved!');
            });
        }
        else {
            character.emitMessage('That topic already exists!');
        }
    });	
}

function deleteTopic(topic, character) {
	helpdocModel.remove( { "topic": topic }, function(err) {
        character.emitMessage('Topic deleted!!!');
        if(err !== null) {
            console.log(err);
        }
    });
}

function setDescription(topic, description, character) {
	display(topic, function(helpdocsFromDb) {
        if(helpdocsFromDb.length > 0) {
            helpdocsFromDb[0].value = description;
            helpdocsFromDb[0].save(function(err) {
                // TODO: Log error, I guess?
                if(err !== null) {
                    console.log(err);
                }
                character.emitMessage('Topic saved!');
            });
        }
        else {
            character.emitMessage('That topic does not exist!');
        }
    });	
}

function addSeeAlso(topic, seeAlso, character) {
    display(topic, function(helpdocsFromDb) {
        if(helpdocsFromDb.length > 0) {
            helpdocsFromDb[0].seeAlso.push(seeAlso);
            helpdocsFromDb[0].save(function(err) {
                // TODO: Log error, I guess?
                if(err !== null) {
                    console.log(err);
                }
		    	character.emitMessage('Topic updated!');
            });
		}
		else {
		    character.emitMessage('That topic does not exist!');
		}
    });
}

function removeSeeAlso(topic, seeAlso, character) {
	display(topic, function(helpdocsFromDb) {
        if(helpdocsFromDb.length === 0) {
            character.emitMessage('No help exists on that topic.');
        }
        else {
            helpdocsFromDb[0].seeAlso.splice(helpdocsFromDb[0].seeAlso.indexOf(seeAlso, 1));
            helpdocsFromDb[0].save(function(err) {
	            // TODO: Log error, I guess?
	            if(err !== null) {
	                console.log(err);
	            }
	            character.emitMessage('Topic updated!');
	        });
	    }
	});	
}

helpdocSchema.plugin(autoIncrement.plugin, { model: 'helpdoc', field: 'id', startAt: 1 });
var helpdocModel = mongoose.model('helpdoc', helpdocSchema);

module.exports = {
	schema: helpdocSchema,
	helpdoc: helpdocModel,
	display: display,
	addTopic: addTopic,
	deleteTopic: deleteTopic,
	setDescription: setDescription,
	addSeeAlso: addSeeAlso
};