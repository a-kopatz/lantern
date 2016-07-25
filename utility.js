
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

function getBmiDescription(bmi) {
	if(bmi < 18) {
		return "underweight";
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

exports.randomNumber = randomNumber;
exports.oppositeDirection = oppositeDirection;
exports.getBmiDescription = getBmiDescription;
exports.getFormattedLongString = getFormattedLongString;