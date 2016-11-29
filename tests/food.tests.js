var Food = require('../items/food').food;

exports.food_hasCalories = function(test) {
    var newFood = new Food();
    newFood.calories = 300;
    test.equal(300, newFood.calories);
    test.done();
};