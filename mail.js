var mongoose = require('mongoose');
var schema = mongoose.Schema;

var mailSchema = new schema({
	senderName: String,
	recipientName: String,
	body: String
});

// TODO: Supply postmaster as param, perhaps?
function checkForMail(character, callback) {
	mailModel.find({ recipientName: character.name.toLowerCase() }, function(err, docs) {
 		if (err) {
            // TODO: Log error, I guess?
        }
 
		if(docs !== null) {
			if(docs.length > 0) {
				callback(character, true).emit();
			}
			else {
				callback(character, false).emit();
			}
		}
		else {
			callback(character, false).emit();
		}
	});
}

// TODO: Supply postmaster as param, perhaps?
function receiveMail(character, callback) {
	mailModel.find({ recipientName: character.name.toLowerCase() }, function(err, docs) {
 		if (err) {
            // TODO: Log error, I guess?
        }
		else { 
			mailModel.find({ recipientName: character.name.toLowerCase() }).remove().exec();
			callback(character, docs).emit();
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



