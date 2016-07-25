var constants = require("./constants");
var bug = require("./bug").bug;
var idea = require("./idea").idea;
var typo = require("./typo").typo;

var Social =  require("./social");
var Character = require("./character");
var Output = require("./output");


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

          { command: "accuse"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_ACCUSE },
          { command: "applaud"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_APPLAUD },
          { command: "auction"  , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_AUCTION },

        //   { command: "balance"  , minimumPosition: global.POS_RESTING , functionPointer: do_balance    , minimumLevel: 0, subCommand: 0 },
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
//           { command: "check"    , minimumPosition: global.POS_RESTING , functionPointer: do_checkMail  , minimumLevel: 0, subCommand: 0 },
          { command: "chuckle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CHUCKLE },
          { command: "clap"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CLAP },
//           { command: "close"    , minimumPosition: global.POS_RESTING , functionPointer: do_close_door , minomumLevel: 0, subCommand: 0 },
          { command: "comb"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_COMB },
          { command: "comfort"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_COMFORT },
//           { command: "consider" , minimumPosition: global.POS_RESTING , functionPointer: do_consider   , minimumLevel: 0, subCommand: 0 },
          { command: "congrat"  , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GRATZ },
          { command: "cough"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_COUGH },
          { command: "cringe"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CRINGE },
          { command: "cry"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CRY },
          { command: "cuddle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CUDDLE },
          { command: "curse"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CURSE },
          { command: "curtsey"  , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_CURTSEY },
          
          { command: "dance"    , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_DANCE },
          { command: "date"     , minimumPosition: global.POS_DEAD    , functionPointer: do_stardate   , minimumLevel: 0, subCommand: 0 },
                    
          { command: "daydream" , minimumPosition: global.POS_SLEEPING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_DAYDREAM },
        //   { command: "deposit"  , minimumPosition: global.POS_RESTING , functionPointer: do_deposit    , minimumLevel: 0, subCommand: 0 },
        //   { command: "drink"    , minimumPosition: global.POS_RESTING , functionPointer: do_drink      , minimumLevel: 0, subCommand: global.SCMD_DRINK },
          { command: "donate"   , minimumPosition: global.POS_RESTING , functionPointer: do_donate     , minimumLevel: 0, subCommand: 0 },
          { command: "drop"     , minimumPosition: global.POS_RESTING , functionPointer: do_drop       , minimumLevel: 0, subCommand: 0 },
          { command: "drool"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_DROOL },

          { command: "eat"      , minimumPosition: global.POS_RESTING , functionPointer: do_eat        , minimumLevel: 0, subCommand: global.SCMD_EAT },
          { command: "embrace"  , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_EMBRACE },
          { command: "emote"    , minimumPosition: global.POS_RESTING , functionPointer: do_emote      , minimumLevel: 0, subCommand: 0 },
//           { command: "equipment", minimumPosition: global.POS_DEAD    , functionPointer: do_equipment  , minimumLevel: 0, subCommand: 0 },
          { command: "exits"    , minimumPosition: global.POS_RESTING , functionPointer: do_exits      , minimumLevel: 0, subCommand: 0 },

          { command: "fart"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_FART },
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
        //   { command: "give"     , minimumPosition: global.POS_RESTING , functionPointer: do_give       , minimumLevel: 0, subCommand: 0 },
          { command: "glare"    , minimumPosition: global.POS_RESTING,  functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_GLARE },
//           { command: "gold"     , minimumPosition: global.POS_SLEEPING, functionPointer: do_gold       , minimumLevel: 0, subCommand: 0 },
          { command: "gossip"   , minimumPosition: global.POS_SLEEPING, functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_GOSSIP },
//           { command: "goto"     , minimumPosition: global.POS_RESTING , functionPointer: do_goto       , minimumLevel: 0, subCommand: 0 },
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

          { command: "hiccup"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_HICCUP },
//           { command: "hit"      , minimumPosition: global.POS_RESTING , functionPointer: do_hit        , minimumLevel: 0, subCommand: 0 },
          { command: "holler"   , minimumPosition: global.POS_RESTING,  functionPointer: do_gen_comm   , minimumLevel: 0, subCommand: global.SCMD_HOLLER },
          { command: "hug"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_HUG },

          { command: "inventory", minimumPosition: global.POS_DEAD    , functionPointer: do_inventory  , minimumLevel: 0, subCommand: 0 },
          { command: "idea"     , minimumPosition: global.POS_DEAD    , functionPointer: do_submit_idea, minimumLevel: 0, subCommand: 0 },
//           { command: "insult"   , minimumPosition: global.POS_RESTING , functionPointer: do_insult     , minimumLevel: 0, subCommand: 0 },

          { command: "junk"     , minimumPosition: global.POS_RESTING , functionPointer: do_junk       , minimumLevel: 0, subCommand: 0 },

//           { command: "kick"     , minimumPosition: global.POS_FIGHTING, functionPointer: do_kick       , minimumLevel: 0, subCommand: 0 },
          { command: "kiss"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_KISS },

        //   { command: "look"     , minimumPosition: global.POS_RESTING , functionPointer: do_look       , minimumLevel: 0, subCommand: 0},
          { command: "laugh"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_LAUGH },
          { command: "lick"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_LICK },
//           { command: "list"     , minimumPosition: global.POS_RESTING , functionPointer: do_list       , minimumLevel: 0, subCommand: 0 },

//           { command: "lock"     , minimumPosition: global.POS_RESTING , functionPointer: do_lock_door  , minimumLevel: 0, subCommand: 0 },
          { command: "love"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_LOVE },

          { command: "massage"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_MASSAGE },
//           { command: "mail"     , minimumPosition: global.POS_RESTING , functionPointer: do_sendMail   , minimumLevel: 0, subCommand: 0 },
          { command: "moan"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_MOAN },

          { command: "nibble"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NIBBLE },
          { command: "nod"      , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NOD },
          { command: "nudge"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NUDGE },
          { command: "nuzzle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_NUZZLE },
        //   { command: "noauction", minimumPosition: global.POS_DEAD    , functionPointer: do_tog_auction, minimumLevel: 0, subCommand: 0 },
        //   { command: "nogossip" , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_gossip , minimumLevel: 0, subCommand: 0 },
        //   { command: "nogratz"  , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_gratz  , minimumLevel: 0, subCommand: 0 },
        //   { command: "noholler" , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_holler , minimumLevel: 0, subCommand: 0 },
        //   { command: "noshout"  , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_shout  , minimumLevel: 0, subCommand: 0 },
//           { command: "notell"   , minimumPosition: global.POS_DEAD    , functionPointer: do_tog_tell   , minimumLevel: 0, subCommand: 0 },

//           { command: "open"     , minimumPosition: global.POS_RESTING , functionPointer: do_open_door  , minimumLevel: 0, subCommand: 0 },

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

        //   { command: "quit"     , minimumPosition: global.POS_STANDING, functionPointer: do_quit       , minimumLevel: 0, subCommand: 0 },

//           { command: "read"     , minimumPosition: global.POS_RESTING , functionPointer: do_read       , minimumLevel: 0, subCommand: 0 },
//           { command: "receive"  , minimumPosition: global.POS_RESTING , functionPointer: do_receiveMail, minimumLevel: 0, subCommand: 0 },
//           { command: "rescue"   , minimumPosition: global.POS_STANDING, functionPointer: do_rescue     , minimumLevel: 0, subCommand: 0 },
//           { command: "remove"   , minimumPosition: global.POS_RESTING , functionPointer: do_remove     , minimumLevel: 0, subCommand: 0 },
//           { command: "rent"     , minimumPosition: global.POS_RESTING , functionPointer: do_rent       , minimumLevel: 0, subCommand: 0 },
//           { command: "report"   , minimumPosition: global.POS_RESTING , functionPointer: do_report     , minimumLevel: 0, subCommand: 0 },
          { command: "rest"     , minimumPosition: global.POS_RESTING , functionPointer: do_rest       , minimumLevel: 0, subCommand: 0 },
          { command: "roll"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_ROLL },
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
        //   { command: "sip"      , minimumPosition: global.POS_RESTING , functionPointer: do_drink      , minimumLevel: 0, subCommand: global.SCMD_SIP },
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
          { command: "stardate" , minimumPosition: global.POS_DEAD    , functionPointer: do_stardate   , minimumLevel: 0, subCommand: 0 },
          { command: "stare"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_STARE },
          { command: "steam"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_STEAM },
          { command: "strut"    , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_STRUT},
          { command: "sulk"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_SULK },

          { command: "tackle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TACKLE },
          { command: "take"     , minimumPosition: global.POS_RESTING , functionPointer: do_take       , minimumLevel: 0, subCommand: 0 },
          { command: "tango"    , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TANGO },
        //   { command: "taste"    , minimumPosition: global.POS_RESTING , functionPointer: do_eat        , minimumLevel: 0, subCommand: global.SCMD_TASTE },
          { command: "taunt"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TAUNT },
        //   { command: "tell"     , minimumPosition: global.POS_DEAD    , functionPointer: do_tell       , minimumLevel: 0, subCommand: 0 },
          { command: "thank"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_THANK },
          { command: "think"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_THINK },
          { command: "tickle"   , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TICKLE },
          { command: "time"     , minimumPosition: global.POS_DEAD    , functionPointer: do_stardate   , minimumLevel: 0, subCommand: 0 },
          { command: "title"    , minimumPosition: global.POS_DEAD    , functionPointer: do_title      , minimumLevel: 0, subCommand: 0 },
          { command: "twiddle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_TWIDDLE },
          { command: "typo"     , minimumPosition: global.POS_DEAD    , functionPointer: do_report_typo, minimumLevel: 0, subCommand: 0 },
          
//           { command: "ungroup"  , minimumPosition: global.POS_RESTING , functionPointer: do_ungroup    , minimumLevel: 0, subCommand: 0 },
//           { command: "unlock"   , minimumPosition: global.POS_RESTING , functionPointer: do_unlock_door, minimumLevel: 0, subCommand: 0 },

//           { command: "value"    , minimumPosition: global.POS_RESTING , functionPointer: do_value,     minimumLevel: 0, subCommand: 0 },

        //   { command: "wake"    , minimumPosition: global.POS_SLEEPING , functionPointer: do_wake         , minimumLevel: 0, subCommand: 0 },
          { command: "wave"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WAVE },
//           //{ command: "weather"  , minimumPosition: global.POS_RESTING , functionPointer: do_weather    , minimumLevel: 0, subCommand: 0 },
//           { command: "wear"     , minimumPosition: global.POS_RESTING , functionPointer: do_wear       , minimumLevel: 0, subCommand: 0 },
          { command: "whine"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WHINE },
          { command: "whistle"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WHISTLE },
        //   { command: "who"      , minimumPosition: global.POS_DEAD    , functionPointer: do_who        , minimumLevel: 0, subCommand: 0 },
//           //{ command: "whoami"   , minimumPosition: global.POS_DEAD    , functionPointer: do_whoami     , minimumLevel: 0, subCommand: 0 },
          { command: "wiggle"   , minimumPosition: global.POS_STANDING, functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WIGGLE },
          { command: "wink"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WINK },
        //   { command: "withdraw" , minimumPosition: global.POS_RESTING , functionPointer: do_withdraw   , minimumLevel: 0, subCommand: 0 },
          { command: "worship"  , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_WORSHIP },
//           { command: "write"    , minimumPosition: global.POS_RESTING , functionPointer: do_write      , minimumLevel: 0, subCommand: 0 },

          { command: "yawn"     , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_YAWN },
          { command: "yodel"    , minimumPosition: global.POS_RESTING , functionPointer: do_action     , minimumLevel: 0, subCommand: global.SCMD_YODEL },
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

Interpreter.prototype.getCommand = function(input) {
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
    
	var command = this.getCommand(input);

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
        else {
            command.functionPointer(character, command);
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
    social.getOutput().emit();
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

function do_sit(character) {
    character.sit().emit();
}

function do_rest(character) {
    character.rest().emit();
}

function do_sleep(character) {
    character.sleep().emit();
}

// function do_wake(character, command) {
//     if(command.tokens.length === 0) {
//         character.wake();
//     }
//     else {
//         character.wakeCharacter(command.tokens[0]);
//     }
// }

function do_say(character, command) {
    character.say(command.subInput.trim()).emit();
}

function do_gen_comm(character, command) {
    character.generalCommunication(command.subCommand, command.subInput.trim()).emit();
}

// function do_tog_auction(character, command) {
//     if(command.tokens.length > 0) {
//         if(command.tokens[0].toLowerCase().trim() === "on") {
//             character.toggleAuction(true);
//         }
//         else if(command.tokens[0].toLowerCase().trim() === "off") {
//             character.toggleAuction(false);
//         }
//         else {
//             character.toggleAuction();
//         }
//     }
//     else {
//         character.toggleAuction();
//     }
// }

// function do_tog_gossip(character, command) {
//     if(command.tokens.length > 0) {
//         if(command.tokens[0].toLowerCase().trim() === "on") {
//             character.toggleGossip(true);
//         }
//         else if(command.tokens[0].toLowerCase().trim() === "off") {
//             character.toggleGossip(false);
//         }
//         else {
//             character.toggleGossip();
//         }
//     }
//     else {
//         character.toggleGossip();
//     }
// }

// function do_tog_gratz(character, command) {
//     if(command.tokens.length > 0) {
//         if(command.tokens[0].toLowerCase().trim() === "on") {
//             character.toggleGratz(true);
//         }
//         else if(command.tokens[0].toLowerCase().trim() === "off") {
//             character.toggleGratz(false);
//         }
//         else {
//             character.toggleGratz();
//         }
//     }
//     else {
//         character.toggleGratz();
//     }
// }

// function do_tog_holler(character, command) {
//     if(command.tokens.length > 0) {
//         if(command.tokens[0].toLowerCase().trim() === "on") {
//             character.toggleHoller(true);
//         }
//         else if(command.tokens[0].toLowerCase().trim() === "off") {
//             character.toggleHoller(false);
//         }
//         else {
//             character.toggleHoller();
//         }
//     }
//     else {
//         character.toggleHoller();
//     }
// }

// function do_tog_shout(character, command) {
//     if(command.tokens.length > 0) {
//         if(command.tokens[0].toLowerCase().trim() === "on") {
//             character.toggleShout(true);
//         }
//         else if(command.tokens[0].toLowerCase().trim() === "off") {
//             character.toggleShout(false);
//         }
//         else {
//             character.toggleShout();
//         }
//     }
//     else {
//         character.toggleShout();
//     }
// }

// function do_quit(character) {
//      character.emitMessage("Goodbye friend.... Come back soon!");
//      character.emitRoomMessage(character.name + " has quit the game.");

//      if(character.socket !== undefined) {
//          character.socket.player = null;
//          character.socket.disconnect();
//      }
    
//      character.room.removeCharacter(character);
//      character.world.removeCharacter(character);
// }

function do_take(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Take what?");
    }
    else {
        if(command.tokens.length === 1) {
            character.takeItem(command.tokens[0]).emit();
        }
        else {
            if(command.tokens.length === 2) {
                // TODO: Implement
                // character.takeItemFromContainer(command.tokens[0], command.tokens[1]).emit();
            }
            else if(command.tokens.length === 3 && command.tokens[1].toLowerCase() === 'from') {
                // TODO: Implement
                // character.takeItemFromContainer(command.tokens[0], command.tokens[2]).emit();
            }
            else {
                command.emitMessage("I have no idea what you're trying to do.");
            }
        }
    }
}

function do_donate(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Donate what?");
    }
    else if(command.tokens.length === 2 && !isNaN(command.tokens[0])) {
        // character.donateMoney(command.tokens[0]);
    }    
    else {
        character.donateItem(command.tokens[0]).emit();
    }
}

function do_drop(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Drop what?");
    }
    else if(command.tokens.length === 2 && !isNaN(command.tokens[0])) {
        // character.dropMoney(command.tokens[0]);
    }
    else {
        character.dropItem(command.tokens[0]).emit();
    }
}

function do_junk(character, command) {
    if(command.tokens.length === 0) {
        character.emitMessage("Junk what?");
    }
    else if(command.tokens.length === 2 && !isNaN(command.tokens[0])) {
        // character.junkMoney(command.tokens[0]);
    }    
    else {
        character.junkItem(command.tokens[0]);
    }
}

function do_eat(character, command) {
    if(command.tokens.length === 0) {
        // if(command.subCommand === global.SCMD_EAT) {
            character.emitMessage('Eat what?');
        // }
        // else if(command.subCommand === global.SCMD_TASTE) {
            // character.emitMessage('Taste what?');
        // }
    }
    else {
        // character.eatItem(command.tokens[0], command.subCommand);
        character.eatItem(command.tokens[0]).emit();
    }
}

// function do_drink(character, command) {
//     if(command.tokens.length === 0) {
//         if(command.subCommand === global.SCMD_DRINK) {
//             character.emitMessage("Drink what?");
//         }
//         else if(command.subCommand === global.SCMD_SIP) {
//             character.emitMessage("Sip what?");
//         }
//     }
//     else {
//         if(command.tokens[0].toLowerCase() === 'from') {
//             character.drinkItem(command.tokens[1], command.subCommand);
//         }
//         else {
//             character.drinkItem(command.tokens[0], command.subCommand);
//         }
//     }
// }

function do_score(character) {
    character.listScore().emit();
}

function do_inventory(character) {
    character.listInventory().emit();
}

function do_title(character, command) {
    character.setTitle(command.subInput).emit();
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

function do_emote(character, command) {
    character.emote(command.subInput.trim()).emit();
}

// function do_balance(character, command) {
//     if(character.isAtBank() === true) {
//         character.checkBankBalance();
//     }
//     else {
//         character.emitMessage(global.CANNOT_DO_THAT_HERE);
//     }
// }

// function do_deposit(character, command) {
//     if(character.isAtBank() === true) {
//         var error = "How many dollars do you wish to deposit?";
        
//         if(command.tokens.length === 0) {
//             character.emitMessage(error);
//         }
//         else if(isNaN(command.tokens[0]) === true) {
//             character.emitMessage(error);
//         }
//         else {
//             character.depositCoins(command.tokens[0]);
//         }
//     }
//     else {
//         character.emitMessage(global.CANNOT_DO_THAT_HERE);
//     }
// }

// function do_withdraw(character, command) {
//     if(character.isAtBank() === true) {
//         var error = "How many dollars do you wish to withdraw?";
        
//         if(command.tokens.length === 0) {
//             character.emitMessage(error);
//         }
//         else if(isNaN(command.tokens[0]) === true) {
//             character.emitMessage(error);
//         }
//         else {
//             character.withdrawCoins(command.tokens[0]);
//         }
//     }
//     else {
//         character.emitMessage(global.CANNOT_DO_THAT_HERE);
//     }
// }

// function do_who(character) {
//     character.emitMessage("Players ---------------------");
    
//     var playerCount = 0;
//     for(var i = 0; i < character.world.players.length; i++) {
//         character.emitMessage(character.world.players[i].getNameAndTitle());
//         playerCount++;
//     }
    
//     if(playerCount === 1) {
//         character.emitMessage("One lonely player displayed.");
//     }
//     else {
//         character.emitMessage(playerCount + " players displayed.");
//     }
// }

function do_stardate(character) {
    character.emitMessage(character.world.stardate.pretty());
}

// Exports
module.exports = Interpreter;