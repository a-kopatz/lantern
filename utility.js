
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

exports.randomNumber = randomNumber;
exports.oppositeDirection = oppositeDirection;
exports.getBmiDescription = getBmiDescription;
exports.getFormattedLongString = getFormattedLongString;
exports.getPastTenseOfWord = getPastTenseOfWord;
exports.alreadyWearing = alreadyWearing;
exports.wearMessage = wearMessage;