var mongoose = require('mongoose');
var schema = mongoose.Schema;

var mailSchema = new schema({
	senderName: String,
	recipientName: String,
	body: String
});

function checkForMail(character, command, callback) {
	mailModel.find({ recipientName: character.name.toLowerCase() }, function(err, docs) {
 		if (err) {
            // TODO: Log error, I guess?
        }
 
		if(docs !== null) {
			if(docs.length > 0) {
				callback(character, command, true).emit();
			}
			else {
				callback(character, command, false).emit();
			}
		}
		else {
			callback(character, command, false).emit();
		}
	});
}

function receiveMail(character, command, callback) {
	mailModel.find({ recipientName: character.name.toLowerCase() }, function(err, docs) {
 		if (err) {
            // TODO: Log error, I guess?
        }
		else { 
			mailModel.find({ recipientName: character.name.toLowerCase() }).remove().exec();
			callback(character, command, docs).emit();
		}
	});
}

var mailModel = mongoose.model('mail', mailSchema);

module.exports = {
	schema: mailSchema,
	mail: mailModel,
	checkForMail: checkForMail,
	receiveMail: receiveMail
};



