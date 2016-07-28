var mongoose = require('mongoose');
var schema = mongoose.Schema;

var constants = require("./constants");

var timeSchema = schema({
	hour: Number,
	day: Number,
	month: Number,
	year: Number
}, { collection: 'time' });

timeSchema.methods.advanceHour = function() {
	this.hour++;

	if(this.hour > 23) {
		this.hour = 0;
		this.day++;
	}
	
    if(this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) {
    	if(this.day > 30) {
    		this.day = 1;
    		this.month++;
    	}
	}
	else if(this.month == 2 && this.day > 28) {
	    if(this.year % 4 != 0) {
	        this.day = 1;
	        this.month++;
	    }
	}
	else {
	    if(this.day > 31) {
	        this.day = 1;
	        this.month++;
	    }
	}
	
	if(this.month > 12) {
		this.month = 1;
		this.year++;
	}
};

timeSchema.methods.getTimeOfDay = function() {
	if(this.hour < 12) {
		return "morning"; 
	}
	else if(this.hour < 19) {
		return "afternoon";
	}
	else {
	    return "evening";
	}
};

timeSchema.methods.getClockTime = function() {
	if(this.hour > 12) {
		return this.hour % 12;
	}
	
	if(this.hour === 0) {
		return 12;
	}
	
	return this.hour;
};

timeSchema.methods.getDayOfWeek = function() {
    var d = new Date();
    d.setYear(this.year);
    d.setMonth(this.month - 1);
    d.setDate(this.day);

    return global.daysOfTheWeek[d.getDay()];
};

timeSchema.methods.getMonthName = function() {
	return global.monthNames[this.month];
};

timeSchema.methods.getDigitSuffix = function(value) {
	var suffix = "th";

	if(value != 11 && value != 12)	{
		if(((value % 100) / 10) != 1) {
			switch(value % 10) {
				case 1:
					suffix = "st";
					break;
				case 2:
					suffix = "nd";
					break;
				case 3:
					suffix = "rd";
					break;
			}
		}
	}

	return suffix;
};

timeSchema.methods.getDisplayTime = function() {
	return "It is " + this.getClockTime() + " o'clock in the " + this.getTimeOfDay() + " on " + this.getDayOfWeek() + ".";
};

timeSchema.methods.getDisplayDate = function() {
	return "The " + this.day + this.getDigitSuffix(this.day) + " Day of " + this.getMonthName() + ", Year " + this.year + ".";
};

timeSchema.methods.addYears = function(years) {
	var newTime = new timeModel();

	newTime.hour = this.hour;
	newTime.day = this.day;
	newTime.month = this.month;
	newTime.year = this.year + years;

	return newTime;
};

timeSchema.methods.yearsAgo = function(otherTime) {
	return this.year - otherTime.year;
};

timeSchema.methods.isTheSameDayOfYear = function(otherTime) {
	if(this.day !== otherTime.day) {
		return false;
	}
	
	if(this.month != otherTime.month) {
		return false;
	}
	
	return true;
};

function load(callback) {
	timeModel.find({}, function(err, docs) {
		callback(docs);
	});
}

var timeModel = mongoose.model('time', timeSchema);

module.exports = {
	schema: timeSchema,
	time: timeModel,
	load: load
};