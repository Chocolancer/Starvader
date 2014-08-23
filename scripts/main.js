// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

// KEYS AND LOGICAL CONSTANTS
var DEBUG = true,
    KEYCODES = {
        UP: 87,
        DOWN: 83,
        LEFT: 65,
        RIGHT: 68,
        FIRE: 32,
        PAUSE: 112,
        START: 13
    },
    KEYS_HELD = {
        87: false,
        83: false,
        65: false,
        68: false
    },
    GAMEFRAME;

$(document).on('ready', function(event) {
    var scoreEl                 = $('#score'),
        gameFrameEl             = $('#gameframe'),
        gameTitleEl             = $('#gametitle'),
        gameInstructionsEl      = $('#gameinstructions'),
        gameStartPromptEl       = $('#gameprompt'),
        gameCreditEl            = $('#gamecredit'),
        shipBulletContainerEl   = $('#bulletcontainer'),
        shipLivesContainerEl    = $('#lives'),
        mookContainerEl         = $('#mookcontainer'),
        mookBulletContainerEl   = $('#mookbulletcontainer'),
        mookEl                  = $('#mook'),
        shipEl                  = $('#ship'),
        ship,
        eventManager;

    GAMEFRAME = {
        TOP: gameFrameEl.position().top,
        BOTTOM: gameFrameEl.height(),
        LEFT: gameFrameEl.position().left,
        RIGHT: gameFrameEl.width()
    };

    eventManager = new EventManager({
        idle: function() {
            if (DEBUG)
                console.log("Reset callback has been hit.");

            // show display elements
            gameTitleEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameInstructionsEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameStartPromptEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameCreditEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            mookEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
        },
        gameStart: function() {
            if (DEBUG)
                console.log("Start callback has been hit.");

            ship = new Ship(shipEl, shipBulletContainerEl, shipLivesContainerEl, 5, 
                (GAMEFRAME.RIGHT / 2) - shipEl.width(), GAMEFRAME.BOTTOM - (shipEl.height() * 2));
            ship.bindKeys(ship, eventManager);

            gameTitleEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            gameInstructionsEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            gameStartPromptEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            gameCreditEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            mookEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });

            scoreEl.velocity({ properties: { left: GAMETEXT.LEFT + 5, top: GAMETEXT.TOP + 5 }, options: { duration: 1 } });
            scoreEl

            shipLivesContainerEl.velocity({ properties: { left: GAMETEXT.RIGHT / 2, top: GAMETEXT.TOP + 5 }, options: { duration: 1 } });
        },
        pause: function() {
            if (DEBUG)
                console.log("Pause callback has been hit.");
        },
        unpause: function() {
            if (DEBUG)
                console.log("Unpause callback has been hit.");
        },
        playerAlive: function() {
            if (DEBUG)
                console.log("Player alive callback has been hit.");
        },
        playerDead: function() {
            if (DEBUG)
                console.log("Player dead callback has been hit.");

            ship.die();
        }
    });

    $(document).on('keypress', function(event) {
        switch (event.keyCode) {
            case KEYCODES.START:
                eventManager.startGame();
                break;
            case KEYCODES.PAUSE:
                if (eventManager.event.pause)
                    eventManager.unpause();
                else
                    eventManager.pause();
                break;
        }
    });

    eventManager.reset();
});