var mongoose = require('mongoose');
var schema = mongoose.Schema;

var mailSchema = new schema({
	senderName: String,
	recipientName: String,
	body: String
});

function checkForMail(character, postmaster, callback) {
	mailModel.find({ recipientName: character.name.toLowerCase() }, function(err, docs) {
 		if (err) {
            // TODO: Log error, I guess?
        }
 
		if(docs !== null) {
			if(docs.length > 0) {
				callback(character, postmaster, true).emit();
			}
			else {
				callback(character, postmaster, false).emit();
			}
		}
		else {
			callback(character, postmaster, false).emit();
		}
	});
}

function receiveMail(character, postmaster, callback) {
	mailModel.find({ recipientName: character.name.toLowerCase() }, function(err, docs) {
 		if (err) {
            // TODO: Log error, I guess?
        }
		else { 
			mailModel.find({ recipientName: character.name.toLowerCase() }).remove().exec();
			callback(character, postmaster, docs).emit();
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



