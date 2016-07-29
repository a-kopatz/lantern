var constants = require('../constants');
var Time = require("../time").time;

exports.time_advanceHourIncrementsHour = function(test) {
    var currentTime = new Time();
    currentTime.hour = 12;
    currentTime.advanceHour();
    
    test.equal(currentTime.hour, 13);
    test.done();
};

exports.time_advanceHourIncrementsDay = function(test) {
    var currentTime = new Time();
    currentTime.hour = 23;
    currentTime.day = 4;
    currentTime.advanceHour();
    
    test.equal(currentTime.hour, 0);
    test.equal(currentTime.day, 5);
    test.done();
};

exports.time_advanceHourIncrementsMonth = function(test) {
    var currentTime = new Time();
    currentTime.hour = 23;
    currentTime.day = 30;
    currentTime.month = 4;
    currentTime.advanceHour();
    
    test.equal(currentTime.hour, 0);
    test.equal(currentTime.day, 1);
    test.equal(currentTime.month, 5);
    test.done();
};

exports.time_advanceHourIncrementsYear = function(test) {
    var currentTime = new Time();
    currentTime.hour = 23;
    currentTime.day = 31;
    currentTime.month = 12;
    currentTime.year = 200;
    currentTime.advanceHour();
    
    test.equal(currentTime.hour, 0);
    test.equal(currentTime.day, 1);
    test.equal(currentTime.month, 1);
    test.equal(currentTime.year, 201);
    test.done();
};

exports.time_getTimeOfDayWorksForEarlyTime = function(test) {
    var currentTime = new Time();
    currentTime.hour = 4;
    test.equal(currentTime.getTimeOfDay(), "morning");
    test.done();
};

exports.time_getTimeOfDayWorksForMiddayTime = function(test) {
    var currentTime = new Time();
    currentTime.hour = 14;
    test.equal(currentTime.getTimeOfDay(), "afternoon");
    test.done();
};

exports.time_getTimeOfDayWorksForLateTime = function(test) {
    var currentTime = new Time();
    currentTime.hour = 22;
    test.equal(currentTime.getTimeOfDay(), "evening");
    test.done();
};

exports.time_clockTimeBefore12Works = function(test) {
	var currentTime = new Time();
	currentTime.hour = 3;
	test.equal(currentTime.getClockTime(), 3);
	test.done();
};

exports.time_clockTimeMidnightWorks = function(test) {
	var currentTime = new Time();
	currentTime.hour = 0;
	test.equal(12, currentTime.getClockTime());
	test.done();
};

exports.time_clockTimeAfternoonWorks = function(test) {
	var currentTime = new Time();
	currentTime.hour = 15;
	test.equal(currentTime.getClockTime(), 3);
	test.done();
};

exports.time_getDayOfWeekReturnsSunday = function(test) {
	var currentTime = new Time();
	currentTime.day = 2;
	currentTime.month = 8;
	currentTime.year = 1953;
	var day = currentTime.getDayOfWeek();
	
	test.equal(day, "Sunday");
	test.done();
};

exports.time_getDayOfWeekReturnsMonday = function(test) {
	var currentTime = new Time();
	currentTime.day = 25;
	currentTime.month = 7;
	currentTime.year = 2016;
	var day = currentTime.getDayOfWeek();
	
	test.equal(day, "Monday");
	test.done();
};

exports.time_getDigitSuffixWorksForFirst = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(1);
	
	test.equal(x, "st");
	test.done();
};

exports.time_getDigitSuffixWorksForSecond = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(2);
	
	test.equal(x, "nd");
	test.done();
};

exports.time_getDigitSuffixWorksForThird = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(3);
	
	test.equal(x, "rd");
	test.done();
};

exports.time_getDigitSuffixWorksForFourth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(4);
	
	test.equal(x, "th");
	test.done();
};

exports.time_getDigitSuffixWorksForFifth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(5);

	test.equal(x, "th");
	test.done();
};

exports.time_getDigitSuffixWorksForTenth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(10);
	
	test.equal(x, "th");
	test.done();
};

exports.time_getDigitSuffixWorksForEleventh = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(11);
	
	test.equal(x, "th");
	test.done();
};

exports.time_getDigitSuffixWorksForTwelvfth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(12);
	
	test.equal(x, "th");
	test.done();
};

exports.time_getDigitSuffixWorksForTwentieth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(20);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffixWorksForTwentyFirst = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(21);
	
	test.equal(x, "st");
	test.done();
};

exports.time_getDigitSuffixWorksForTwentySecond = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(22);
	
	test.equal(x, "nd");
	test.done();
};

exports.time_getDigitSuffixWorksForTwentyThird = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(23);
	
	test.equal(x, "rd");
	test.done();
};

exports.time_getDigitSuffixWorksForTwentyFifth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(25);
	
	test.equal("th", x);
	test.done();
};

exports.time_getDigitSuffixWorksForThirtieth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(30);
	
	test.equal(x, "th");
	test.done();
};

exports.time_getDigitSuffixWorksForThirtyFirst = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(31);
	
	test.equal(x, "st");
	test.done();
};

exports.time_getDigitSuffixWorksForHundreth = function(test) {
	var currentTime = new Time();
	var x = currentTime.getDigitSuffix(100);
	
	test.equal(x, "th");
	test.done();
};

exports.time_getDisplayTimeReturnsAccurate_1 = function(test) {
	var currentTime = new Time();
	currentTime.hour = 1;
	currentTime.day = 1;
	currentTime.month = 1;
	currentTime.year = 2200;
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 1 o'clock in the morning on Wednesday.", day);
	test.done();
};

exports.time_getDisplayTimeReturnsAccurate_2 = function(test) {
	var currentTime = new Time();
	currentTime.hour = 17;
	currentTime.day = 2;
	currentTime.month = 1;
	currentTime.year = 2200;	
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 5 o'clock in the afternoon on Thursday.", day);
	test.done();
};

exports.time_getDisplayTimeReturnsAccurate_3 = function(test) {
	var currentTime = new Time();
	currentTime.hour = 22;
	currentTime.day = 3;
	currentTime.month = 1;
	currentTime.year = 2200;	
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 10 o'clock in the evening on Friday.", day);	
	test.done();
};

exports.time_getDisplayTimeReturnsAccurate_4 = function(test) {
	var currentTime = new Time();
	currentTime.hour = 0;
	currentTime.day = 4;
	currentTime.month = 1;
	currentTime.year = 2200;	
	var day = currentTime.getDisplayTime();
	
	test.equal("It is 12 o'clock in the morning on Saturday.", day);	
	test.done();
};

exports.time_getDisplayDateWorks_1 = function(test) {
	var currentTime = new Time();
	currentTime.day = 12;
	currentTime.month = 5;
	currentTime.year = 2263;
	var day = currentTime.getDisplayDate();
	
	test.equal("The 12th Day of May, Year 2263.", day);	
	test.done();
};

exports.time_getDisplayDateWorks_2 = function(test) {
	var currentTime = new Time();
	currentTime.day = 31;
	currentTime.month = 12;
	currentTime.year = 3184;
	var day = currentTime.getDisplayDate();
	
	test.equal("The 31st Day of December, Year 3184.", day);	
	test.done();
};

exports.time_getDisplayDateWorks_3 = function(test) {
	var currentTime = new Time();
	currentTime.day = 2;
	currentTime.month = 9;
	currentTime.year = 2687;
	var day = currentTime.getDisplayDate();
	
	test.equal("The 2nd Day of September, Year 2687.", day);	
	test.done();
};


