var Note = require('../note').note;

exports.note_isBlankReturnsTrueWhenWrittenIsUndefined = function(test) {
    var note = new Note();
    note.written = undefined;
    
    test.equal(note.isBlank(), true);
	test.done();
};

exports.note_isBlankReturnsTrueWhenWrittenIsEmpty = function(test) {
    var note = new Note();
    note.written = '';
    
    test.equal(note.isBlank(), true);
	test.done();
};

exports.note_isBlankReturnsTrueWhenWrittenIsNull = function(test) {
    var note = new Note();
    note.written = null;
    
    test.equal(note.isBlank(), true);
	test.done();
};

exports.note_isBlankReturnsFalseWhenWrittenIsPopulated = function(test) {
    var note = new Note();
    note.written = 'This is something.';
    
    test.equal(note.isBlank(), false);
	test.done();
};

exports.note_returnsExpectedWhenBlank = function(test) {
    var note = new Note();
    note.shortDescription = 'A note';
    note.written = null;

    test.equal(note.getWrittenContents(), "A note -- There's nothing written on it.");
    test.done();
};

exports.note_returnsWrittenDescriptionWhenNotBlank = function(test) {
    var note = new Note();
    note.shortDescription = 'A note';
    note.written = 'Something written on the note.';

    test.equal(note.getWrittenContents(), "A note: Something written on the note.");
    test.done();
};
