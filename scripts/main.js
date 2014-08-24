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
        starContainerEl         = $('#starcontainer'),
        mookEl                  = $('#mook'),
        shipEl                  = $('#ship'),
        ship,
        mookGenerator,
        starGenerator,
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
            gameFrameEl.removeAttr('class');
            gameTitleEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameInstructionsEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameStartPromptEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameCreditEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            mookEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
        },
        gameStart: function() {
            if (DEBUG)
                console.log("Start callback has been hit.");

            // hide display elements + add game border
            gameFrameEl.attr('class', 'running');
            gameTitleEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            gameInstructionsEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            gameStartPromptEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            gameCreditEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            mookEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });

            scoreEl.velocity({ properties: { left: GAMEFRAME.LEFT + 5, top: GAMEFRAME.TOP + 2 }, options: { duration: 1 } });

            shipLivesContainerEl.velocity({ properties: { left: GAMEFRAME.RIGHT / 4, top: GAMEFRAME.TOP + 2 }, options: { duration: 1 } });

            starGenerator = new StarGenerator(starContainerEl);
            ship = new Ship(shipEl, scoreEl, shipBulletContainerEl, shipLivesContainerEl, 5, 
                (GAMEFRAME.RIGHT / 2) - shipEl.width(), GAMEFRAME.BOTTOM - (shipEl.height() * 2));
            mookGenerator = new MookGenerator(mookContainerEl, mookBulletContainerEl);

            ship.bindKeys(ship, eventManager);
        },
        pause: function() {
            if (DEBUG)
                console.log("Pause callback has been hit.");

            ship.pause();
            mookGenerator.pause();
            starGenerator.pause();
        },
        unpause: function() {
            if (DEBUG)
                console.log("Unpause callback has been hit.");

            ship.pause();
            mookGenerator.pause();
            starGenerator.pause();
        },
        playerAlive: function() {
            if (DEBUG)
                console.log("Player alive callback has been hit.");

            ship.unpause();
            mookGenerator.unpause();
            starGenerator.unpause();
        },
        playerDead: function() {
            if (DEBUG)
                console.log("Player dead callback has been hit.");

            ship.die();
            mookGenerator.killAllMooks();
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