global.CON_PLAYING    = 0;
global.CON_GET_NAME   = 2; // By what name ..?
global.CON_NAME_CNFRM = 3; // Did I get that right, x?
global.CON_PASSWORD   = 4; // Password:
global.CON_NEWPASSWD  = 5; // Give me a password for x
global.CON_CNFPASSWD  = 6; // Please retype password:
global.CON_QSEX       = 7; // Sex?
global.CON_QCLASS     = 8; // Class?
global.CON_RMOTD      = 9;
global.CON_MENU       = 10;
global.CON_BLOCKED    = 999; // Input is ignored; waiting for async server process

global.GENDER_NEUTRAL = 0;
global.GENDER_MALE    = 1;
global.GENDER_FEMALE  = 2;

global.CATEGORY_PLAYER = 0;
global.CATEGORY_NPC    = 1;
global.CATEGORY_ITEM   = 2;
global.CATEGORY_EXTRA  = 3;

global.START_ROOM    = 3001;
global.DONATION_ROOM = 3063;

global.PULSE_NPC      = 10;   // 10 real seconds
global.PULSE_MUD_HOUR = 60;   // 60 real seconds

global.HOURLY_DOLLAR_BONUS = 1000;

global.PRICE_OF_STAMP = 1;

global.CALORIES_TO_GAIN_ONE_POUND = 5000;

global.MAX_INVENTORY_LENGTH = 30;

global.SCMD_NORTH	= "N";
global.SCMD_EAST	= "E";
global.SCMD_SOUTH	= "S";
global.SCMD_WEST	= "W";
global.SCMD_UP		= "U";
global.SCMD_DOWN	= "D";

global.daysOfTheWeek = [ 
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

global.monthNames = [
	"",
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

global.getDirection = function(direction) {
	switch(direction.toLowerCase()) {
		case "n":
			return "north";
		case "e":
			return "east";
		case "s":
			return "south";
		case "w":
			return "west";
		case "u":
			return "up";
		case "d":
			return "down";
	}
};

global.WEAR_LIST = [ "light", 
                     "finger", 
                     "NOTUSED", 
                     "neck", 
                     "NOTUSED", 
                     "body", 
                     "head", 
                     "feet", 
                     "hands", 
                     "arms", 
                     "shield", 
                     "about", 
                     "waist", 
                     "wrist", 
                     "NOTUSED", 
                     "wield", 
                     "hold" ];

global.SCMD_HOLLER  = 0;
global.SCMD_SHOUT   = 1;
global.SCMD_GOSSIP  = 2;
global.SCMD_AUCTION = 3;
global.SCMD_GRATZ   = 4;
global.SCMD_QSAY    = 5;

global.POS_DEAD       = 0;
global.POS_MORTALLYW  = 1;
global.POS_INCAP      = 2;
global.POS_STUNNED    = 3;
global.POS_SLEEPING   = 4;
global.POS_RESTING    = 5;
global.POS_SITTING    = 6;
global.POS_FIGHTING   = 7;
global.POS_STANDING   = 8;

global.ITEM_LIGHT = "Light";
global.ITEM_SCROLL = "Scroll";
global.ITEM_WAND = "Wand";
global.ITEM_STAFF = "Staff";
global.ITEM_WEAPON = "Weapon";
global.ITEM_TREASURE = "Treasure";
global.ITEM_ARMOR = "Armor";
global.ITEM_POTION = "Potion";
global.ITEM_OTHER = "Other";
global.ITEM_TRASH = "Trash";
global.ITEM_CONTAINER = "Container";
global.ITEM_NOTE = "Note";
global.ITEM_DRINKCONTAINER = "DrinkContainer";
global.ITEM_KEY = "Key";
global.ITEM_FOOD  = "Food";
global.ITEM_MONEY = "Money";
global.ITEM_PEN = "Pen";
global.ITEM_BOAT = "Boat";
global.ITEM_FOUNTAIN = "Fountain";
global.ITEM_CORPSE = "Corpse";
global.ITEM_BANK = "Bank";
global.ITEM_BULLETINBOARD = "Board";
global.ITEM_CLOTHES = "Clothes";
global.ITEM_SHIRT = "Shirt";
global.ITEM_SHIRT = "Pants";
global.ITEM_SCALE = "Scale";


global.MESSAGE_BUG = "Please report this using the 'bug' command.";
global.CANNOT_DO_THAT_HERE = "Sorry, but you can't do that here.";

global.SCMD_OPENDOOR   = 0;
global.SCMD_CLOSEDOOR  = 1;

global.SCMD_LOCKDOOR   = 0;
global.SCMD_UNLOCKDOOR  = 1;

global.SCMD_ACCUSE     = 0;
global.SCMD_APPLAUD    = 1;
global.SCMD_BEG        = 2;
global.SCMD_BLEED      = 3;
global.SCMD_BLUSH      = 4;
global.SCMD_BOUNCE     = 5;
global.SCMD_BOW        = 6;
global.SCMD_BRB        = 7;
global.SCMD_BURP       = 8;
global.SCMD_CACKLE     = 9;
global.SCMD_CHUCKLE    = 10;
global.SCMD_CLAP       = 11;
global.SCMD_COMB       = 12;
global.SCMD_COMFORT    = 13;
global.SCMD_COUGH      = 14;
global.SCMD_CRINGE     = 15;
global.SCMD_CRY        = 16;
global.SCMD_CUDDLE     = 17;
global.SCMD_CURSE      = 18;
global.SCMD_CURTSEY    = 19;
global.SCMD_DANCE      = 20;
global.SCMD_DAYDREAM   = 21;
global.SCMD_DROOL      = 22;
global.SCMD_EMBRACE    = 23;
global.SCMD_FART       = 24;
global.SCMD_FLIP       = 25;
global.SCMD_FLIRT      = 26;
global.SCMD_FONDLE     = 27;
global.SCMD_FRENCH     = 28;
global.SCMD_FROWN      = 29;
global.SCMD_FUME       = 30;
global.SCMD_GASP       = 31;
global.SCMD_GIGGLE     = 32;
global.SCMD_GLARE      = 33;
global.SCMD_GREET      = 34;
global.SCMD_GRIN       = 35;
global.SCMD_GROAN      = 36;
global.SCMD_GROPE      = 37;
global.SCMD_GROVEL     = 38;
global.SCMD_GROWL      = 39;
global.SCMD_HICCUP     = 40;
global.SCMD_HUG        = 41;
global.SCMD_KISS       = 42;
global.SCMD_LAUGH      = 43;
global.SCMD_LICK       = 44;
global.SCMD_LOVE       = 45;
global.SCMD_MASSAGE    = 46;
global.SCMD_MOAN       = 47;
global.SCMD_NIBBLE     = 48;
global.SCMD_NOD        = 49;
global.SCMD_NUDGE      = 50;
global.SCMD_NUZZLE     = 51;
global.SCMD_PAT        = 52;
global.SCMD_PEER       = 53;
global.SCMD_POINT      = 54;
global.SCMD_POKE       = 55;
global.SCMD_PONDER     = 56;
global.SCMD_POUT       = 57;
global.SCMD_PRAY       = 58;
global.SCMD_PUNCH      = 59;
global.SCMD_PURR       = 60;
global.SCMD_ROLL       = 61;
global.SCMD_RUFFLE     = 62;
global.SCMD_SCREAM     = 63;
global.SCMD_SHAKE      = 64;
global.SCMD_SHIVER     = 65;
global.SCMD_SHRUG      = 66;
global.SCMD_SIGH       = 67;
global.SCMD_SLAP       = 68;
global.SCMD_SMILE      = 69;
global.SCMD_SMIRK      = 70;
global.SCMD_SNAP       = 71;
global.SCMD_SNARL      = 72;
global.SCMD_SNEEZE     = 73;
global.SCMD_SNICKER    = 74;
global.SCMD_SNIFF      = 75;
global.SCMD_SNORE      = 76;
global.SCMD_SNUGGLE    = 77;
global.SCMD_SPANK      = 78;
global.SCMD_SPIT       = 79;
global.SCMD_SQUEEZE    = 80;
global.SCMD_STARE      = 81;
global.SCMD_STEAM      = 82;
global.SCMD_STRUT      = 83;
global.SCMD_SULK       = 84;
global.SCMD_TACKLE     = 85;
global.SCMD_TANGO      = 86;
global.SCMD_TAUNT      = 87;
global.SCMD_THANK      = 88;
global.SCMD_THINK      = 89;
global.SCMD_TICKLE     = 90;
global.SCMD_TWIDDLE    = 91;
global.SCMD_WAVE       = 92;
global.SCMD_WHINE      = 93;
global.SCMD_WHISTLE    = 94,
global.SCMD_WIGGLE     = 95;
global.SCMD_WINK       = 96;
global.SCMD_WORSHIP    = 97;
global.SCMD_YAWN       = 98;
global.SCMD_YODEL      = 99;

global.MAX_WEARS = 18;

global.WEAR_WHERE = [
    "  <used as light>      ",
    "  <worn on finger>     ",
    "  <worn on finger>     ",
    "  <worn around neck>   ",
    "  <worn around neck>   ",
    "  <worn on body>       ",
    "  <worn on head>       ",
    "  <worn on legs>       ",
    "  <worn on feet>       ",
    "  <worn on hands>      ",
    "  <worn on arms>       ",
    "  <worn as shield>     ",
    "  <worn about body>    ",
    "  <worn about waist>   ",
    "  <worn around wrist>  ",
    "  <worn around wrist>  ",
    "  <wielded>            ",
    "  <held>               "
  ];
  
global.WEAR_LIGHT    =  0;
global.WEAR_FINGER_R =  1;
global.WEAR_FINGER_L =  2;
global.WEAR_NECK_1   =  3;
global.WEAR_NECK_2   =  4;
global.WEAR_BODY     =  5;
global.WEAR_HEAD     =  6;
global.WEAR_LEGS     =  7;
global.WEAR_FEET     =  8;
global.WEAR_HANDS    =  9;
global.WEAR_ARMS     = 10;
global.WEAR_SHIELD   = 11;
global.WEAR_ABOUT    = 12;
global.WEAR_WAIST    = 13;
global.WEAR_WRIST_R  = 14;
global.WEAR_WRIST_L  = 15;
global.WEAR_WIELD    = 16;
global.WEAR_HOLD     = 17;

// global.SCMD_EAT    = 0;
// global.SCMD_TASTE  = 1;

// global.SCMD_DRINK = 0;
// global.SCMD_SIP   = 1;

global.DRINKS = [
	{ name: "water", color: "clear", drunkness: 0, thirst: 10 },
	{ name: "beer", color: "brown", drunkness: 3, thirst: 5 },
	{ name: "wine", color: "clear", drunkness: 5, thirst: 5 },
	{ name: "ale", color: "brown", drunkness: 2, thirst: 5 },
	{ name: "dark ale", color: "dark", drunkness: 1, thirst: 5 },
	{ name: "whisky", color: "golden", drunkness: 6, thirst: 4 },
	{ name: "lemonade", color: "yellow", drunkness: 0, thirst: 8 },
	{ name: "firebreather", color: "red", drunkness: 10, thirst: 0 },
	{ name: "local speciality", color: "clear", drunkness: 3, thirst: 3 },
	{ name: "slime mold juice", color: "light green", drunkness: 0, thirst: -8 },
	{ name: "milk", color: "white", drunkness: 0, thirst: 6 },
	{ name: "tea", color: "brown", drunkness: 0, thirst: 6 },
	{ name: "coffee", color: "black", drunkness: 0, thirst: 6 },
	{ name: "blood", color: "red", drunkness: 0, thirst: -1 },
	{ name: "salt water", color: "clear", drunkness: 0, thirst: -4 },
	{ name: "clear water", color: "crystal clear", drunkness: 0, thirst: 13 }
];

global.FULLNESS = [
	[ "You are starving.", "ACTOR_NAME looks extremely hungry." ], 
	[ "You are satisfied.", "ACTOR_NAME looks satisfied." ], 
	[ "You are full.", "ACTOR_NAME looks full." ], 
	[ "You are very full.", "ACTOR_NAME looks very full." ], 
	[ "You are extremely full.", "ACTOR_NAME looks extremely full." ], 
	[ "You are uncomfortably full!", "ACTOR_NAME looks uncomfortably full!" ], 
	[ "You are absurdly full -- your belly hurts!", "ACTOR_NAME appears to have a bellyache!" ], 
	[ "You are completely STUFFED.", "ACTOR_NAME looks completely STUFFED." ], 
	[ "You are INSANELY STUFFED!", "ACTOR_NAME looks INSANE STUFFED." ], 
	[ "You are at your maximum fullness!", "ACTOR_NAME appears to have reached ACTOR_PRONOUN_POSSESSIVE maximum fullness!" ], 
	[ "You are BEYOND your maximum fullness!!", "ACTOR_NAME appears stuffed BEYOND ACTOR_PRONOUN_POSSESSIVE maximum fullness!" ], 
	[ "You are completely overstuffed and sweating!!!", "ACTOR_NAME looks overstuffed and starts sweating!!!" ], 
	[ "You are so full that you can HARDLY BREATHE!!!!", "ACTOR_NAME looks so full ACTOR_PRONOUN_SUBJECT can HARDLY BREATE!!!!" ], 
	[ "You are so completely STUFFED that you're about to PANIC!!!!!",  "ACTOR_NAME looks completely STUFFED!!!!!" ], 
	[ "You are so stuffed that you're hallucinating!!!!", "ACTOR_NAME looks insanely stuffed and has a vacant stare on ACTOR_PRONOUN_POSSESSIVE face!!!!" ], 
	[ "You feel like your stomach is about to explode!!!!!", "ACTOR_NAME looks like ACTOR_PRONOUN_SUBJECT might explode!!!!!" ], 
	[ "You have passed out from being so S-T-U-F-F-E-D!!!!!!", "ACTOR_NAME's has passed out from being so S-T-U-F-F-E-D!!!!!!" ]
];

global.MAX_FULLNESS = 16;

// global.FULLNESS_STARVING        = -1;
// global.FULLNESS_SATISFIED       = 0;
// global.FULLNESS_FULL            = 1;
// global.FULLNESS_VERYFULL        = 2;
// global.FULLNESS_EXTREMELYFULL   = 3;
// global.FULLNESS_UNCOMFORTABLE   = 4;
// global.FULLNESS_ABSURD          = 5;
// global.FULLNESS_STUFFED         = 6;
// global.FULLNESS_INSANELYSTUFFED = 7;
// global.FULLNESS_MAXIMUMFULL     = 8;
// global.FULLNESS_OVERMAXIMUM     = 9;
// global.FULLNESS_SWEATING        = 10;
// global.FULLNESS_SHORTBREATH     = 11;
// global.FULLNESS_PANIC           = 12;
// global.FULLNESS_HALLUCINATING   = 13;
// global.FULLNESS_READYTOPOP      = 14;
// global.FULLNESS_PASSEDOUT       = 15;

// global.DRINK_NAMES = [
//   "water",
//   "beer",
//   "wine",
//   "ale",
//   "dark ale",
//   "whisky",
//   "lemonade",
//   "firebreather",
//   "local speciality",
//   "slime mold juice",
//   "milk",
//   "tea",
//   "coffee",
//   "blood",
//   "salt water",
//   "clear water"
// ];

global.DRINKCONTAINER_FULLNESS = [
  "less than half",
  "about half",
  "more than half"
];

// global.DRINK_COLORS = [ 
//   "clear",
//   "brown",
//   "clear",
//   "brown",
//   "dark",
//   "golden",
//   "red",
//   "green",
//   "clear",
//   "light green",
//   "white",
//   "brown",
//   "black",
//   "red",
//   "clear",
//   "crystal clear"   
// ];

global.SOCIALS = [
    { social: "accuse", 
		    minimumTargetPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Accuse who??", 
								toRoom: "#" },
			targetFoundMessages: { toActor: "You look accusingly at TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME looks accusingly at TARGET_NAME.", 
			                       toTarget: "ACTOR_NAME looks accusingly at you." },
			targetNotFoundMessages: { toActor: "Accuse somebody who's not even there??" },
			targetSelfMessages: { toActor: "You accuse yourself.", 
			                      toRoom: "ACTOR_NAME seems to have a bad conscience." }
    },
	{ social: "applaud", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Clap, clap, clap.", 
								toRoom: "ACTOR_NAME gives a round of applause." }, 
	},
	{ social: "beg", 
			minimumTargetPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You beg the gods for mercy.  (No way you're gonna get it! :-))", 
			                    toRoom: "The gods fall down laughing at ACTOR_NAME's request for mercy." },
			targetFoundMessages: { toActor: "You desperately try to squeeze a few coins from TARGET_PRONOUN_OBJECT.", 
			                       toTarget: "ACTOR_NAME begs you for money.  You graciously let ACTOR_PRONOUN_OBJECT peek at your fortune.",
								   toRoom: "ACTOR_NAME begs TARGET_NAME for a dime or two -- or twenty!" },
		    targetNotFoundMessages: { toActor: "Your money-lender seems to be out for the moment." }, 
			targetSelfMessages: { toActor: "How? - begging yourself for money doesn't help.", 
			                      toRoom: "#" }
	},
    { social: "bleed", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You bleed profusely, making an awful mess...",
			                    toRoom: "ACTOR_NAME bleeds profusely, making an awful mess..." }
	},
	{ social: "blush", 
	        minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Your cheeks are burning.", 
								toRoom: "ACTOR_NAME blushes." }
	},
    { social: "bounce", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "BOIINNNNNNGG!", 
			                    toRoom: "ACTOR_NAME bounces around." }
	},
    { social: "bow", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You bow deeply.", 
								toRoom: "ACTOR_NAME bows deeply." },
			targetFoundMessages: { toActor: "You bow before TARGET_PRONOUN_OBJECT.",
			                       toTarget: "ACTOR_NAME bows before you.",
								   toRoom: "ACTOR_NAME bows before TARGET_NAME." },
			targetNotFoundMessages: { toActor: "Who's that?" },
			targetSelfMessages: { toActor: "You kiss your toes.",
			                     toRoom: "ACTOR_NAME folds up like a jacknife and kisses ACTOR_PRONOUN_POSSESSIVE own toes." }
	},
	{ social: "brb", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Come back soon!", 
								toRoom: "ACTOR_NAME will be right back!" }
	},
	{ social: "burp", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You burp loudly.", 
								toRoom: "ACTOR_NAME burps loudly." }
	},
	{ social: "cackle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You cackle gleefully.", 
								toRoom: "ACTOR_NAME throws back ACTOR_PRONOUN_POSSESSIVE head and cackles with insane glee!" }
	},
	{ social: "chuckle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You chuckle politely.", 
								toRoom: "ACTOR_NAME chuckles politely." }
	},
	{ social: "clap", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You clap your small hands together.", 
								toRoom: "ACTOR_NAME shows ACTOR_PRONOUN_POSSESSIVE approval by clapping ACTOR_PRONOUN_POSSESSIVE small hands together." }
	},
	{ social: "comb", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You comb your hair -- perfect.", 
								toRoom: "ACTOR_NAME combs ACTOR_PRONOUN_POSSESSIVE hair, what a dashing specimen!" },
			targetFoundMessages: { toActor: "You patiently untangle TARGET_NAME's hair -- what a mess!",
			                       toTarget: "ACTOR_NAME tries patiently to untangle TARGET_NAME's hair.",
								   toRoom: "ACTOR_NAME pulls your hair in an attempt to comb it." },
			targetNotFoundMessages: { toActor: "That person is not here." },
			targetSelfMessages: { toActor: "You pull your hair, but it will not be combed.",
			                     toRoom: "ACTOR_NAME tries to comb ACTOR_PRONOUN_POSSESSIVE tangled hair." }
	},
	{ social: "comfort", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Do you feel uncomfortable?", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You comfort TARGET_PRONOUN_OBJECT.", 
								   toTarget: "ACTOR_NAME comforts you.",
			                       toRoom: "ACTOR_NAME comforts TARGET_NAME." },
			targetNotFoundMessages: { toActor: "Comfort who?" },
			targetSelfMessages: { toActor: "You make a vain attempt to comfort yourself.", 
			                     toRoom: "#" }
	},
	{ social: "cough", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Yuck, try to cover your mouth next time!", 
			                    toRoom: "ACTOR_NAME coughs loudly." }
	},
	{ social: "cringe", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You cringe in terror.", 
								toRoom: "ACTOR_NAME cringes in terror!" },
			targetFoundMessages: { toActor: "You cringe away from TARGET_PRONOUN_OBJECT.", 
								   toTarget: "ACTOR_NAME cringes away from you.",
								   toRoom: "ACTOR_NAME cringes away from TARGET_NAME in mortal terror." },
			targetNotFoundMessages: { toActor: "I don't see anyone by that name here... what are you afraid of?" }, 
			targetSelfMessages: { toActor: "I beg your pardon?", 
			                      toRoom: "#" }
	},
	{ social: "cry", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Waaaaah..", 
								toRoom: "ACTOR_NAME bursts into tears." }, 
			targetFoundMessages: { toActor: "You cry on TARGET_PRONOUN_POSSESSIVE shoulder.",
			                       toTarget: "ACTOR_NAME cries on your shoulder.",
								   toRoom: "ACTOR_NAME cries on TARGET_NAME's shoulder." },
			targetNotFoundMessages: { toActor: "Who's that?" }, 
			targetSelfMessages: { toActor: "You cry to yourself.", 
								  toRoom: "ACTOR_NAME sobs quietly to ACTOR_PRONOUN_OBJECTself." }
	},
	{ social: "cuddle", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Who do you feel like cuddling today?", 
			                    toRoom: "#" }, 
			targetFoundMessages: { toActor: "You cuddle TARGET_PRONOUN_OBJECT.",
								   toTarget: "ACTOR_NAME cuddles you.",
								   toRoom: "ACTOR_NAME cuddles TARGET_NAME." },
			targetNotFoundMessages: { toActor: "They aren't here." },
			targetSelfMessages: { toActor: "You must feel very cuddly indeed.  :)",
			                      toRoom: "#" }
	},
	{ social: "curse", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You swear loudly for a long time.", 
			                    toRoom: "ACTOR_NAME swears: #@*%%*&^$$%@*&!!!!!!" }
	}, 
	{ social: "curtsey", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You curtsey to your audience.", 
			                    toRoom: "ACTOR_NAME curtseys gracefully." }
	},
	{ social: "dance", 
			minimumVictimPosition: global.POS_STANDING, 
			noTargetMessages: { toActor: "Feels silly, doesn't it?", 
								toRoom: "ACTOR_NAME tries to dance breakdance but nearly breaks ACTOR_PRONOUN_POSSESSIVE neck!" }, 
			targetFoundMessages: { toActor: "You lead TARGET_PRONOUN_OBJECT to the dancefloor.", 
								   toRoom: "ACTOR_NAME sends TARGET_NAME across the dancefloor.", 
								   toTarget: "ACTOR_NAME sends you across the dancefloor." },
			targetNotFoundMessages: { toActor: "Eh, WHO?" }, 
			targetSelfMessages: { toActor: "You skip and dance around by yourself.", 
								  toRoom: "ACTOR_NAME skips a light Fandango." }
	},
	{ social: "daydream", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You dream of better times.", 
								toRoom: "ACTOR_NAME looks absent-minded, ACTOR_PRONOUN_POSSESSIVE eyes staring into space." }
	},
	{ social: "drool", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You start to drool.", 
								toRoom: "ACTOR_NAME starts to drool.", },
			targetFoundMessages: { toActor: "You drool all over TARGET_NAME.", 
								   toRoom: "ACTOR_NAME drools all over TARGET_NAME.", 
								   toTarget: "ACTOR_NAME drools all over you." },
			targetNotFoundMessages: { toActor: "Pardon??" }, 
			targetSelfMessages: { toActor: "Sure, go ahead and drool...yuk!", 
								  toRoom: "ACTOR_NAME drools on ACTOR_PRONOUN_OBJECTself.  What a sight." }
	},
	{ social: "embrace", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You reach but come away empty.  :(", 
			                    toRoom: "ACTOR_NAME reaches out for an embrace, but no one is there." }, 
			targetFoundMessages: { toActor: "You embrace TARGET_PRONOUN_OBJECT warmly.", 
								   toRoom: "ACTOR_NAME embraces TARGET_NAME warmly.", 
								   toTarget: "ACTOR_NAME embraces you warmly." }, 
			targetNotFoundMessages: { toActor: "Alas, your embracee is not here." }, 
			targetSelfMessages: { toActor: "You embrace yourself??", 
								  toRoom: "ACTOR_NAME wraps his arms around himself for a warm self-embrace." }
	},
	{ social: "fart", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Where are your manners?", 
			                    toRoom: "ACTOR_NAME lets off a real rip-roarer!" }
	},
	{ social: "flip", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You flip head over heels.", 
			                    toRoom: "ACTOR_NAME flips head over heels." }
	},
	{ social: "flirt", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You flirt outrageously.", 
								toRoom: "ACTOR_NAME flirts outrageously." }, 
			targetFoundMessages: { toActor: "You flirt outrageously with TARGET_NAME.", 
								   toRoom: "ACTOR_NAME flirts outrageously with TARGET_NAME.", 
								   toTarget: "ACTOR_NAME flirts outrageously with you." }, 
			targetNotFoundMessages: { toActor: "Sorry, your dearly beloved is not around." }, 
			targetSelfMessages: { toActor: "You flirt with yourself.  Must look stupid.", 
			                      toRoom: "ACTOR_NAME thinks ACTOR_PRONOUN_SUBJECT is the most wonderful person in the world." }
	},
	{ social: "fondle", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Who needs to be fondled?", 
								toRoom: "#" },
			targetFoundMessages: { toActor: "You fondly fondle TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME fondly fondles TARGET_NAME.", 
								   toTarget: "ACTOR_NAME fondly fondles you." },
			targetNotFoundMessages: { toActor: "You fondly try to fondle someone not in the room, but who cares." }, 
			targetSelfMessages: { toActor: "You fondly fondle yourself, feels funny doesn't it?", 
								  toRoom: "ACTOR_NAME fondly fondles ACTOR_PRONOUN_OBJECTself -- this is going too far!!" }
	},
	{ social: "french", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "French whom??", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You give TARGET_NAME a long and passionate kiss, it seems to take forever...", 
								   toRoom: "ACTOR_NAME kisses TARGET_NAME passionately.", 
								   toTarget: "ACTOR_NAME gives you a long and passionate kiss, it seems to take forever..." },
			targetNotFoundMessages: { toActor: "Your heart is filled with despair as that person is not here." }, 
			targetSelfMessages: { toActor: "You gather yourself in your arms and try to kiss yourself.", 
								  toRoom: "ACTOR_NAME makes an attempt at kissing ACTOR_PRONOUN_OBJECTself." } 
	},
	{ social: "frown", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "What's bothering you?", 
								toRoom: "ACTOR_NAME frowns." }
	},
	{ social: "fume", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Take it easy now!  Count to ten, very slowly.", 
								toRoom: "ACTOR_NAME grits ACTOR_PRONOUN_POSSESSIVE teeth and fumes with rage." }, 
			targetFoundMessages: { toActor: "You stare at TARGET_PRONOUN_OBJECT, fuming.", 
								   toRoom: "ACTOR_NAME stares at TARGET_NAME, fuming with rage.", 
								   toTarget: "ACTOR_NAME stares at you, fuming with rage!" },
			targetNotFoundMessages: { toActor: "Fume away.. they ain't here." },
			targetSelfMessages: { toActor: "That's right - hate yourself!", 
								  toRoom: "ACTOR_NAME clenches ACTOR_PRONOUN_POSSESSIVE fists and stomps his feet, fuming with anger." }
	},
	{ social: "gasp", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You gasp in astonishment.", 
			                    toRoom: "ACTOR_NAME gasps in astonishment." }
	}, 
	{ social: "giggle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You giggle.", 
			                    toRoom: "ACTOR_NAME giggles." }
	}, 
	{ social: "glare", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You glare at nothing in particular.", 
								toRoom: "ACTOR_NAME glares around ACTOR_PRONOUN_OBJECT." },
			targetFoundMessages: { toActor: "You glare icily at TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME glares at TARGET_NAME.", 
								   toTarget: "ACTOR_NAME glares icily at you, you feel cold to your bones."}, 
			targetNotFoundMessages: { toActor: "You try to glare at somebody who is not present." },
			targetSelfMessages: { toActor: "You glare icily at your feet, they are suddenly very cold.", 
								  toRoom: "ACTOR_NAME glares at ACTOR_PRONOUN_POSSESSIVE feet.  What is bothering ACTOR_PRONOUN_OBJECT?" }
	},
	{ social: "greet", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Greet Who?", 
			                    toRoom: "#", },
			targetFoundMessages: { toActor: "You greet ACTOR_PRONOUN_OBJECT with a light kiss on his cheek.", 
			                       toRoom: "ACTOR_NAME greets TARGET_NAME with a light kiss on its cheek.", 
								   toTarget: "ACTOR_NAME greets you with a light kiss on your cheek." },
			targetNotFoundMessages: { toActor: "Please -- try someone who is here?" }, 
			targetSelfMessages: { toActor: "So, you've finally discovered yourself!", 
			                      toRoom: "ACTOR_NAME greets ACTOR_PRONOUN_OBJECTself.. ACTOR_PRONOUN_SUBJECT always was a strange one." }
	},
	{ social: "grin", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You grin evilly.", 
			                    toRoom: "ACTOR_NAME grins evilly." }
	},
	{ social: "groan", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You groan loudly.", 
			                    toRoom: "ACTOR_NAME groans loudly." }
	}, 
	{ social: "grope", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Whom do you wish to grope??", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You grope TARGET_NAME.", 
								   toRoom: "ACTOR_NAME gropes TARGET_NAME.", 
								   toTarget: "ACTOR_NAME gropes you." }, 
			targetNotFoundMessages: { toActor: "Try someone who's here." }, 
			targetSelfMessages: { toActor: "You grope yourself -- YUCK.", 
								  toRoom: "ACTOR_NAME gropes ACTOR_PRONOUN_OBJECTself -- YUCK." }
	},
	{ social: "grovel", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You grovel in the dirt.", 
								toRoom: "ACTOR_NAME grovels in the dirt." }, 
			targetFoundMessages: { toActor: "You grovel before TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME grovels in the dirt before TARGET_NAME.", 
								   toTarget: "ACTOR_NAME grovels in the dirt before you." }, 
			targetNotFoundMessages: { toActor: "Who?" }, 
			targetSelfMessages: { toActor: "That seems a little silly to me..", 
								  toRoom: "#" }
	},
	{ social: "growl", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Grrrrrrrrrr...", 
								toRoom: "ACTOR_NAME growls." }
	}, 
	{ social: "hiccup", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "*HIC*", 
								toRoom: "ACTOR_NAME hiccups." }
	}, 
	{ social: "hug", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Hug who?", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You hug TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME hugs TARGET_NAME.", 
								   toTarget: "ACTOR_NAME hugs you." }, 
			targetNotFoundMessages: { toActor: "Sorry, friend, I can't see that person here." }, 
			targetSelfMessages: { toActor: "You hug yourself.", 
								  toRoom: "ACTOR_NAME hugs ACTOR_PRONOUN_OBJECTself." }
	},
	{ social: "kiss", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Isn't there someone you want to kiss?", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You kiss TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME kisses TARGET_NAME.", 
								   toTarget: "ACTOR_NAME kisses you." }, 
			targetNotFoundMessages: { toActor: "Never around when required." }, 
			targetSelfMessages: { toActor: "All the lonely people :(", 
								  toRoom: "#" }
	}, 
	{ social: "laugh", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You fall down laughing.", 
			                    toRoom: "ACTOR_NAME falls down laughing."}
	}, 
	{ social: "lick", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You lick your mouth and smile.", 
			                    toRoom: "ACTOR_NAME licks ACTOR_PRONOUN_POSSESSIVE mouth and smiles." }, 
			targetFoundMessages: { toActor: "You lick TARGET_PRONOUN_OBJECT.", 
			                       toRoom: "ACTOR_NAME licks TARGET_NAME.", 
								   toTarget: "ACTOR_NAME licks you." }, 
			targetNotFoundMessages: { toActor: "Lick away, nobody's here with that name." }, 
			targetSelfMessages: { toActor: "You lick yourself.", 
			                      toRoom: "ACTOR_NAME licks ACTOR_PRONOUN_OBJECTself -- YUCK." }
	},
	{ social: "love", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You love the whole world.", 
			                    toRoom: "ACTOR_NAME loves everybody in the world." }, 
			targetFoundMessages: { toActor: "You tell your true feelings to TARGET_NAME.", 
			                       toRoom: "ACTOR_NAME whispers softly to TARGET_NAME.", 
								   toTarget: "ACTOR_NAME whispers to you sweet words of love." }, 
			targetNotFoundMessages: { toActor: "Alas, your love is not present..." }, 
			targetSelfMessages: { toActor: "Well, we already know you love yourself (lucky someone does!)", 
								 toRoom: "ACTOR_NAME loves ACTOR_PRONOUN_OBJECTself, can you believe it?" }
	},
	{ social: "massage", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Massage what, thin air?", 
			                    toRoom: "#" }, 
			targetFoundMessages: { toActor: "You gently massage TARGET_NAME's shoulders.", 
								   toRoom: "ACTOR_NAME massages TARGET_NAME's shoulders.", 
								   toTarget: "ACTOR_NAME gently massages your shoulders... ahhhhhhhhhh..." }, 
			targetNotFoundMessages: { toActor: "You can only massage someone in the same room as you." }, 
			targetSelfMessages: { toActor: "You practice yoga as you try to massage yourself.", 
			                      toRoom: "ACTOR_NAME gives a show on yoga-positions, trying to massage ACTOR_PRONOUN_OBJECTself." }
	},
	{ social: "moan", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You start to moan.", 
			                    toRoom: "ACTOR_NAME starts moaning." }
	}, 
	{ social: "nibble", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Nibble on who?", 
							   toRoom: "#" }, 
			targetFoundMessages: { toActor: "You nibble on TARGET_NAME's ear.", 
			                       toRoom: "ACTOR_NAME nibbles on TARGET_NAME's ear.", 
								   toTarget: "ACTOR_NAME nibbles on your ear." }, 
			targetNotFoundMessages: { toActor: "Sorry, not here, better go back to dreaming about it." }, 
			targetSelfMessages: { toActor: "You nibble on your OWN ear???????????????????", 
			                      toRoom: "ACTOR_NAME nibbles on ACTOR_PRONOUN_POSSESSIVE OWN ear (I wonder how it is done!!)." } 
	},
	{ social: "nod", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You nod solemnly.", 
							    toRoom: "ACTOR_NAME nods solemnly." }
	}, 
	{ social: "nudge", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Nudge?  Nudge???  The HELL you say!!!!", 
			                    toRoom: "#" }, 
			targetFoundMessages: { toActor: "You nudge TARGET_PRONOUN_OBJECT with your elbow.", 
								   toRoom: "ACTOR_NAME nudges TARGET_NAME suggestively with ACTOR_PRONOUN_POSSESSIVE elbow.", 
								   toTarget: "ACTOR_NAME nudges you suggestively.  You two have an understanding." },
			targetNotFoundMessages: { toActor: "Eh?  That person isn't here, you know." }, 
			targetSelfMessages: { toActor: "Well, just nudge yourself, but how do you get your elbow in that position?", 
								  toRoom: "ACTOR_NAME nudges ACTOR_PRONOUN_OBJECTself with ACTOR_PRONOUN_POSSESSIVE elbows, making ACTOR_PRONOUN_OBJECT look like a large chicken." }
	},
	{ social: "nuzzle", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Nuzzle who??", 
							    toRoom: "#" }, 
			targetFoundMessages: { toActor: "You nuzzle TARGET_PRONOUN_POSSESSIVE neck softly.", 
			                       toRoom: "ACTOR_NAME softly nuzzles TARGET_NAME's neck.", 
								   toTarget: "ACTOR_NAME softly nuzzles your neck." }, 
			targetNotFoundMessages: { toActor: "No.. they aren't here.." }, 
			targetSelfMessages: { toActor: "I'm sorry, friend, but that's impossible.", 
			                      toRoom: "#" } 
	},
	{ social: "pat", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Pat who??", 
			                    toRoom: "#" }, 
			targetFoundMessages: { toActor: "You pat TARGET_NAME on TARGET_PRONOUN_POSSESSIVE head.", 
								   toRoom: "ACTOR_NAME pats TARGET_NAME on TARGET_PRONOUN_POSSESSIVE head.", 
								   toTarget: "ACTOR_NAME pats you on your head." }, 
			targetNotFoundMessages: { toActor: "Who, where, what??" }, 
			targetSelfMessages: { toActor: "You pat yourself on your head, very reassuring.", 
			                      toRoom: "ACTOR_NAME pats ACTOR_PRONOUN_OBJECTself on the head." }
	},
	{ social: "peer", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You peer around you, uncertain that what you see is actually true.", 
			                    toRoom: "ACTOR_NAME peers around, looking as if ACTOR_PRONOUN_SUBJECT has trouble seeing everything clearly." }
	}, 
	{ social: "point", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You point whereto?", 
			                    toRoom: "ACTOR_NAME points in all directions, seemingly confused." }, 
			targetFoundMessages: { toActor: "You point at TARGET_PRONOUN_OBJECT -- TARGET_PRONOUN_SUBJECT DOES look funny.", 
			                       toRoom: "ACTOR_NAME muffles a laugh, pointing at TARGET_NAME.", 
								   toTarget: "ACTOR_NAME points at you... how rude!" }, 
			targetNotFoundMessages: { toActor: "You must have a VERY long index-finger..." }, 
			targetSelfMessages: { toActor: "You point at yourself.  Insinuating something?", 
			                      toRoom: "ACTOR_NAME points at ACTOR_PRONOUN_OBJECTself, suggesting that the center of matters is ACTOR_PRONOUN_SUBJECT." }
	}, 
	{ social: "poke", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Poke who??", 
							    toRoom: "#" }, 
			targetFoundMessages: { toActor: "You poke TARGET_PRONOUN_OBJECT in the ribs.", 
			                       toRoom: "ACTOR_NAME pokes TARGET_NAME in the ribs.", 
								   toTarget: "ACTOR_NAME pokes you in the ribs." }, 
			targetNotFoundMessages: { toActor: "You can't poke someone who's not here!" }, 
			targetSelfMessages: { toActor: "You poke yourself in the ribs, feeling very silly.", 
			                      toRoom: "ACTOR_NAME pokes ACTOR_PRONOUN_OBJECTself in the ribs, looking very sheepish." }
	},
	{ social: "ponder", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You ponder over matters as they appear to you at this moment.", 
			                    toRoom: "ACTOR_NAME sinks deeply into ACTOR_PRONOUN_POSSESSIVE own thoughts." }
	}, 
	{ social: "pout", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Ah, don't take it so hard.", 
			                    toRoom: "ACTOR_NAME pouts." }
	}, 
	{ social: "pray", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You feel righteous, and maybe a little foolish.", 
								toRoom: "ACTOR_NAME begs and grovels to the powers that be." }, 
			targetFoundMessages: { toActor: "You crawl in the dust before TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME falls down and grovels in the dirt before TARGET_NAME.", 
								   toTarget: "ACTOR_NAME kisses the dirt at your feet." }, 
			targetNotFoundMessages: { toActor: "No such person around; your prayers vanish into the endless voids." }, 
			targetSelfMessages: { toActor: "Talk about narcissism...", 
			                      toRoom: "ACTOR_NAME performs some strange yoga-exercises and mumbles a prayer to ACTOR_PRONOUN_OBJECTself." }
	},
	{ social: "punch", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Punch the air?  Sure, go ahead, fine by me...", 
			                    toRoom: "ACTOR_NAME starts shadow-boxing." }, 
			targetFoundMessages: { toActor: "You punch TARGET_PRONOUN_OBJECT right in the face!  Yuck, the BLOOD!", 
								   toRoom: "ACTOR_NAME punches weakly at TARGET_NAME, missing by miles.", 
								   toTarget: "ACTOR_NAME tries a punch at you but misses by a good quarter-mile..." }, 
			targetNotFoundMessages: { toActor: "Punch who?" }, 
			targetSelfMessages: { toActor: "You punch yourself in the face resulting in your own nose being bloodied.", 
			                      toRoom: "ACTOR_NAME punches ACTOR_PRONOUN_OBJECTself in the face, looking kind of stupid." }
	},
	{ social: "purr", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "MMMMEEEEEEEEOOOOOOOOOWWWWWWWWWWWW.", 
			                    toRoom: "ACTOR_NAME purrs contentedly." }
	},
	{ social: "roll", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You roll your eyes in disgust.", 
							    toRoom: "ACTOR_NAME rolls ACTOR_PRONOUN_POSSESSIVE eyes in disgust." },
			targetFoundMessages: { toActor: "You look at TARGET_PRONOUN_OBJECT and roll your eyes in disgust.", 
			                       toRoom: "ACTOR_NAME looks at TARGET_NAME in contempt and rolls ACTOR_PRONOUN_POSSESSIVE eyes with disgust.", 
								   toTarget: "ACTOR_NAME stares at you and rolls ACTOR_PRONOUN_POSSESSIVE eyes in disgust." },
			targetNotFoundMessages: { toActor: "Um... who?" }, 
			targetSelfMessages: { toActor: "You roll your eyes, disgusted with your own incompetence.", 
								  toRoom: "ACTOR_NAME rolls ACTOR_PRONOUN_POSSESSIVE eyes, disgusted with ACTOR_PRONOUN_OBJECTself." } 
	},
	{ social: "ruffle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You've got to ruffle SOMEONE.", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You ruffle TARGET_NAME's hair playfully.", 
			                       toRoom: "ACTOR_NAME ruffles TARGET_NAME's hair playfully.", 
								   toTarget: "ACTOR_NAME ruffles your hair playfully." }, 
			targetNotFoundMessages: { toActor: "Might be a bit difficult." }, 
			targetSelfMessages: { toActor: "You ruffle your hair, wondering how far you can go before the rest think you're crazy.", 
			                      toRoom: "ACTOR_NAME ruffles ACTOR_PRONOUN_POSSESSIVE hair -- weirdo!" }
	},
	{ social: "scream", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "ARRRRRRRRRRGH!!!!!", 
							    toRoom: "ACTOR_NAME screams loudly!" }
	},
	{ social: "shake", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You shake your head.", 
			                    toRoom: "ACTOR_NAME shakes ACTOR_PRONOUN_POSSESSIVE head." },
			targetFoundMessages: { toActor: "You shake TARGET_PRONOUN_POSSESSIVE hand.", 
								   toRoom: "ACTOR_NAME shakes TARGET_NAME's hand.", 
								   toTarget: "ACTOR_NAME shakes your hand." }, 
			targetNotFoundMessages: { toActor: "Sorry good buddy, but that person doesn't seem to be here." }, 
			targetSelfMessages: { toActor: "You are shaken by yourself.", 
								  toRoom: "ACTOR_NAME shakes and quivers like a bowlful of jelly." }
	},
	{ social: "shiver", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Brrrrrrrrr.", 
			                    toRoom: "ACTOR_NAME shivers uncomfortably." }
	},
	{ social: "shrug", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You shrug.", 
								toRoom: "ACTOR_NAME shrugs helplessly." }
	}, 
	{ social: "sigh", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You sigh.", 
								toRoom: "ACTOR_NAME sighs loudly." }
	}, 
	{ social: "slap", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Normally you slap SOMEBODY.", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You slap TARGET_NAME.", 
								   toRoom: "ACTOR_NAME slaps TARGET_NAME.", 
								   toTarget: "You are slapped by ACTOR_NAME." }, 
			targetNotFoundMessages: { toActor: "How about slapping someone in the same room as you??" }, 
			targetSelfMessages: { toActor: "You slap yourself, silly you.", 
								  toRoom: "ACTOR_NAME slaps ACTOR_PRONOUN_OBJECTself, really strange..." }
	},
	{ social: "smile", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You smile happily.", 
								toRoom: "ACTOR_NAME smiles happily." }, 
			targetFoundMessages: { toActor: "You smile at TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME beams a smile at TARGET_NAME.", 
								   toTarget: "ACTOR_NAME smiles at you." }, 
			targetNotFoundMessages: { toActor: "There's no one by that name around." }, 
			targetSelfMessages: { toActor: "You smile at yourself.", 
								  toRoom: "ACTOR_NAME smiles at ACTOR_PRONOUN_OBJECTself." }
	},
	{ social: "smirk", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You smirk.", 
								toRoom: "ACTOR_NAME smirks." }
	}, 
	{ social: "snap", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "PRONTO!  You snap your fingers.", 
								toRoom: "ACTOR_NAME snaps ACTOR_PRONOUN_POSSESSIVE fingers." }
	}, 
	{ social: "snarl", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You snarl like a viscious animal.", 
								toRoom: "ACTOR_NAME snarls like a cornered, viscious animal." }, 
			targetFoundMessages: { toActor: "You snarl at TARGET_PRONOUN_OBJECT angrily.  Control yourself!", 
								   toRoom: "ACTOR_NAME snarls angrily at TARGET_NAME...  ACTOR_PRONOUN_SUBJECT seems incapable of controlling ACTOR_PRONOUN_OBJECTself.", 
								   toTarget: "ACTOR_NAME snarls viciously at you...  ACTOR_PRONOUN_POSSESSIVE self-control seems to have gone bananas." },
			targetNotFoundMessages: { toActor: "Eh?  Who?  Not here, my friend." }, 
			targetSelfMessages: { toActor: "You snarl at yourself, obviously suffering from schizophrenia.", 
								  toRoom: "ACTOR_NAME snarls at ACTOR_PRONOUN_OBJECTself, and suddenly looks very frightened." }
	},
	{ social: "sneeze", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Gesundheit!", 
								toRoom: "ACTOR_NAME sneezes." }
	}, 
	{ social: "snicker", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You snicker softly.", 
								toRoom: "ACTOR_NAME snickers softly." }
	}, 
	{ social: "sniff", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You sniff sadly.  *SNIFF*", 
								toRoom: "ACTOR_NAME sniffs sadly." }
	}, 
	{ social: "snore", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Zzzzzzzzzzzzzzzzz.", 
								toRoom: "ACTOR_NAME snores loudly." }
	}, 
	{ social: "snuggle", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Who?", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You snuggle TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME snuggles up to TARGET_NAME.", 
								   toTarget: "ACTOR_NAME snuggles up to you." }, 
			targetNotFoundMessages: { toActor: "They aren't here." },
			targetSelfMessages: { toActor: "Hmmm...", 
			                      toRoom: "#" }
	},
	{ social: "spank", 
			minimumVictimPosition: global.POS_STANDING, 
			noTargetMessages: { toActor: "You spank WHO?  Eh?  How?  Naaah, you'd never.", 
								toRoom: "ACTOR_NAME spanks the thin air with a flat hand." }, 
			targetFoundMessages: { toActor: "You spank TARGET_PRONOUN_OBJECT vigorously, long and hard.  Your hand hurts.", 
								   toRoom: "ACTOR_NAME spanks TARGET_NAME over ACTOR_PRONOUN_POSSESSIVE knee.  It hurts to even watch.", 
								   toTarget: "ACTOR_NAME spanks you long and hard.  You feel like a naughty child." }, 
			targetNotFoundMessages: { toActor: "Are you sure about this?  I mean, that person isn't even here!" }, 
			targetSelfMessages: { toActor: "Hmm, not likely.", 
								  toRoom: "#" }
	},
	{ social: "spit", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You spit over your left shoulder.", 
								toRoom: "ACTOR_NAME spits over ACTOR_PRONOUN_POSSESSIVE left shoulder." }, 
			targetFoundMessages: { toActor: "You spit on TARGET_PRONOUN_OBJECT.", 
								   toRoom: "ACTOR_NAME spits in TARGET_NAME's face.", 
								   toTarget: "ACTOR_NAME spits in your face." }, 
			targetNotFoundMessages: { toActor: "Can you spit that far?" }, 
			targetSelfMessages: { toActor: "You drool down your front.", 
			                      toRoom: "ACTOR_NAME drools down ACTOR_PRONOUN_POSSESSIVE front." }
	},
	{ social: "squeeze", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Where, what, how, WHO???", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You squeeze TARGET_PRONOUN_OBJECT fondly.", 
								   toRoom: "ACTOR_NAME squeezes TARGET_NAME fondly.", 
								   toTarget: "ACTOR_NAME squeezes you fondly." }, 
			targetNotFoundMessages: { toActor: "Where, what, how, WHO???" }, 
			targetSelfMessages: { toActor: "You squeeze yourself -- try to relax a little!", 
								  toRoom: "ACTOR_NAME squeezes ACTOR_PRONOUN_OBJECTself." }
	},
	{ social: "stare", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You stare at the sky.", 
								toRoom: "ACTOR_NAME stares at the sky." }, 
			targetFoundMessages: { toActor: "You stare dreamily at TARGET_NAME, completely lost in TARGET_PRONOUN_POSSESSIVE eyes..", 
								   toRoom: "ACTOR_NAME stares dreamily at TARGET_NAME.",
								   toTarget: "ACTOR_NAME stares dreamily at you, completely lost in your eyes." },
			targetNotFoundMessages: { toActor: "You stare and stare but can't see that person anywhere..."}, 
			targetSelfMessages: { toActor: "You stare dreamily at yourself - enough narcissism for now.", 
			                      toRoom: "ACTOR_NAME stares dreamily at ACTOR_PRONOUN_OBJECTself - NARCISSIST!" }
	},
	{ social: "steam", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You let out some steam, much to the others' relief (and your own!)", 
							    toRoom: "ACTOR_NAME lets out a lot of steam, much to your relief." }
	}, 
	{ social: "strut", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Strut your stuff.", 
								toRoom: "ACTOR_NAME struts proudly." }
	}, 
	{ social: "sulk", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You sulk.", 
							    toRoom: "ACTOR_NAME sulks in the corner." }
	}, 
	{ social: "tackle", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You tackle the air.  It stands not a chance.", 
								toRoom: "ACTOR_NAME starts running around ACTOR_PRONOUN_OBJECTself in a desperate attempt to tackle the air." }, 
			targetFoundMessages: { toActor: "You ruthlessly tackle TARGET_PRONOUN_OBJECT to the ground.", 
								   toRoom: "ACTOR_NAME ruthlessly tackles TARGET_NAME, pinning TARGET_PRONOUN_OBJECT to the ground.", 
								   toTarget: "ACTOR_NAME suddenly lunges at you and tackles you to the ground!" }, 
			targetNotFoundMessages: { toActor: "That person isn't here (luck for them, it would seem...)" }, 
			targetSelfMessages: { toActor: "Tackle yourself?  Yeah, right....", 
								  toRoom: "ACTOR_NAME makes a dexterous move and kicks ACTOR_PRONOUN_POSSESSIVE left leg away with ACTOR_PRONOUN_POSSESSIVE right."} 
	}, 
	{ social: "tango", 
			minimumVictimPosition: global.POS_STANDING, 
			noTargetMessages: { toActor: "With whom would you like to tango?", 
							    toRoom: "ACTOR_NAME puts a rose between ACTOR_PRONOUN_POSSESSIVE teeth, but takes out it since noone joins ACTOR_PRONOUN_OBJECT." }, 
			targetFoundMessages: { toActor: "You put a rose between your teeth and tango with TARGET_PRONOUN_OBJECT seductively.", 
								   toRoom: "ACTOR_NAME puts a rose between ACTOR_PRONOUN_POSSESSIVE teeth and tangos with TARGET_NAME seductively.", 
								   toTarget: "ACTOR_NAME puts a rose between ACTOR_PRONOUN_POSSESSIVE teeth and tangos with you seductively." }, 
			targetNotFoundMessages: { toActor: "That person isn't around.  Better sit this one out." }, 
			targetSelfMessages: { toActor: "Feels rather stupid, doesn't it?", 
			                      toRoom: "ACTOR_NAME puts a rose between ACTOR_PRONOUN_POSSESSIVE teeth and tries to tango with ACTOR_PRONOUN_OBJECTself." }
	}, 
	{ social: "taunt", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You taunt the nothing in front of you.", 
								toRoom: "ACTOR_NAME taunts something that seems to be right in front of ACTOR_PRONOUN_OBJECT." }, 
			targetFoundMessages: { toActor: "You taunt TARGET_PRONOUN_OBJECT, to your own delight.", 
								   toRoom: "ACTOR_NAME taunts TARGET_NAME rather insultingly... ACTOR_PRONOUN_SUBJECT seems to enjoy it tremendously.", 
								   toTarget: "ACTOR_NAME taunts you.  It really hurts your feelings." }, 
			targetNotFoundMessages: { toActor: "Hmmmmmmm.....nope, no one by that name here." }, 
			targetSelfMessages : { toActor: "You taunt yourself, almost making you cry...:(", 
								   toRoom: "ACTOR_NAME taunts ACTOR_PRONOUN_OBJECTself to tears." }
	}, 
	{ social: "thank", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Thank you too.", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You thank TARGET_NAME heartily.", 
								   toRoom: "ACTOR_NAME thanks TARGET_NAME heartily.", 
								   toTarget: "ACTOR_NAME thanks you heartily." }, 
			targetNotFoundMessages: { toActor: "No one answers to that name here." }, 
			targetSelfMessages: { toActor: "You thank yourself since nobody else wants to!", 
			                      toRoom: "ACTOR_NAME thanks ACTOR_PRONOUN_OBJECTself since you won't." }
	}, 
	{ social: "think", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You think about life, the universe and everything.", 
								toRoom: "ACTOR_NAME sinks deeply into thought about the meaning of life." }, 
			targetFoundMessages: { toActor: "You think about what purpose TARGET_PRONOUN_SUBJECT has in relation to your part of life.", 
								   toRoom: "ACTOR_NAME stops and thinks about TARGET_NAME, completely lost in thought.", 
								   toTarget: "Your ears burn as ACTOR_NAME thinks about you.. you wonder what about." }, 
			targetNotFoundMessages: { toActor: "You'd better think harder, if you hope to make contact!" }, 
			targetSelfMessages: { toActor: "You think about yourself (for once).", 
			                      toRoom: "ACTOR_NAME thinks about ACTOR_PRONOUN_OBJECTself for a change.....(?)" }
	}, 
	{ social: "tickle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "Who do you want to tickle??", 
								toRoom: "#" }, 
			targetFoundMessages: { toActor: "You tickle TARGET_NAME.", 
								   toRoom: "ACTOR_NAME tickles TARGET_NAME.", 
								   toTarget: "ACTOR_NAME tickles you - hee hee hee." },
			targetNotFoundMessages: { toActor: "Who is that??" }, 
			targetSelfMessages: { toActor: "You tickle yourself, how funny!", 
			                      toRoom: "ACTOR_NAME tickles ACTOR_PRONOUN_OBJECTself." }
	}, 
	{ social: "twiddle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You patiently twiddle your thumbs.", 
								toRoom: "ACTOR_NAME patiently twiddles ACTOR_PRONOUN_POSSESSIVE thumbs." }
	},
	{ social: "wave", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You wave.", 
			                    toRoom: "ACTOR_NAME waves happily." },
			targetFoundMessages: { toActor: "You wave goodbye to TARGET_NAME.", 
								   toRoom: "ACTOR_NAME waves goodbye to TARGET_NAME.", 
								   toTarget: "ACTOR_NAME waves goodbye to you.  Have a good journey." }, 
			targetNotFoundMessages: { toActor: "They didn't wait for you to wave goodbye." }, 
			targetSelfMessages: { toActor: "Are you going on adventures as well??", 
			                      toRoom: "ACTOR_NAME waves goodbye to ACTOR_PRONOUN_OBJECTself." }
	}, 
	{ social: "whine", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You whine pitifully.", 
								toRoom: "ACTOR_NAME whines pitifully about the whole situation." }
	}, 
	{ social: "whistle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You whistle appreciatively.", 
								toRoom: "ACTOR_NAME whistles appreciatively." }
	}, 
	{ social: "wiggle", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You wiggle your bottom.", 
								toRoom: "ACTOR_NAME wiggles ACTOR_PRONOUN_POSSESSIVE bottom." }
	}, 
	{ social: "wink", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "Have you got something in your eye?", 
								toRoom: "ACTOR_NAME winks suggestively." },
			targetFoundMessages: { toActor: "You wink suggestively at TARGET_NAME.", 
								   toRoom: "ACTOR_NAME winks at TARGET_NAME.", 
								   toTarget: "ACTOR_NAME winks suggestively at you." },
			targetNotFoundMessages: { toActor: "No one with that name is present." },
			targetSelfMessages: { toActor: "You wink at yourself?? -- what are you up to?", 
								  toRoom: "ACTOR_NAME winks at ACTOR_PRONOUN_OBJECTself -- something strange is going on..." }
	}, 
	{ social: "worship", 
			minimumVictimPosition: global.POS_RESTING, 
			noTargetMessages: { toActor: "You find yourself head-down in the dirt, worshipping.", 
			                    toRoom: "ACTOR_NAME starts worshipping nothing at all." }, 
			targetFoundMessages: { toActor: "You fall to your knees and worship TARGET_PRONOUN_OBJECT deeply.", 
								   toRoom: "ACTOR_NAME falls to ACTOR_PRONOUN_POSSESSIVE knees, worshipping TARGET_NAME with uncanny dedication.", 
								   toTarget: "ACTOR_NAME kneels before you in solemn worship." }, 
			targetNotFoundMessages: { toActor: "Uh.. who?  They're not here, pal." }, 
			targetSelfMessages: { toActor: "You seem sure to have found a true deity.....", 
			                      toRoom: "ACTOR_NAME falls to ACTOR_PRONOUN_POSSESSIVE knees and humbly worships ACTOR_PRONOUN_OBJECTself." }
	}, 
	{ social: "yawn", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You yawn.  Sleepy, eh?", 
								toRoom: "ACTOR_NAME yawns." }
	}, 
	{ social: "yodel", 
			minimumVictimPosition: global.POS_DEAD, 
			noTargetMessages: { toActor: "You start yodelling loudly and rather beautifully in your own ears.", 
							    toRoom: "ACTOR_NAME starts a yodelling session that goes right to the bone." }
	}
	
];