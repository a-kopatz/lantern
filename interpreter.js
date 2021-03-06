var constants = require("./constants");
var bug = require("./bug").bug;
var idea = require("./idea").idea;
var typo = require("./typo").typo;
var helpdoc = require("./helpdoc");
var Helpdoc = require("./helpdoc").helpdoc;

var Social =  require("./social");
var Character = require("./character");
var Output = require("./output");
var utility = require("./utility");
var room = require("./room");

var Item = require('./item');
var item = require('./item').item;
var Npc = require('./npc');
var npc = require('./npc').npc;

var Resetcommand = require('./resetcommand');

var Food = require('./items/food');

// Object constructor
function Interpreter() {
    
}


var COMMAND_LIST = [
    
          { command: "north"    , minimumPosition: global.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: global.SCMD_NORTH },
          { command: "east"     , minimumPosition: global.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: global.SCMD_EAST },
          { command: "south"    , minimumPosition: global.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: global.SCMD_SOUTH },
          { command: "west"     , minimumPosition: global.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: global.SCMD_WEST },
          { command: "up"       , minimumPosition: global.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: global.SCMD_UP },
          { command: "down"     , minimumPosition: global.POS_STANDING, functionPointer: do_move       , minimumLevel: 0, subCommand: global.SCMD_DOWN },

          { command: "apparel"  , minimumPosition: global.POS_DEAD    , functionPointer: do_apparel    , minimumLevel: 0, subCommand: 0 },
          { command: "accuse"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_ACCUSE },
          { command: "applaud"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_APPLAUD },
          { command: "auction"  , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_AUCTION },

          { command: "beg"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BEG },
          { command: "bleed"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BLEED },
          { command: "blush"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BLUSH },
          { command: "bounce"   , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BOUNCE },
          { command: "bow"      , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BOW },
          { command: "brb"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BRB },
          { command: "bug"      , minimumPosition: global.POS_DEAD    , functionPointer: do_report_bug , minimumLevel: 0, subCommand: 0 },
          { command: "burp"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_BURP },
//           { command: "buy"      , minimumPosition: global.POS_RESTING , functionPointer: do_buy        , minimumLevel: 0, subCommand: 0 },
          
          { command: "cackle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CACKLE },
          { command: "chuckle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CHUCKLE },
          { command: "clap"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CLAP },
          { command: "close"    , minimumPosition: global.POS_RESTING , functionPointer: do_close_door , minomumLevel: 0, subCommand: 0 },
          { command: "comb"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_COMB },
          { command: "comfort"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_COMFORT },
//           { command: "consider" , minimumPosition: global.POS_RESTING , functionPointer: do_consider   , minimumLevel: 0, subCommand: 0 },
          { command: "congrat"  , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GRATZ },
          { command: "cough"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_COUGH },
          { command: "create"   , minimumPosition: global.POS_RESTING , functionPointer: do_create     , minimumLevel: global.LEVEL_ADMINISTRATOR },
          { command: "cringe"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CRINGE },
          { command: "cry"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CRY },
          { command: "cuddle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CUDDLE },
          { command: "curse"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CURSE },
          { command: "curtsey"  , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CURTSEY },
          
          { command: "dance"    , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_DANCE },
          { command: "date"     , minimumPosition: global.POS_DEAD    , functionPointer: do_datetime   , minimumLevel: 0, subCommand: 0 },
                    
          { command: "daydream" , minimumPosition: global.POS_SLEEPING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_DAYDREAM },
          { command: "drink"    , minimumPosition: global.POS_RESTING , functionPointer: do_drink      , minimumLevel: 0  },
          { command: "donate"   , minimumPosition: global.POS_RESTING , functionPointer: do_donate     , minimumLevel: 0, subCommand: 0 },
          { command: "dooredit" , minimumPosition: global.POS_DEAD    , functionPointer: do_dooredit   , minimumLevel: global.LEVEL_ADMINISTRATOR },
          { command: "drop"     , minimumPosition: global.POS_RESTING , functionPointer: do_drop       , minimumLevel: 0, subCommand: 0 },
          { command: "drool"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_DROOL },

          { command: "eat"      , minimumPosition: global.POS_RESTING , functionPointer: do_eat        , minimumLevel: 0, subCommand: 0 },
          { command: "embrace"  , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_EMBRACE },
          { command: ":"        , minimumPosition: global.POS_RESTING , functionPointer: do_emote      , minimumLevel: 0, subCommand: 0 },
          { command: "emote"    , minimumPosition: global.POS_RESTING , functionPointer: do_emote      , minimumLevel: 0, subCommand: 0 },
          { command: "equipment", minimumPosition: global.POS_DEAD    , functionPointer: do_apparel    , minimumLevel: 0, subCommand: 0 },
          { command: "exits"    , minimumPosition: global.POS_RESTING , functionPointer: do_exits      , minimumLevel: 0, subCommand: 0 },

          { command: "fart"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FART },
          { command: "feed"     , minimumPosition: global.POS_RESTING , functionPointer: do_feed       , minimumLevel: 0, subCommand: 0 },
          { command: "findroom" , minimumPosition: global.POS_DEAD    , functionPointer: do_findrooms  , minimumLevel: 0 },          
          { command: "finditem" , minimumPosition: global.POS_DEAD    , functionPointer: do_finditems  , minimumLevel: 0 },
          { command: "flip"     , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FLIP },
          { command: "flirt"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FLIRT },
//           { command: "follow"   , minimumPosition: global.POS_RESTING , functionPointer: do_follow     , minimumLevel: 0, subCommand: 0 },
          { command: "fondle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FONDLE },
          { command: "french"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FRENCH },
          { command: "frown"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FROWN },
          { command: "fume"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FUME },

          { command: "gasp"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GASP },
          { command: "get"      , minimumPosition: global.POS_RESTING , functionPointer: do_take       , minimumLevel: 0, subCommand: 0 },          
          { command: "giggle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GIGGLE },
          { command: "give"     , minimumPosition: global.POS_RESTING , functionPointer: do_give       , minimumLevel: 0, subCommand: 0 },
          { command: "glare"    , minimumPosition: global.POS_RESTING,  functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GLARE },
          { command: "gossip"   , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GOSSIP },
          { command: "goto"     , minimumPosition: global.POS_STANDING, functionPointer: do_goto       , minimumLevel: 0, subCommand: 0 },
//           { command: "group"    , minimumPosition: global.POS_RESTING , functionPointer: do_group      , minimumLevel: 0, subCommand: 0 },
          { command: "grats"    , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GRATZ },
          { command: "gratz"    , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GRATZ },
          { command: "greet"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GREET },
          { command: "grin"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GRIN },
          { command: "groan"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GROAN },
          { command: "grope"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GROPE },
          { command: "grovel"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GROVEL },
          { command: "growl"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GROWL },
//           { command: "gsay"     , minimumPosition: global.POS_SLEEPING, functionPointer: go_gsay       , minimumLevel: 0, subCommand: 0 },
//           { command: "gtell"    , minimumPosition: global.POS_SLEEPING, functionPointer: go_gsay       , minimumLevel: 0, subCommand: 0 },

          { command: "help"     , minimumPosition: global.POS_DEAD    , functionPointer: do_help       , minimumLevel: 0, subCommand: 0 },
          { command: "helpedit" , minimumPosition: global.POS_DEAD    , functionPointer: do_helpedit   , minimumLevel: global.LEVEL_ADMINISTRATOR },

          { command: "hiccup"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_HICCUP },
//           { command: "hit"      , minimumPosition: global.POS_RESTING , functionPointer: do_hit        , minimumLevel: 0, subCommand: 0 },
          { command: "holler"   , minimumPosition: global.POS_RESTING,  functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_HOLLER },
          { command: "home"     , minimumPosition: global.POS_STANDING, functionPointer: do_home       , minimumLevel: 0, subCommand: 0 },
          { command: "hug"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_HUG },

          { command: "inventory", minimumPosition: global.POS_DEAD    , functionPointer: do_inventory  , minimumLevel: 0, subCommand: 0 },
          { command: "idea"     , minimumPosition: global.POS_DEAD    , functionPointer: do_submit_idea, minimumLevel: 0, subCommand: 0 },
//           { command: "insult"   , minimumPosition: global.POS_RESTING , functionPointer: do_insult     , minimumLevel: 0, subCommand: 0 },
          { command: "itemedit" , minimumPosition: global.POS_DEAD    , functionPointer: do_itemedit   , minimumLevel: global.LEVEL_ADMINISTRATOR },
          
          { command: "junk"     , minimumPosition: global.POS_RESTING , functionPointer: do_junk       , minimumLevel: 0, subCommand: 0 },

//           { command: "kick"     , minimumPosition: global.POS_FIGHTING, functionPointer: do_kick       , minimumLevel: 0, subCommand: 0 },
          { command: "kiss"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_KISS },

          { command: "look"     , minimumPosition: global.POS_RESTING , functionPointer: do_look       , minimumLevel: 0, subCommand: 0},
          { command: "laugh"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_LAUGH },
          { command: "lick"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_LICK },
          { command: "listrooms", minimumPosition: global.POS_RESTING , functionPointer: do_listrooms  , minimumLevel: 0 },
          { command: "listitems", minimumPosition: global.POS_RESTING , functionPointer: do_listitems  , minimumLevel: 0 },

          { command: "lock"     , minimumPosition: global.POS_RESTING , functionPointer: do_lock_door  , minimumLevel: 0, subCommand: 0 },
          { command: "love"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_LOVE },

          { command: "massage"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_MASSAGE },
          { command: "moan"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_MOAN },

          { command: "nibble"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NIBBLE },
          { command: "nod"       , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NOD },
          { command: "npcedit"   , minimumPosition: global.POS_DEAD    , functionPointer: do_npcedit    , minimumLevel: global.LEVEL_ADMINISTRATOR },
          { command: "nudge"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NUDGE },
          { command: "nuzzle"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NUZZLE },
          { command: "noauction" , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_auction, minimumLevel: 0, subCommand: 0 },
          { command: "nogossip"  , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_gossip , minimumLevel: 0, subCommand: 0 },
          { command: "nogoto"    , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_goto, minimumLevel: 0, subCommand: 0 },
          { command: "nogratz"   , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_gratz  , minimumLevel: 0, subCommand: 0 },
          { command: "noholler"  , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_holler , minimumLevel: 0, subCommand: 0 },
          { command: "noimmobile", minimumPosition: global.POS_DEAD    , functionPointer: do_tog_immobility, minimumLevel: 0, subCommand: 0 },
          { command: "noshout"   , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_shout  , minimumLevel: 0, subCommand: 0 },
          { command: "nosummon"  , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_summon , minimumLevel: 0, subCommand: 0 },
          { command: "nodrunk"   , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_drunk  , minimumLevel: 0, subCommand: 0 },
          
//           { command: "notell"   , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_tell   , minimumLevel: 0, subCommand: 0 },

          { command: "open"     , minimumPosition: global.POS_RESTING , functionPointer: do_open_door  , minimumLevel: 0, subCommand: 0 },

          { command: "pat"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_PAT },
          { command: "peer"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_PEER },
          { command: "point"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_POINT },
          { command: "poke"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_POKE },
          { command: "ponder"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_PONDER },
          { command: "pout"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_POUT },
//           { command: "practice" , minimumPosition: global.POS_RESTING , functionPointer: do_practice   , minimumLevel: 0, subCommand: 0 },
          { command: "pray"     , minimumPosition: global.POS_SITTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_PRAY },
          { command: "punch"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_PUNCH },
          { command: "purr"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_PURR },

          { command: "quit"     , minimumPosition: global.POS_DEAD    , functionPointer: do_quit       , minimumLevel: 0, subCommand: 0 },

          { command: "read"     , minimumPosition: global.POS_RESTING , functionPointer: do_read       , minimumLevel: 0, subCommand: 0 },
//           { command: "rescue"   , minimumPosition: global.POS_STANDING, functionPointer: do_rescue     , minimumLevel: 0, subCommand: 0 },
          { command: "remove"   , minimumPosition: global.POS_RESTING , functionPointer: do_remove     , minimumLevel: 0, subCommand: 0 },
//           { command: "rent"     , minimumPosition: global.POS_RESTING , functionPointer: do_rent       , minimumLevel: 0, subCommand: 0 },
//           { command: "report"   , minimumPosition: global.POS_RESTING , functionPointer: do_report     , minimumLevel: 0, subCommand: 0 },
          { command: "repair"   , minimumPosition: global.POS_RESTING , functionPointer: do_repair       , minimumLevel: 0, subCommand: 0 },
          { command: "reply"    , minimumPosition: global.POS_DEAD    , functionPointer: do_reply      , minimumLevel: 0, subCommand: 0 },
          { command: "rest"     , minimumPosition: global.POS_RESTING , functionPointer: do_rest       , minimumLevel: 0, subCommand: 0 },
          { command: "roll"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_ROLL },
          { command: "roomedit" , minimumPosition: global.POS_DEAD    , functionPointer: do_roomedit   , minimumLevel: global.LEVEL_ADMINISTRATOR },
          { command: "ruffle"   , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_RUFFLE },

          { command: "'"        , minimumPosition: global.POS_RESTING , functionPointer: do_say        , minimumLevel: 0, subCommand: 0 },
          { command: "say"      , minimumPosition: global.POS_RESTING , functionPointer: do_say        , minimumLevel: 0, subCommand: 0 },
          { command: "score"    , minimumPosition: global.POS_DEAD    , functionPointer: do_score      , minimumLevel: 0, subCommand: 0 },
          { command: "scream"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SCREAM },
//           { command: "sell"     , minimumPosition: global.POS_RESTING , functionPointer: do_sell       , minimumLevel: 0, subCommand: 0 },
          { command: "shake"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SHAKE },
          { command: "shiver"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SHIVER },
          { command: "sigh"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SIGH },
          { command: "shrug"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SHRUG },
          { command: "shout"    , minimumPosition: global.POS_RESTING,  functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_SHOUT },
//           { command: "sing"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SING },
          { command: "sip"      , minimumPosition: global.POS_RESTING , functionPointer: do_sip        , minimumLevel: 0 },
          { command: "sit"      , minimumPosition: global.POS_RESTING , functionPointer: do_sit        , minimumLevel: 0, subCommand: 0 },
          { command: "slap"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SLAP },
//           { command: "slay"     , minimumPosition: global.POS_RESTING , functionPointer: do_slay       , minimumLevel: 0, subCommand: 0 },
          { command: "sleep"    , minimumPosition: global.POS_SLEEPING, functionPointer: do_sleep      , minimumLevel: 0, subCommand: 0 },
          { command: "smile"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SMILE },
          { command: "smirk"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SMIRK },
          { command: "snap"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNAP },
          { command: "snarl"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNARL },
          { command: "sneeze"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNEEZE },
          { command: "snicker"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNICKER },
          { command: "sniff"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNIFF },
          { command: "snore"    , minimumPosition: global.POS_SLEEPING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNORE },
          { command: "snuggle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SNUGGLE },
          { command: "spank"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SPANK },
          { command: "spit"     , minimumPosition: global.POS_SITTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SPIT },
          { command: "stand"    , minimumPosition: global.POS_RESTING , functionPointer: do_stand      , minimumLevel: 0, subCommand: 0 },
          { command: "stare"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_STARE },
          { command: "statroom" , minimumPosition: global.POS_DEAD    , functionPointer: do_statroom   , minomumLevel: 0 },
          { command: "statitem" , minimumPosition: global.POS_DEAD    , functionPointer: do_statitem   , minimumLevel: 0 },
          { command: "steam"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_STEAM },
          { command: "strut"    , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_STRUT},
          { command: "sulk"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SULK },
          { command: "summon"   , minimumPosition: global.POS_STANDING, functionPointer: do_summon     , minimumLevel: 0, subCommand: 0 },

          { command: "tackle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TACKLE },
          { command: "take"     , minimumPosition: global.POS_RESTING , functionPointer: do_take       , minimumLevel: 0, subCommand: 0 },
          { command: "tango"    , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TANGO },
          { command: "taste"    , minimumPosition: global.POS_RESTING , functionPointer: do_taste      , minimumLevel: 0, subCommand: 0 },
          { command: "taunt"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TAUNT },
          { command: "tell"     , minimumPosition: global.POS_DEAD    , functionPointer: do_tell       , minimumLevel: 0, subCommand: 0 },
          { command: "thank"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_THANK },
          { command: "think"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_THINK },
          { command: "tickle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TICKLE },
          { command: "time"     , minimumPosition: global.POS_DEAD    , functionPointer: do_datetime   , minimumLevel: 0, subCommand: 0 },
          { command: "title"    , minimumPosition: global.POS_DEAD    , functionPointer: do_title      , minimumLevel: 0, subCommand: 0 },
          { command: "twiddle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TWIDDLE },
          { command: "typo"     , minimumPosition: global.POS_DEAD    , functionPointer: do_report_typo, minimumLevel: 0, subCommand: 0 },
          
//           { command: "ungroup"  , minimumPosition: global.POS_RESTING , functionPointer: do_ungroup    , minimumLevel: 0, subCommand: 0 },
          { command: "unlock"   , minimumPosition: global.POS_RESTING , functionPointer: do_unlock_door, minimumLevel: 0, subCommand: 0 },

//           { command: "value"    , minimumPosition: global.POS_RESTING , functionPointer: do_value,     minimumLevel: 0, subCommand: 0 },

          { command: "wake"    , minimumPosition: global.POS_SLEEPING , functionPointer: do_wake         , minimumLevel: 0, subCommand: 0 },
          { command: "wave"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WAVE },
//           //{ command: "weather"  , minimumPosition: global.POS_RESTING , functionPointer: do_weather    , minimumLevel: 0, subCommand: 0 },
          { command: "wear"     , minimumPosition: global.POS_RESTING , functionPointer: do_wear       , minimumLevel: 0, subCommand: 0 },
          { command: "whine"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WHINE },
          { command: "whistle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WHISTLE },
          { command: "who"      , minimumPosition: global.POS_DEAD    , functionPointer: do_who        , minimumLevel: 0, subCommand: 0 },
//           //{ command: "whoami"   , minimumPosition: global.POS_DEAD    , functionPointer: do_whoami     , minimumLevel: 0, subCommand: 0 },
          { command: "wiggle"   , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WIGGLE },
          { command: "wink"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WINK },
          { command: "worship"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WORSHIP },
          { command: "worldedit", minimumPosition: global.POS_DEAD    , functionPointer: do_worldedit  , minimumLevel: global.LEVEL_ADMINISTRATOR },
          { command: "write"    , minimumPosition: global.POS_RESTING , functionPointer: do_write      , minimumLevel: 0, subCommand: 0 },

          { command: "yawn"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_YAWN },
          { command: "yodel"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_YODEL },
          
          { command: "/"        , minimumPosition: global.POS_STANDING, functionPointer: do_home       , minimumLevel: 0, subCommand: 0 },
          { command: "@"        , minimumPosition: global.POS_DEAD    , functionPointer: do_tell       , minimumLevel: 0, subCommand: 0 }
    ];


Interpreter.prototype.cleanInput = function(input) {
    var cleanInput = input.trim().toLowerCase();
    var doubleSpaces = input.indexOf('  ');
    
    while(doubleSpaces > -1) {
            cleanInput = cleanInput.replace('  ', ' ');
            doubleSpaces = cleanInput.indexOf('  ');
        }

    return cleanInput;
};

Interpreter.prototype.dropFill = function(tokens) {
    var fill = ["in", "from", "with", "the", "on", "at", "to" ];

    var cleanedTokens = tokens.slice();
    
    for(var i = 0; i < fill.length; i++) {
        while(cleanedTokens.indexOf(fill[i]) > -1) {
            cleanedTokens.splice(cleanedTokens.indexOf(fill[i]), 1);
        }
    }
    
    return cleanedTokens;
};

Interpreter.prototype.tokenize = function(input) {
    var tokens = input.split(' ');    
    return tokens;
};

Interpreter.prototype.getCommand = function(character, input) {
    if(input.length === 0) {
        return null;
    }    
    
    var cleanedInput = this.cleanInput(input);
    var tokens = this.tokenize(cleanedInput);
    var cleanedTokens = this.dropFill(tokens);

    if(cleanedTokens.length < 1) {
        return null;
    }
    
    var commandToken = cleanedTokens[0];
    
    if(commandToken === null || commandToken === " ") {
        return null;
    }
    
    var command = null;
    
    for(var i = 0; i < COMMAND_LIST.length; i++) {
        if(COMMAND_LIST[i].command.substr(0, commandToken.length) === commandToken) {
            command = COMMAND_LIST[i];
            command.subInput = input.replace(commandToken, '').trim();
            break;
        }
    }

    if(command === null) {
        // Might be a command associated with an item (eventually the room too)
        // Special commands for items start with finding the item, I guess?
        
        var targetList = character.room.npcs.concat(character.inventory).concat(character.wearing).concat(character.room.contents);
		var target = targetList.findByKeyword(commandToken);
		
		if(target.items.length > 0) {
    		var targetCommands = target.items[0].getCommands();
    		
    		if(cleanedTokens.length > 1) {
        		commandToken = cleanedTokens[1];
        		
        		//console.log(targetCommands);
    
        		if(targetCommands !== null) {
            		for(var i = 0; i < targetCommands.length; i++) {
            		    if(targetCommands[i].command.substr(0, commandToken.length) === commandToken) {
                            command = targetCommands[i];
                            command.subInput = input.replace(commandToken, '').trim();
                            command.isSpecial = true;
                            break;
            		    }
            		}
        		}
    		}
		}
    }

    if(command !== null) {
        if(cleanedTokens.length > 1) {
            command.tokens = cleanedTokens.slice(1);
            command.allTokens = tokens.slice(1);
        }
        else {
            command.tokens = [];
            command.allTokens = [];
        }
    }

    return command;
};



Interpreter.prototype.handleInput = function(character, input) {
    if(input.length === 0) {
        character.emitMessage("");
        return;
    }
    
	var command = this.getCommand(character, input);

    if(command === null) {
        character.emitMessage("Huh?!?");
    }
    else {
        if(character.position < command.minimumPosition) {
            switch(character.position) {
                case global.POS_DEAD:
                    character.emitMessage("Lie still; you are DEAD!!! :-(" );
                    break;
                case global.POS_INCAP:
                case global.POS_MORTALLYW:
                    character.emitMessage("You are in a pretty bad shape, unable to do anything!");
                    break;
                case global.POS_STUNNED:
                    character.emitMessage("All you can do right now is think about the stars!");
                    break;
                case global.POS_SLEEPING:
                    character.emitMessage("In your dreams, or what?");
                    break;
                case global.POS_RESTING:
                    character.emitMessage("Nah... You feel too relaxed to do that...");
                    break;
                case global.POS_SITTING:
                    character.emitMessage("Maybe you should get on your feet first?");
                    break;
                case global.POS_FIGHTING:
                    character.emitMessage("No way!  You're fighting for your life!");
                    break;                    
            }
        }
        else if(character.level < command.minimumLevel) {
            character.emitMessage("Huh?!?");
        }
        else {
            if(command.isSpecial === true) {
                var output = command.functionPointer(character, command);
                
                console.log(output);
                
                if(output !== undefined) {
                    if(output.emit !== undefined && output.emit !== null) {
                        output.emit();
                    }
                }
            }
            else {
                command.functionPointer(character, command);
            }
        }
    }
    
    if(!character.isNpc()) {
        character.save(function(err) {
          // TODO: Log error?
        });
    }
};


function do_action(character, command) {
    var action = global.SOCIALS[command.subCommand];
    var social = new Social(action, command.subInput.trim(), character);
    
    var output = social.getOutput();
    // console.log(output);
    output.emit();
}

function do_move(character, command) {
    character.move(command.subCommand).emit();
}

function do_exits(character, command) {
    character.room.listExits(character).emit();
}

function do_stand(character) {
    character.stand().emit();
}

function do_sit(character, command) {
    if(command.tokens.length === 0) {
        character.sit().emit();
    }
    else {
        character.sitRestSleepOnFurniture(command.tokens[0], 'sit', global.POS_SITTING).emit();
    }
}

function do_rest(character, command) {
    if(command.tokens.length === 0)
        character.rest().emit();
    else {
        character.sitRestSleepOnFurniture(command.tokens[0], 'rest', global.POS_RESTING).emit();
    }
}

function do_sleep(character) {
    character.sleep().emit();
}

function do_wake(character, command) {
    // if(command.tokens.length === 0) {
        character.wake().emit();
    // }
    // else {
    //     character.wakeCharacter(command.tokens[0]);
    // }
}

function do_say(character, command) {
    character.say(command.subInput.trim()).emit();
}

function do_gen_comm(character, command) {
    character.generalCommunication(command.subCommand, command.subInput.trim()).emit();
}

function do_tog_immobility(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleImmobility(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleImmobility(false).emit();
        }
        else {
            character.toggleImmobility().emit();
        }
    }
    else {
        character.toggleImmobility().emit();
    }
}

function do_tog_goto(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleGoto(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleGoto(false).emit();
        }
        else {
            character.toggleGoto().emit();
        }
    }
    else {
        character.toggleGoto().emit();
    }
}

function do_tog_auction(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleAuction(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleAuction(false).emit();
        }
        else {
            character.toggleAuction().emit();
        }
    }
    else {
        character.toggleAuction().emit();
    }
}

function do_tog_gossip(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleGossip(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleGossip(false).emit();
        }
        else {
            character.toggleGossip().emit();
        }
    }
    else {
        character.toggleGossip().emit();
    }
}

function do_tog_gratz(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleGratz(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleGratz(false).emit();
        }
        else {
            character.toggleGratz().emit();
        }
    }
    else {
        character.toggleGratz().emit();
    }
}

function do_tog_holler(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleHoller(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleHoller(false).emit();
        }
        else {
            character.toggleHoller().emit();
        }
    }
    else {
        character.toggleHoller().emit();
    }
}

function do_tog_shout(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleShout(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleShout(false).emit();
        }
        else {
            character.toggleShout().emit();
        }
    }
    else {
        character.toggleShout().emit();
    }
}

function do_tog_summon(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleSummon(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleSummon(false).emit();
        }
        else {
            character.toggleSummon().emit();
        }
    }
    else {
        character.toggleSummon().emit();
    }
}


function do_tog_drunk(character, command) {
    if(command.tokens.length > 0) {
        if(command.tokens[0].toLowerCase().trim() === "on") {
            character.toggleDrunk(true).emit();
        }
        else if(command.tokens[0].toLowerCase().trim() === "off") {
            character.toggleDrunk(false).emit();
        }
        else {
            character.toggleDrunk().emit();
        }
    }
    else {
        character.toggleDrunk().emit();
    }
}

function do_quit(character) {
     character.emitMessage("Goodbye friend.... Come back soon!");
     character.emitRoomMessage(character.name + " has quit the game.");

     if(character.socket !== undefined) {
         character.socket.player = null;
         character.socket.disconnect();
     }
    
     character.room.removeCharacter(character);
     character.world.removeCharacter(character);
}

function do_oneObjectAction(character, command, oneArgFunction, twoArgFunction, verb) {
    if(command.tokens.length === 0) {
        character.emitMessage(verb + " what?");
    }
    else if(command.tokens.length === 1) {
        oneArgFunction.call(character, command.tokens[0]).emit();
    }
    else if(command.tokens.length === 2) {
        twoArgFunction.call(character, command.tokens[0], command.tokens[1]).emit();
    }    
    else {
        character.emitMessage(verb + " what?");
    }
}

function do_take(character, command) {
   do_oneObjectAction(character, command, character.takeItem, character.takeItems, 'take');
}

function do_donate(character, command) {
   do_oneObjectAction(character, command, character.donateItem, character.donateItems, 'donate');
}

function do_drop(character, command) {
   do_oneObjectAction(character, command, character.dropItem, character.dropItems, 'drop');
}

function do_junk(character, command) {
   do_oneObjectAction(character, command, character.junkItem, character.junkItems, 'junk');
}

function do_eat(character, command) {
   do_oneObjectAction(character, command, character.eatItem, character.eatItems, 'eat');
}

function do_taste(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage('Taste what?');
    }
    else {
        character.tasteItem(command.tokens[0]).emit();
    }
}

function do_drink(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Drink what?");
    }
    else {
        if(command.tokens[0].toLowerCase() === 'from') {
            character.drinkItem(command.tokens[1]).emit();
        }
        else {
            character.drinkItem(command.tokens[0]).emit();
        }
    }
}

function do_sip(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Sip what?");
    }
    else {
        if(command.tokens[0].toLowerCase() === 'from') {
            character.sipItem(command.tokens[1]).emit();
        }
        else {
            character.sipItem(command.tokens[0]).emit();
        }
    }
}

function do_give(character, command) {
    if(command.tokens.length < 2) {
         character.emitMessage('Give what to who?');
    }
    else if(command.tokens.length > 2) {
        character.giveItems(command.tokens[0], command.tokens[1], command.tokens[2]).emit();
    }
    else {
        character.giveItem(command.tokens[0], command.tokens[1]).emit();
    }
}

function do_feed(character, command) {
    if(command.tokens.length < 2) {
        character.emitMessage('Feed what to who?');
    }
    else if(command.tokens.length > 2) {
        character.feedItems(command.tokens[0], command.tokens[1], command.tokens[2]).emit();
    }
    else {
        character.feedItem(command.tokens[0], command.tokens[1]).emit();
    }
}

function do_look(character, command) {
    if(command.tokens.length === 0) {
        character.room.showRoomToCharacter(character).emit();
    }
    else {
        character.lookTarget(command.tokens[0]).emit();
    }
}

function do_score(character) {
    character.listScore().emit();
}

function do_apparel(character) {
    character.listApparel().emit();
}

function do_inventory(character) {
    character.listInventory().emit();
}

function do_title(character, command) {
    character.setTitle(command.subInput).emit();
}

function do_tell(character, command) {
    if(command.tokens.length > 0) {
        character.tell(command.tokens[0], command.subInput.replace(command.tokens[0], '').trim()).emit();
    }
    else {
        character.emitMessage("Tell what to who?");
    }
}

function do_reply(character, command) {
    character.reply(command.subInput.trim()).emit();
}

function do_repair(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Repair what?");
    }
    else {
        character.repairItem(command.tokens[0]).emit();
    }
}

function do_report_bug(character, command) {
    var bugReport = command.subInput.trim();
    
    if(bugReport.length === 0) {
        character.emitMessage("Ok, but what's the bug you want to report?");
    }
    else {
        var bugToSave = new bug( { reporter: character.name, message: bugReport } );
        
        bugToSave.save(function(err) {
          // TODO: Log error?
        });        
        
        character.emitMessage("Ok. Thanks for the bug report.");
    }
}

function do_submit_idea(character, command) {
    var ideaReport = command.subInput.trim();

    if(ideaReport.length === 0) {
        character.emitMessage("Ok, but what's your idea?");
    }
    else {
        var ideaToSave = new idea( { reporter: character.name, message: ideaReport } );
        
        ideaToSave.save(function(err) {
          // TODO: Log error?
        });        
        
        character.emitMessage("Ok. Thanks for the idea!");
    }
}

function do_report_typo(character, command) {
    var typoReport = command.subInput.trim();

    if(typoReport.length === 0) {
        character.emitMessage("Ok, but what's the typo you want to report?");
    }
    else {
        var typoToSave = new typo( { reporter: character.name, message: typoReport } );
        
        typoToSave.save(function(err) {
          // TODO: Log error?
        });        
        
        character.emitMessage("Ok. Thanks for reporting the typo.");
    }
}

function do_goto(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Go to who?");
    }
    else {
        if(isNaN(command.tokens[0])) {
            character.goToChararacter(command.tokens[0]).emit();
        }
        else {
            character.goToRoom(command.tokens[0]).emit();
        }
    }
}

function do_summon(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Summon to who?");
    }
    else {
        character.summonChararacter(command.tokens[0]).emit();
    }
}

function do_home(character) {
    character.goToRoom(global.START_ROOM).emit();
}

function do_datetime(character) {
    character.emitMessage(character.world.time.getDisplayTime());
    character.emitMessage(character.world.time.getDisplayDate());
}

function do_emote(character, command) {
    character.emote(command.subInput.trim()).emit();
}

function do_close_door(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Close what?");
    }
    else if(command.tokens.length === 1) {
        // This is like 'close door'
        character.openCloseDoor(command.tokens[0], global.SCMD_CLOSEDOOR).emit();
    }
    else {
        // This is like 'close door west'
        // TODO Implement this function
        // character.closeDoor(command.tokens[0], command.tokens[1]);
    }
}

function do_open_door(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Open what?");
    }
    else if(command.tokens.length === 1) {
        // This is like 'open door'
        character.openCloseDoor(command.tokens[0], global.SCMD_OPENDOOR).emit();
    }
    else {
        // This is like 'open door west'
        // TODO Implement this function
        // character.openDoor(command.tokens[0], command.tokens[1]);
    }
}

function do_unlock_door(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Unlock what?");
    }
    else if(command.tokens.length === 1) {
        character.lockUnlockDoor(command.tokens[0], global.SCMD_UNLOCKDOOR).emit();
    }
    else {
        // This is like 'unlock door west'
        // TODO: Implement this
        // character.unlockDoor(command.tokens[0], command.tokens[1]);
    }
}

function do_lock_door(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Lock what?");
    }
    else if(command.tokens.length === 1) {
        character.lockUnlockDoor(command.tokens[0], global.SCMD_LOCKDOOR).emit();
    }
    else {
        // This is like 'lock door west'
        // TODO: Implement this
        // character.lockDoor(command.tokens[0], command.tokens[1]);
    }
}

function do_who(character) {
    character.emitMessage("Players --------------------------------------------");
    
    var playerCount = 0;
    
    // TODO: What if character can't see players[i]?
    for(var i = 0; i < character.world.players.length; i++) {
        if(character.world.players[i].level < global.LEVEL_ADMINISTRATOR) {
            character.emitMessage("   " + character.world.players[i].getNameAndTitle());
        }
        else if(character.world.players[i].level < global.LEVEL_IMPLEMENTOR) {
            character.emitMessage('   [Admin] ' + character.world.players[i].getNameAndTitle(), 'Orange');
        }
        else {
            character.emitMessage('   [Implementor] ' + character.world.players[i].getNameAndTitle(), 'Yellow');
        }
        playerCount++;
    }
    
    if(playerCount === 1) {
        character.emitMessage("One lonely player displayed.");
    }
    else {
        character.emitMessage(playerCount + " players displayed.");
    }
}

function do_wear(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Wear what?");
    }
    else if(command.tokens.length === 1) {
        character.wearItem(command.tokens[0]).emit();
    }
    // else {
    //     var locationToken = command.tokens[1].toLowerCase();
        
    //     for(var i = 0; i < global.WEAR_LIST.length; i++) {
    //         if(global.WEAR_LIST[i].substr(0, locationToken.length) === locationToken) {
    //             character.wearItemAtLocation(command.tokens[0], i).emit();
    //             return;
    //         }
    //     }
        
    //     character.emitMessage("Wear what where?");
    // }
}

function do_remove(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Remove what?");
    }
    else {
        character.removeItem(command.tokens[0]).emit();
    }
}

function do_read(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Read what?");
    }
    else {
        character.readItem(command.tokens[0]).emit();
    }
}

function do_write(character, command) {
    if(command.tokens.length < 2) {
        character.emitMessage("Write on what? And with what?");
        return;
    }
    
    character.writeNote(command.tokens[0], command.tokens[1]).emit();
}



// function do_list(character) {
//     var shop = character.getShop();
    
//     if(shop === null) {
//         character.emitMessage(global.CANNOT_DO_THAT_HERE);
//     }
//     else {
//         shop.listItemsForSale(character).emit();
//     }
// }

function do_help(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage("The following commands are available: ");
        
        var commandArrayForOutput = [];

        for(var i = 1; i <= COMMAND_LIST.length; i++) {
            if(character.level >= COMMAND_LIST[i - 1].minimumLevel) {
                commandArrayForOutput.push(COMMAND_LIST[i - 1].command);
            }
        }

        var helpColumnsArray = utility.makeFormattedColumns(commandArrayForOutput, 5, 19, "    ");

        for(var i = 0; i < helpColumnsArray.length; i++) {
            character.emitMessage(helpColumnsArray[i]);
        }
    }
    else {
        helpdoc.display(command.tokens[0], function(helpdocsFromDb) {
            if(helpdocsFromDb.length === 0) {
                character.emitMessage('No help is available on that topic.');
            }
            else {
                console.log(helpdocsFromDb);
                
                character.emitMessage(helpdocsFromDb[0].topic.toUpperCase(), 'Yellow');
                character.emitMessage('------------------------------------------------------------------------------');
                character.emitMessage(utility.getFormattedLongString(helpdocsFromDb[0].value, false));
                
                if(helpdocsFromDb[0].seeAlso !== null && helpdocsFromDb[0].seeAlso !== undefined) {
                    var seeAlso = 'See Also: ' + helpdocsFromDb[0].seeAlso.join(', ');
                    character.emitMessage(seeAlso, 'Yellow');
                }
            }
        });
    }
}

function do_helpedit(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('Ok... edit help, yes, but how?');
        character.emitMessage('add, delete, description, addseealso, removeseealso');
        return;
    }
    
    switch(command.tokens[0].toLowerCase()) {
        case 'add':
            if(command.tokens.length < 2) {
                character.emitMessage('Ok... but what topic do you want to add?');
                return;
            }
            else {
	           helpdoc.addTopic(command.tokens[1], character);
            }
            break;
        case 'delete':
            if(command.tokens.length < 2) {
                character.emitMessage('Ok... but what topic do you want to delete?');
                return;
            }
            else {
                helpdoc.deleteTopic(command.tokens[1], character);
            }
            break;
        case 'description':
            if(command.tokens.length < 2) {
                character.emitMessage('Ok... but what topic do you want to change?');
                return;
            }
            else {
                var helpdocValue = command.subInput.split(' ');
                helpdocValue.shift();
                helpdocValue.shift();
                helpdoc.setDescription(command.tokens[1], helpdocValue.join(' '), character);
            }
            break;
        case 'addseealso':
            if(command.tokens.length < 2) {
                character.emitMessage('Ok... but what topic do you want to change?');
                return;
            }
            else {
                if(command.tokens.length < 3) {
                    character.emitMessage('Ok... but what "seealso" do you want to add to ' + command.tokens[1] + '?');
                    return;
                }
                else {
                    helpdoc.addSeeAlso(command.tokens[1], command.tokens[2], character);
                }
            }
            break;
        case 'removeseealso':
            if(command.tokens.length < 2) {
                character.emitMessage('Ok... but what topic do you want to change?');
                return;
            }
            else {
                if(command.tokens.length < 3) {
                    character.emitMessage('Ok... but what "seealso" do you want to remove from ' + command.tokens[1] + '?');
                    return;
                }
                else {
                    helpdoc.removeSeeAlso(command.tokens[1], command.tokens[2], character);
                }
            }
            break;
        default:
            character.emitMessage('Helpedit: add delete description addseealso removeseealso');
            break;
    }
}

//////////// ONLINE CREATION FUNCTIONS

function do_roomedit(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('Ok... edit a room, but how and which one?');
        character.emitMessage('add, delete, settitle, setdescription, addexit, removeexit');
        return;
    }
    
    switch(command.tokens[0].toLowerCase()) {
        case 'add':
            var roomTitle = command.subInput.split(' ');
            roomTitle.shift();
            room.addRoom(roomTitle.join(' '), character);
            break;
        case 'delete':
            room.deleteRoom(command.tokens[1], character);
            break;
        case 'settitle':
            if(command.tokens.length < 3) {
                character.emitMessage('Usage: roomedit settitle roomid <room title here>');
                return;
            }
            
            if(isNaN(command.tokens[1])) {
                character.emitMessage('Usage: roomedit settitle roomid <room title here>');
                return;
            }
            
            var roomTitle = command.subInput.split(' ');
            roomTitle.shift();
            roomTitle.shift();
            roomTitle = roomTitle.join(' ');
            room.setTitle(command.tokens[1], character, roomTitle);
            break;
        case 'setdescription':
            if(command.tokens.length < 3) {
                character.emitMessage('Usage: roomedit settitle roomid <room title here>');
                return;
            }
            
            if(isNaN(command.tokens[1])) {
                character.emitMessage('Usage: roomedit settitle roomid <room title here>');
                return;
            }
            
            var roomDescription = command.subInput.split(' ');
            roomDescription.shift();
            roomDescription.shift();
            roomDescription = roomDescription.join(' ');
            room.setDescription(command.tokens[1], character, roomDescription);
            break;
        case 'addexit':
            if(command.tokens.length < 4 || isNaN(command.tokens[1]) || isNaN(command.tokens[3])) {
                character.emitMessage('Usage: roomedit addexit roomid <direction:N/S/E/W/U/D> <toRoomId>');
                return;
            }
            
            room.addExit(command.tokens[1], character, command.tokens[2], command.tokens[3]);
            break;
        case 'removeexit':
            if(command.tokens.length < 3 || isNaN(command.tokens[1])) {
                character.emitMessage('Usage: roomedit removeexit roomid <direction:N/S/E/W/U/D>');
                return;
            }
            
            room.removeExit(command.tokens[1], character, command.tokens[2]);
            break;
        default:
            character.emitMessage('Roomedit: add delete settitle setdescription, addexit, removeexit');
            break;
    }
}

function do_dooredit(character, command) {
    if(command.tokens.length < 2) {
        character.emitMessage('Dooredit: roomid <direction:N/S/E/W/U/D>');
        character.emitMessage('Then the wizard will ask for specific things.');
    }
    else {
        room.doorEdit(command.tokens[0], character, command.tokens[1]);
    }
}

function do_listrooms(character, command) {
    for(var i = 0; i < character.world.rooms.length; i++) {
        character.emitMessage(character.world.rooms[i].id + " :: " + character.world.rooms[i].title);
    }
}

function do_findrooms(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('But what rooms do you want to search for?');
        return;
    }

    for(var i = 0; i < character.world.rooms.length; i++) {
        if(character.world.rooms[i].title.indexOf(command.tokens[0]) > -1) {
            character.emitMessage(character.world.rooms[i].id + " :: " + character.world.rooms[i].title);
        }
    }
}

function do_statroom(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('But what item do you want to get the stats on?');
        return;
    }

    if(isNaN(command.tokens[0])) {
        character.emitMessage('But what is the ID of the item you want to get the stats on?');
        return;
    }

    var id = parseInt(command.tokens[0], 10);
    Item.itemStat(character, id);
}

function do_statroom(character, command) {
    // if(command.tokens.length < 1) {
    //     character.emitMessage('But what room do you want to get the stats on?');
    //     return;
    // }

    // if(isNaN(command.tokens[0])) {
    //     character.emitMessage('But what is the ID of the room you want to get the stats on?');
    //     return;
    // }

    // var id = parseInt(command.tokens[0], 10);

    // for(var i = 0; i < character.world.rooms.length; i++) {
    //     if(character.world.rooms[i].id === id) {
    //         character.emitMessage(character.world.rooms[i].toString());
    //         break;
    //     }
    // }

    // TODO: Implement this but differently -- people can see password and other details :(

    character.emitMessage('Not implemented at the moment.');
}

function do_listitems(character, command) {
    Item.itemList(character);
}

function do_finditems(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('But what item do you want to search for?');
        return;
    }

    Item.itemFind(character, command.tokens[0]);
}

function do_statitem(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('But what item do you want to get the stats on?');
        return;
    }

    if(isNaN(command.tokens[0])) {
        character.emitMessage('But what is the ID of the item you want to get the stats on?');
        return;
    }

    var id = parseInt(command.tokens[0], 10);
    Item.itemStat(character, id);
}

function do_itemedit(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('Ok... edit an item, but how and which one?');
        character.emitMessage('add delete edit');
        return;
    }
    
    switch(command.tokens[0].toLowerCase()) {
        case 'add':
            if(command.tokens.length < 2) {
                character.emitMessage('But what kind of item do you want to make?');
            }
            else {
                switch(command.tokens[1]) {
                    case "food":
                        Food.addFood(character);
                        break;
                    default:
                        character.emitMessage('Sorry -- you cannot create that type of item (yet)');
                        character.emitMessage('Valid items types currently are: food');
                        break;
                }
            }
            break;
        case 'delete':
            character.emitMessage('Not done yet.');
            break;
        case 'edit':
            if(command.tokens.length < 2) {
                character.emitMessage('But what is the id of the item you want to edit?');
            }
            else {
                Item.itemEdit(command.tokens[1], character);
            }
            break;
        default:
            character.emitMessage('Itemedit: add delete edit');
            break;            
    }
    // character.emitMessage('Not done yet.');
}

function do_npcedit(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('Ok... edit a NPC, but how and which one?');
        character.emitMessage('add delete edit');
        return;
    }

    switch(command.tokens[0].toLowerCase()) {
        case 'add':
            Npc.addNpc(character);
            break;
        case 'delete':
            character.emitMessage('Not done yet.');
            break;
        case 'edit':
            if(command.tokens.length < 2) {
                character.emitMessage('But what is the id of the item you want to edit?');
            }
            else {
                // character.emitMessage("Not done yet, bro.");
                Npc.npcEdit(command.tokens[1], character);
            }
            break;
        default:
            character.emitMessage('NPCedit: add delete edit');
            break;            
    }
}

function do_create(character, command) {
    if(command.tokens.length < 0) {
        character.emitMessage("Usage: create <itemnumber>");
    }
    
    var newItemId = parseInt(command.tokens[0], 10);
    Item.loadIntoInventory(newItemId, character);
}

function do_worldedit(character, command) {
    if(command.tokens.length < 1) {
        character.emitMessage('Ok... edit a world reset command... but how?');
        character.emitMessage('add delete edit');
        return;
    }

    switch(command.tokens[0].toLowerCase()) {
        case 'add':
            Resetcommand.addResetcommand(character);
            break;
        case 'delete':
            character.emitMessage('Not done yet.');
            break;
        case 'edit':
            Resetcommand.resetcommandEdit(command.tokens[1], character);
            break;
        default:
            character.emitMessage('WorldEdit: add delete edit');
            break;
    }
}

// Exports
module.exports = Interpreter;