Array.prototype.findByKeyword = function(keyword) {
	var result = {};
	result.items = [];

	var item;

	if (keyword.indexOf(".") > -1) {
		var tokens = keyword.split(".");

		if (tokens[1].length === 0) {
			return result;
		}

		if (tokens[0].toLowerCase() === "all") {
			result.mode = 'all.item';
			result.token = tokens[1];
			result.items = this.findItems(tokens[1]);
		}
		else {
			result.mode = 'n.item';
			result.token = tokens[1];

			var itemNumber = parseInt(tokens[0], 10);
			
			if(isNaN(itemNumber)) {
				return result;
			}

			item = this.findItem(itemNumber, tokens[1]);

			if (item !== null) {
				result.items.push(item);
			}
		}
	}
	else {
		if (keyword.toLowerCase().trim() === 'all') {
			result.mode = 'all';
			result.token = '';
			result.items = this.findItems('all');
		}
		else {
			result.mode = '1.item';
			result.token = keyword;

			item = this.findItem(1, keyword);

			if (item !== null) {
				result.items.push(item);
			}
		}
	}

	return result;
};

Array.prototype.findItem = function(index, keyword) {
	if(isNaN(index)) {
		return null;
	}
	
	var counter = 0;

	for(var i = 0; i < this.length; i++) {
		if(this[i] !== null && this[i] !== undefined) {
			for(var j = 0; j < this[i].keywords.length; j++) {
				if(this[i].keywords[j].toLowerCase().substr(0, keyword.length) === keyword.toLowerCase()) {
					counter++;
					
					if(counter === index) {
						return this[i];
					}
					else {
						break;
					}
				}
			}
		}
	}

	return null;
};

Array.prototype.findItems = function(keyword) {
	var items = [];
	
	if(keyword.toLowerCase().trim() === 'all') {
		for(var i = 0; i < this.length; i++) {
			if(this[i] !== null && this[i] !== undefined) {
				items.push(this[i]);
			}
		}
	}
	else {
		for(var i = 0; i < this.length; i++) {
			if(this[i] !== null && this[i] !== undefined) {
				for(var j = 0; j < this[i].keywords.length; j++) {
					if(this[i].keywords[j].toLowerCase().substr(0, keyword.length) === keyword.toLowerCase()) {
						items.push(this[i]);
						break;
					}
				}
			}
		}
	}

	return items;
};

Array.prototype.containsItemById = function(id) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] !== null && this[i] !== undefined) {
			if(this[i].id === id) {
				return true;
			}
		}
	}
	
	return false;
};

Array.prototype.containsItemByType = function(type) {
	for(var i = 0; i < this.length; i++) {
		if(this[i].type === type) {
			return true;
		}
	}
	
	return false;
};

Array.prototype.total = function() {
	var total = 0;	
	
	for(var i = 0; i < this.length; i++) {
		total = total + parseInt(this[i], 10);
	}

	return total;
};

// Exports
module.exports = Array;
