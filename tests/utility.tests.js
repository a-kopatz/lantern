var utility = require('../utility');

exports.utility_randomNumberWorksForOne = function(test) {
    var random = utility.randomNumber(1, 1);
    test.equal(random, 1);
    test.done();
};

exports.utility_randomNumberNeverExceedsBoundaries = function(test) {
    var minimum = 11;
    var maximum = 0;
    
    for(var i = 0; i < 500; i++) {
        var random = utility.randomNumber(1, 10);
        
        if(random > maximum) {
            maximum = random;
        }
        
        if(random < minimum) {
            minimum = random;
        }
    }
    
    test.equal(minimum, 1);
    test.equal(maximum, 10);
    test.done();
};

exports.utility_randomNumberShouldProduceAtLeastOneOfEachValue = function(test) {
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    
    for(var i = 0; i < 500; i++) {
        var random = utility.randomNumber(1, 3);
        
        switch(random) {
            case 1:
                count1++;
                break;
            case 2:
                count2++;
                break;
            case 3:
                count3++;
                break;
        }
    }

    test.equal((count1 > 0), true);
    test.equal((count2 > 0), true);
    test.equal((count3 > 0), true);
    test.done();
};

exports.utility_oppositeDirection = function(test) {
    test.equal("S", utility.oppositeDirection("N"));
    test.equal("N", utility.oppositeDirection("S"));
    test.equal("W", utility.oppositeDirection("E"));
    test.equal("E", utility.oppositeDirection("W"));
    test.equal("D", utility.oppositeDirection("U"));
    test.equal("U", utility.oppositeDirection("D"));
    test.done();
};