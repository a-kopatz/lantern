var Character = require("../character").character;
var Room = require("../room").room;
var Exit = require("../room").exit;
var Item = require('../item').item;
var Clothes = require('../clothes').clothes;
var World = require('../world');

///////////////////////////////////////////////////////////

exports.character_wearObjectAsLightWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a torch";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_LIGHT);
    test.equal(result[0], "You light FIRST_OBJECT_SHORTDESC and hold it.");
    test.equal(result[1], "ACTOR_NAME lights FIRST_OBJECT_SHORTDESC and holds it.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_LIGHT], myItem);
    test.done();
};

exports.character_wearObjectAsLightReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a torch";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a lantern";
    actor.wearing[global.WEAR_LIGHT] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_LIGHT);
    test.equal(result, "You're already using a light.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_LIGHT], myOtherItem);
    test.done();
};

exports.character_wearObjectAsRightRingWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_FINGER_R);
    test.equal(result[0], "You slide FIRST_OBJECT_SHORTDESC onto your right ring finger.");
    test.equal(result[1], "ACTOR_NAME slides FIRST_OBJECT_SHORTDESC onto ACTOR_PRONOUN_POSSESSIVE right ring finger.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FINGER_R], myItem);
    test.done();
};

exports.character_wearObjectAsLeftRingWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_FINGER_L);
    test.equal(result[0], "You slide FIRST_OBJECT_SHORTDESC onto your left ring finger.");
    test.equal(result[1], "ACTOR_NAME slides FIRST_OBJECT_SHORTDESC onto ACTOR_PRONOUN_POSSESSIVE left ring finger.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myItem);
    test.done();
};

exports.character_wearObjectAsLeftRingReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a jade ring";
    actor.wearing[global.WEAR_FINGER_L] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a ruby ring";
    actor.wearing[global.WEAR_FINGER_R] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_FINGER_L);
    test.equal(result, "You're already wearing something on both of your ring fingers.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_FINGER_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsRightRingReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a jade ring";
    actor.wearing[global.WEAR_FINGER_L] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a ruby ring";
    actor.wearing[global.WEAR_FINGER_R] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_FINGER_R);
    test.equal(result, "You're already wearing something on both of your ring fingers.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_FINGER_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsRightRingSwitchesWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a gold ring";
    actor.inventory.push(myItem);

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a ruby ring";
    actor.wearing[global.WEAR_FINGER_R] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_FINGER_R);
    test.equal(result[0], "You slide FIRST_OBJECT_SHORTDESC onto your left ring finger.");
    test.equal(result[1], "ACTOR_NAME slides FIRST_OBJECT_SHORTDESC onto ACTOR_PRONOUN_POSSESSIVE left ring finger.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FINGER_L], myItem);
    test.done();
};

exports.character_wearObjectAsNeck1Works = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_NECK_1);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your neck.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE neck.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_NECK_1], myItem);
    test.done();
};

exports.character_wearObjectAsNeck2Works = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_NECK_2);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your neck.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE neck.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_NECK_2], myItem);
    test.done();
};

exports.character_wearObjectAsNeck1ReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);

    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a gold charm";
    actor.wearing[global.WEAR_NECK_1] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a silver charm";
    actor.wearing[global.WEAR_NECK_2] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_NECK_1);
    test.equal(result, "You can't wear anything else around your neck.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_NECK_1], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_NECK_2], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsNeck2ReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);

    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a gold charm";
    actor.wearing[global.WEAR_NECK_1] = myOtherItem1;

    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a silver charm";
    actor.wearing[global.WEAR_NECK_2] = myOtherItem2;

    var result = actor.wearObject(myItem, global.WEAR_NECK_2);
    test.equal(result, "You can't wear anything else around your neck.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_NECK_1], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_NECK_2], myOtherItem2);
    test.done();
};

exports.character_wearObjectAsNeck1SwitchesToNeck2WhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silver pendant";
    actor.inventory.push(myItem);

    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a gold charm";
    actor.wearing[global.WEAR_NECK_1] = myOtherItem1;

    var result = actor.wearObject(myItem, global.WEAR_NECK_1);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your neck.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE neck.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_NECK_2], myItem);
    test.done();
};

exports.character_wearObjectOnBodyWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "some leather armor";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_BODY);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC on your body.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE body.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_BODY], myItem);
    test.done();
};

exports.character_wearObjectOnBodyReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "some leather armor";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "some sweet pajamas";
    actor.wearing[global.WEAR_BODY] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_BODY);
    test.equal(result, "You're already wearing something on your body.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_BODY], myOtherItem);
    test.done();
};

exports.character_wearObjectOnHeadWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silly hat";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_HEAD);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC on your head.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE head.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HEAD], myItem);
    test.done();
};

exports.character_wearObjectOnHeadReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a silly hat";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a cool hat";
    actor.wearing[global.WEAR_HEAD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_HEAD);
    test.equal(result, "You're already wearing something on your head.");
    test.equal(actor.inventory.length, 1);
    test.equal(actor.wearing[global.WEAR_HEAD], myOtherItem);
    test.done();
};

exports.character_wearObjectOnLegsWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "jeans";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_LEGS);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC on your legs.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE legs.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_LEGS], myItem);
    test.done();
};

exports.character_wearObjectOnLegsReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "jeans";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "khakis";
    actor.wearing[global.WEAR_LEGS] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_LEGS);
    test.equal(result, "You're already wearing something on your legs.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_LEGS], myOtherItem);
    test.done();
};

exports.character_wearObjectOnFeetWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Air Jordans";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_FEET);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC on your feet.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_FEET], myItem);
    test.done();
};

exports.character_wearObjectOnFeetReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Air Jordans";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "loafers";
    actor.wearing[global.WEAR_FEET] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_FEET);
    test.equal(result, "You're already wearing something on your feet.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_FEET], myOtherItem);
    test.done();
};

exports.character_wearObjectOnHandsWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "wooly mittens";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_HANDS);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC on your hands.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE hands.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HANDS], myItem);
    test.done();
};

exports.character_wearObjectOnHandsReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "wooly mittens";
    actor.inventory.push(myItem);

    var myOtherItem = new Item();
    myOtherItem.shortDescription = "swordsmen's gloves";
    actor.wearing[global.WEAR_HANDS] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_HANDS);
    test.equal(result, "You're already wearing something on your hands.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_HANDS], myOtherItem);
    test.done();
};

exports.character_wearObjectOnArmsWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "leather sleeves";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_ARMS);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC on your arms.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE arms.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_ARMS], myItem);
    test.done();
};

exports.character_wearObjectOnArmsReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    actor.gender = global.GENDER_MALE;
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "leather sleeves";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "mithril sleeves";
    actor.wearing[global.WEAR_ARMS] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_ARMS);
    test.equal(result, "You're already wearing something on your arms.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_ARMS], myOtherItem);
    test.done();
};

exports.character_wearObjectAsShieldWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "an iron shield";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_SHIELD);
    test.equal(result[0], "You start to use FIRST_OBJECT_SHORTDESC as a shield.");
    test.equal(result[1], "ACTOR_NAME straps FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE arm as a shield.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_SHIELD], myItem);
    test.done();
};

exports.character_wearObjectAsShieldReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "an iron shield";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a wooden shield";
    actor.wearing[global.WEAR_SHIELD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_SHIELD);
    test.equal(result, "You're already using a shield.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_SHIELD], myOtherItem);
    test.done();
};

exports.character_wearObjectAboutBodyWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a cloak";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_ABOUT);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your body.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC about ACTOR_PRONOUN_POSSESSIVE body.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_ABOUT], myItem);
    test.done();
};

exports.character_wearObjectAboutBodyReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a cloak";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a unicorn hide";
    actor.wearing[global.WEAR_ABOUT] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_ABOUT);
    test.equal(result, "You're already wearing something about your body.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_ABOUT], myOtherItem);
    test.done();
};

exports.character_wearObjectAroundWaistWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Batman's Utility Belt";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WAIST);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your waist.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE waist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WAIST], myItem);
    test.done();
};

exports.character_wearObjectAroundWaistReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "Batman's Utility Belt";
    actor.inventory.push(myItem);

    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a leather belt";
    actor.wearing[global.WEAR_WAIST] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_WAIST);
    test.equal(result, "You're already wearing something around your waist.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WAIST], myOtherItem);
    test.done();
};

exports.character_wearObjectOnRightWristWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_R);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your right wrist.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE right wrist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myItem);
    test.done();
};

exports.character_wearObjectOnLeftWristWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "an ebony bracelet";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_L);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your left wrist.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE left wrist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myItem);
    test.done();
};

exports.character_wearObjectOnRightWristReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a bracelet";
    actor.wearing[global.WEAR_WRIST_L] = myOtherItem1;
    
    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a rubber band";
    actor.wearing[global.WEAR_WRIST_R] = myOtherItem2;
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_R);
    test.equal(result, "You're already wearing something around both of your wrists.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectOnLeftWristReturnsErrorWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var myOtherItem1 = new Item();
    myOtherItem1.shortDescription = "a bracelet";
    actor.wearing[global.WEAR_WRIST_L] = myOtherItem1;
    
    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a rubber band";
    actor.wearing[global.WEAR_WRIST_R] = myOtherItem2;
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_L);
    test.equal(result, "You're already wearing something around both of your wrists.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myOtherItem1);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectOnRightWristSwitchesWhenAlreadyWearing = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a watch";
    actor.inventory.push(myItem);
    
    var myOtherItem2 = new Item();
    myOtherItem2.shortDescription = "a rubber band";
    actor.wearing[global.WEAR_WRIST_R] = myOtherItem2;
    
    var result = actor.wearObject(myItem, global.WEAR_WRIST_R);
    test.equal(result[0], "You wear FIRST_OBJECT_SHORTDESC around your left wrist.");
    test.equal(result[1], "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC around ACTOR_PRONOUN_POSSESSIVE left wrist.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WRIST_L], myItem);
    test.equal(actor.wearing[global.WEAR_WRIST_R], myOtherItem2);
    test.done();
};

exports.character_wearObjectWieldWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a huge friggin battleaxe";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_WIELD);
    test.equal(result[0], "You wield FIRST_OBJECT_SHORTDESC.");
    test.equal(result[1], "ACTOR_NAME wields FIRST_OBJECT_SHORTDESC.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_WIELD], myItem);
    test.done();
};

exports.character_wearObjectWieldReturnsErrorWhenAlreadyWielding = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a huge friggin battleaxe";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a board with a rusty nail in it";
    actor.wearing[global.WEAR_WIELD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_WIELD);
    test.equal(result, "You're already wielding a weapon.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_WIELD], myOtherItem);
    test.done();
};

exports.character_wearObjectHeldWorks = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a clear stone";
    actor.inventory.push(myItem);
    
    var result = actor.wearObject(myItem, global.WEAR_HOLD);
    test.equal(result[0], "You grab FIRST_OBJECT_SHORTDESC.");
    test.equal(result[1], "ACTOR_NAME grabs FIRST_OBJECT_SHORTDESC.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HOLD], myItem);
    test.done();
};

exports.character_wearObjectHeldReturnsErrorWhenAlreadyHolding = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var myItem = new Item();
    myItem.shortDescription = "a clear stone";
    actor.inventory.push(myItem);
    
    var myOtherItem = new Item();
    myOtherItem.shortDescription = "a red stone";
    actor.wearing[global.WEAR_HOLD] = myOtherItem;
    
    var result = actor.wearObject(myItem, global.WEAR_HOLD);
    test.equal(result, "You're already holding something.");
    test.equal(actor.inventory[0], myItem);
    test.equal(actor.wearing[global.WEAR_HOLD], myOtherItem);
    test.done();
};

exports.character_wearItemWearsItem = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var hat = new Clothes();
    hat.keywords.push("hat");
    hat.shortDescription = "a hat";
    hat.wearSlots.push(global.WEAR_HEAD);
    actor.inventory.push(hat);

    var output = actor.wearItem("hat");
    test.equal(output.toActor[0].text, "You wear FIRST_OBJECT_SHORTDESC on your head.");
    test.equal(output.toRoom[0].textArray[0].text, "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE head.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HEAD], hat);
    test.done();
};

exports.character_wearItemReturnsErrorWhenItemNotFound = function(test) {
    var myWorld = new World();
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);
    myWorld.addCharacter(actor);
    
    var output = actor.wearItem("hat");
    test.equal(output.toActor[0].text, "Wear what?!?");
    test.done();
};

exports.character_wearItemReturnsErrorWhenItemIsNotWearable = function(test) {
    var actor = new Character();

    var hat = new Item();
    hat.keywords.push("hat");
    hat.shortDescription = "a hat";
    hat.wearSlots = [];
    actor.inventory.push(hat);

    var output = actor.wearItem("hat");
    test.equal(output.toActor[0].text, "You can't wear FIRST_OBJECT_SHORTDESC.");
    test.equal(actor.inventory[0], hat);
    test.done();
};

exports.character_wearItemWearsAllItems = function(test) {
    var myRoom = new Room();
        
    var actor = new Character();
    myRoom.addCharacter(actor);

    var hat = new Clothes();
    hat.keywords.push("hat");
    hat.shortDescription = "a hat";
    hat.wearSlots.push(global.WEAR_HEAD);
    actor.inventory.push(hat);

    var shoes = new Clothes();
    shoes.keywords.push("shoes");
    shoes.shortDescription = "shoes";
    shoes.wearSlots.push(global.WEAR_FEET);
    actor.inventory.push(shoes);

    var shirt = new Clothes();
    shirt.keywords.push("shirt");
    shirt.shortDescription = "a shirt";
    shirt.wearSlots.push(global.WEAR_BODY);
    actor.inventory.push(shirt);

    var output = actor.wearItem("all");
    test.equal(output.toActor[0].text, "You wear FIRST_OBJECT_SHORTDESC on your head.");
    test.equal(output.toRoom[0].textArray[0].text, "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE head.");
    test.equal(output.toActor[1].text, "You wear FIRST_OBJECT_SHORTDESC on your feet.");
    test.equal(output.toRoom[1].textArray[0].text, "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE feet.");
    test.equal(output.toActor[2].text, "You wear FIRST_OBJECT_SHORTDESC on your body.");
    test.equal(output.toRoom[2].textArray[0].text, "ACTOR_NAME wears FIRST_OBJECT_SHORTDESC on ACTOR_PRONOUN_POSSESSIVE body.");
    test.equal(actor.inventory.length, 0);
    test.equal(actor.wearing[global.WEAR_HEAD], hat);
    test.equal(actor.wearing[global.WEAR_FEET], shoes);
    test.equal(actor.wearing[global.WEAR_BODY], shirt);
    test.done();
};

///////////////////////////////////////////////////////////

// TODO: Test 'remove'



