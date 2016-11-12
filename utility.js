
function randomNumber(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function oppositeDirection(direction) {
	switch(direction.toUpperCase()) {
		case "N":
			return "S";
		case "E":
			return "W";
		case "S":
			return "N";
		case "W":
			return "E";
		case "U":
			return "D";
		case "D":
			return "U";
	}
}

function getPaddedWord(word, numberOfCharacters) {
	while(word.length < numberOfCharacters) {
		word = word + " ";
	}
	
	return word;
}

function getFormattedLongString(originalString, startWithIndent) {
	var result = "";
	
	if(startWithIndent === true) {
		result = result + "    ";
	}
	
	var tokens = originalString.split(" ");
	var currentLineSize = 0;
	
	for(var i = 0; i < tokens.length; i++) {
		if(currentLineSize + tokens[i].length > 80) {
			result = result + "\n\r" + tokens[i];
			currentLineSize = 0;
		}
		else {
			result = result + " " + tokens[i];
		}
		
		currentLineSize = currentLineSize + tokens[i].length;
	}

	return result;
}

function getPastTenseOfWord(word) {
	switch(word.toUpperCase()) {
		case "OPEN":
			return "opened";
		case "CLOSE":
			return "closed";
	    case "LOCK":
	    	return "locked";
	    case "UNLOCK":
	    	return "unlocked";
	}
}

function getRandomSynonym(word) {
	switch(word.toUpperCase()) {
		case "EAT":
			var i = randomNumber(1, 5);
			switch(i) {
				case 1: return [ "eat", "eats" ];
				case 2: return [ "gobble up", "gobbles up" ];
				case 3: return [ "savagely devour", "savagely devours" ];
				case 4: return [ "gorge on", "gorges on" ];
				case 5: return [ "chow down on", "chows down on" ];
				case 6: return [ "pigs out on", "pigs out on" ];
				case 7: return [ "gobbles up", "gobbles up" ];
			}
			break;
	}
}

function getBmiDescription(bmi) {
	if(bmi < 18) {
		return "underweight";
	}
	
	if(bmi < 21) {
		return "skinny";
	}
	
	if(bmi < 25) {
		return "average";
	}
	
	if(bmi < 30) {
		return "overweight";
	}
	
	if(bmi < 40) {
		return "obese";
	}
	
	if(bmi < 45) {
		return "extremely obese";
	}
	
	return "morbidly obese";
}

function getHeightAdjective(gender, height) {
	if(gender === global.GENDER_MALE) {
		if(height < 60) {
			return "short";
		}
		else if(height < 66) {
			return "average";
		}
		else if(height < 72) {
			return "tall";
		}
		else {
			return "towering";
		}
	}
	else {
		if(height < 63) {
			return "short";
		}
		else if(height < 69) {
			return "average";
		}
		else if(height < 77) {
			return "tall";
		}
		else {
			return "towering";
		}
	}
}

function getDetailedBmiDescription(bmi) {
	if(bmi < 18) {
		return "nothing but skin and bones";
	}
	else if(bmi < 19) {
		return "very skinny";
	}
	else if(bmi < 21) {
		return "too skinny";
	}
	else if(bmi < 23) {
		return "very thin";
	}
	else if(bmi < 25) {
		return "average weight -- not fat or thin";
	}
	else if(bmi < 27) {
		return "slightly chubby";
	}
	else if(bmi < 28) {
		return "quite chubby";
	}
	else if(bmi < 30) {
		return "overweight";
	}
	else if(bmi < 32) {
		return "fat";
	}
	else if(bmi < 34) {
		return "very fat";
	}
	else if(bmi < 36) {
		return "extremely fat";
	}
	else if(bmi < 38) {
		return "enormously fat";
	}
	else if(bmi < 40) {
		return "obese";
	}
	else if(bmi < 42) {
		return "a huge pile of fat";
	}
	else if(bmi < 42) {
		return "a round, jiggly ball of fat";
	}
	else if(bmi < 45) {
		return "extremely obese";
	}
	else if(bmi < 50) {
		return "morbidly obese";
	}
	else {
		return "a huge, quivering mass of fat";
	}
}

function getHungerAdjective(fullnessIndex) {

	if(fullnessIndex === 0) {
		return "starving";
	}
	else if(fullnessIndex < 1) {
		return "hungry";
	}
	else if(fullnessIndex < 2) {
		return "satisfied";
	}
	else if(fullnessIndex < 3) {
		return "stuffed";
	}
	else if(fullnessIndex < 4) {
		return "completely overstuffed";
	}
	else if(fullnessIndex < 5) {
		return "ready to burst";
	}
	else {
		return "painfully overfull, stomach bloated and swollen";
	}
}

function getGenderNoun(gender) {
	if(gender === global.GENDER_MALE) {
		return "man";
	}
	else {
		return "woman";
	}
}

function getPositionDescription(position) {
	if(position === global.POS_STANDING) {
		return "is standing here.";
	}
	else if(position === global.POS_SITTING) {
		return "is sitting here.";
	}
	else if(position === global.POS_RESTING) {
		return "is resting here.";
	}
	else if(position === global.POS_SLEEPING) {
		return "is sleeping here.";
	}
	else if(position === global.POS_DEAD) {
		return "is lying here, dead.";
	}
}

function alreadyWearing(location) {
    switch(location) {
        case 0:
        	return "You're already using a light.";
        case 1:
        	return "YOU SHOULD NEVER SEE THIS MESSAGE.  PLEASE REPORT AS A BUG.";
        case 2:
        	return "You're already wearing something on both of your ring fingers.";
        case 3:
        	return "YOU SHOULD NEVER SEE THIS MESSAGE.  PLEASE REPORT AS A BUG.";
        case 4:
        	return "You can't wear anything else around your neck.";
        case 5:
        	return "You're already wearing something on your body.";
        case 6:
        	return "You're already wearing something on your head.";
        case 7:
        	return "You're already wearing something on your legs.";
        case 8:
        	return "You're already wearing something on your feet.";
        case 9:
        	return "You're already wearing something on your hands.";
        case 10:
        	return "You're already wearing something on your arms.";
        case 11:
        	return "You're already using a shield.";
        case 12:
        	return "You're already wearing something about your body.";
        case 13:
        	return "You're already wearing something around your waist.";
        case 14:
        	return "YOU SHOULD NEVER SEE THIS MESSAGE.  PLEASE REPORT AS A BUG.";
        case 15:
        	return "You're already wearing something around both of your wrists.";
        case 16:
        	return "You're already wielding a weapon.";
        case 17:
        	return "You're already holding something.";
    }
}

function wearMessage(location) {
	var messages = [];
	
	switch(location) {
		case 0:
			messages[0] = "You light FIRST_OBJECT_SHORTDESC and hold it.";
			messages[1] = "ACTOR_NAME lights FIRST_OBJECT_SHORTDESC and holds it.";
			break;
		case 1:
			messages[0] = "You slide FIRST_OBJECT_SHORTDESC onto your right ring finger.";
			messages[1] = "ACTOR_NAME slides FIRST_OBJECT_SHORTDESC onto ACTOR_PRONOUN_POSSESSIVE right ring finger.";
			break;
		case 2:
			messages[0] = "You slide FIRST_OBJECT_SHORTDESC onto your left ring finger.";
			messages[1] = "ACTOR_NAME slides FIRST_OBJECT_SHORTDESC onto ACTOR_PRONOUN_POSSESSIVE left ring finger.";
			break;
		case 3:
		case 4:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC around your neck.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE neck.";
			break;
		case 5:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC on your body.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE body.";
			break;
		case 6:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC on your head.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE head.";
			break;
		case 7:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC on your legs.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE legs.";
			break;
		case 8:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC on your feet.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE feet.";
			break;
		case 9:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC on your hands.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE hands.";
			break;
		case 10:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC on your arms.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE arms.";
			break;
		case 11:
			messages[0] = "You start to use FIRST_OBJECT_SHORTDESC as a shield.";
			messages[1] = "ACTOR_NAME straps FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE arm as a shield.";
			break;
		case 12:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC around your body.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC about ACTOR_PRONOUN_POSSESSIVE body.";
			break;
		case 13:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC around your waist.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE waist.";
			break;
		case 14:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC around your right wrist.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE right wrist.";
			break;
		case 15:
			messages[0] = "You wear FIRST_OBJECT_SHORTDESC around your left wrist.";
			messages[1] = "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE left wrist.";
			break;
		case 16:
			messages[0] = "You wield FIRST_OBJECT_SHORTDESC.";
			messages[1] = "ACTOR_NAME wields FIRST_OBJECT_SHORTDESC.";
			break;
		case 17:
			messages[0] = "You grab FIRST_OBJECT_SHORTDESC.";
			messages[1] = "ACTOR_NAME grabs FIRST_OBJECT_SHORTDESC.";
			break;
	}
	
	return messages;
}

function buildItemMap(character, itemArray, itemType, quantity, breakCondition, verb, notRightTypeMessage) {
	var itemMap = new Map();
    var brokenLoop = false;
	var wrongTypeMessages = [];
	var mapItems = [];

	for(var i = 0; i < itemArray.length; i++) {
	    if(i >= quantity) {
	        break;
	    }
	    
		if((itemType !== null) && (itemArray[i] instanceof itemType) === false) { 
			wrongTypeMessages.push(itemArray[i].shortDescription + " -- " + notRightTypeMessage);
    	}
    	else {
    		if(breakCondition(character, mapItems) === true) {
    			brokenLoop = true;
    			break;
    		}
    		else {
	            if(itemMap.has(itemArray[i].id)) {
	                itemMap.set(itemArray[i].id, 
	                    { 
	                        quantity: itemMap.get(itemArray[i].id).quantity + 1, 
	                        singular: itemArray[i].getShortDescription(),
	                        plural: itemArray[i].getPluralDescription()
	                    } );
	            }
	            else {
	                itemMap.set(itemArray[i].id, 
	                    { 
	                        quantity: 1, 
	                        singular: itemArray[i].getShortDescription(),
	                        plural: itemArray[i].getPluralDescription() 
	                    } );
	            }
	            
	            mapItems.push(itemArray[i]);
    		}
    	}
	}

	var output = '';
	
	var first = true;

    for (var value of itemMap.values()) {
    	if(first === false) {
    		output = output + " and ";
    	}
    	
    	first = false;
    	
    	if(value.quantity > 1) {
    		output = output + value.quantity + " " + value.plural;
    	}
    	else {
    		output = output + value.singular;
    	}
    }

	return {
		map: itemMap,
		brokenLoop: brokenLoop,
		wrongTypeMessages: wrongTypeMessages,
		mapItems: mapItems,
		output: output
	};
}

exports.randomNumber = randomNumber;
exports.oppositeDirection = oppositeDirection;
exports.getBmiDescription = getBmiDescription;
exports.getDetailedBmiDescription = getDetailedBmiDescription;
exports.getHeightAdjective = getHeightAdjective;
exports.getGenderNoun = getGenderNoun;
exports.getHungerAdjective = getHungerAdjective;
exports.getFormattedLongString = getFormattedLongString;
exports.getPastTenseOfWord = getPastTenseOfWord;
exports.getRandomSynonym = getRandomSynonym;
exports.getPositionDescription = getPositionDescription;
exports.getPaddedWord = getPaddedWord;
exports.alreadyWearing = alreadyWearing;
exports.wearMessage = wearMessage;
exports.buildItemMap = buildItemMap;
