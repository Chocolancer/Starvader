// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

//OUTSTANDING:
// - DOM issue where ship explodes randomly. Need to split where ship and mook elements are created
// - implement pause
// - implement game over animation and reset
// - implement big mook
// - evaluate if object creation logic is good
// - difficulty slider
// - sound manager

// KEYS AND LOGICAL CONSTANTS
var DEBUG = true,
    SCREEN_OFFSET = 10,
    MAX_STARS = 40,
    MAX_MOOKS = 15,
    MAX_BULLETS_ONSCREEN = 5,
    MAX_LIVES = 5,
    DEATH_ANIMATION_INTERVAL = 200,
    KEYCODES = {
        UP: 87,
        DOWN: 83,
        LEFT: 65,
        RIGHT: 68,
        FIRE: 32,
        PAUSE: 112, // default P
        START: 13 // default ENTER
    },
    KEYS_HELD = {
        87: false,
        83: false,
        65: false,
        68: false
    },
    EVENTS = {
        IDLE: true,
        PAUSE: false,
        GAMESTART: false,
        PLAYERALIVE: false
    },
    NORMAL_DEADFRAME_CLASSES = {
        FRAME0: 'normal-deadframe0',
        FRAME1: 'normal-deadframe1',
        FRAME2: 'normal-deadframe2'
    },
    BIG_DEADFRAME_CLASSES = {
        FRAME0: 'big-deadframe0',
        FRAME1: 'big-deadframe1',
        FRAME2: 'big-deadframe2'
    },
    GAMEFRAME,
    TOGGLE_DEATH_ANIMATION = function(el, isBig) {
        var classPrefix = isBig ? '.big-' : '.normal-',
            animateTimer;

        if (!animateTimer)
            animateTimer = setInterval(function() {

            }, 500);


    };

$(document).on('ready', function(event) {
    var scoreEl                 = $('#score'),
        gameOverEl              = $('#gameover'),
        pausedEl                = $('#paused'),
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
        sfxEnemyDie             = $('#sfx-enemy-die'),
        sfxEnemyShoot           = $('#sfx-enemy-shoot'),
        sfxShipDie              = $('#sfx-ship-die'),
        sfxShipRespawn          = $('#sfx-ship-respawn'),
        sfxShipShoot            = $('#sfx-ship-shoot'),
        ship,
        mookGenerator,
        starGenerator,
        eventManager,
        respawnDelayTimer,
        animHelper;

    GAMEFRAME = {
        TOP: gameFrameEl.position().top,
        BOTTOM: gameFrameEl.height() - SCREEN_OFFSET,
        LEFT: gameFrameEl.position().left,
        RIGHT: gameFrameEl.width() - SCREEN_OFFSET
    };

    eventManager = new EventManager({
        idle: function() {
            if (DEBUG)
                console.log("Reset callback has been hit.");

            // hide elements that shouldn't be seen
            gameOverEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
            pausedEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });

            // show display elements
            gameFrameEl.removeAttr('class');
            gameTitleEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameInstructionsEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameStartPromptEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            gameCreditEl.velocity({ properties: { opacity: 1 }, options: { duration: 1 } });


            if (animHelper)
                animHelper.stopDeathAnimationCycle(animHelper);
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

            scoreEl.velocity({ properties: { left: GAMEFRAME.LEFT + 5, top: GAMEFRAME.TOP + 2 }, options: { duration: 1 } });

            shipLivesContainerEl.velocity({ properties: { left: GAMEFRAME.RIGHT / 4, top: GAMEFRAME.TOP + 2 }, options: { duration: 1 } });

            animHelper = new AnimHelper();
            starGenerator = new StarGenerator(starContainerEl);
            ship = new Ship(scoreEl, shipBulletContainerEl, sfxShipShoot, shipLivesContainerEl, MAX_LIVES);
            mookGenerator = new MookGenerator(mookContainerEl, mookBulletContainerEl);

            ship.bindKeys(ship, eventManager);
            ship.bindCollisions(ship, eventManager);
        },
        pause: function() {
            if (DEBUG)
                console.log("Pause callback has been hit.");

            starGenerator.pause(starGenerator);
            ship.pause(ship);
            mookGenerator.pause(mookGenerator);
            animHelper.pause(animHelper);

            pausedEl.velocity({ properties: { left: GAMEFRAME.LEFT + ((GAMEFRAME.RIGHT / 2) - (pausedEl.width() / 2)), 
                    top: GAMEFRAME.TOP + ((GAMEFRAME.BOTTOM / 2) - (pausedEl.height() / 2)) }, options: { duration: 1 } })
                    .velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
        },
        unpause: function() {
            if (DEBUG)
                console.log("Unpause callback has been hit.");

            starGenerator.unpause(starGenerator);
            ship.unpause(ship, eventManager);
            mookGenerator.unpause(mookGenerator);
            animHelper.unpause(animHelper);

            pausedEl.velocity({ properties: { opacity: 0 }, options: { duration: 1 } });
        },
        playerAlive: function() {
            if (DEBUG)
                console.log("Player alive callback has been hit.");

            clearInterval(respawnDelayTimer);

            sfxShipRespawn.trigger('play');
            ship.respawn(ship, eventManager, mookGenerator, gameFrameEl, (GAMEFRAME.RIGHT / 2),
                GAMEFRAME.BOTTOM - (GAMEFRAME.BOTTOM / 3));
        },
        playerDead: function() {
            if (DEBUG)
            console.log("Player dead callback has been hit.");

            sfxShipDie.trigger('play');
            ship.die(ship, animHelper);
            mookGenerator.killAllMooks(mookGenerator, animHelper);

            if (ship.currentLives == 0) {
                gameOverEl.velocity({ properties: { left: GAMEFRAME.LEFT + ((GAMEFRAME.RIGHT / 2) - (gameOverEl.width() / 2)), 
                    top: GAMEFRAME.TOP + ((GAMEFRAME.BOTTOM / 2) - (gameOverEl.height() / 2)) }, options: { duration: 1 } })
                          .velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
            }
            else {
                respawnDelayTimer = setInterval(function() { eventManager.respawnPlayer(); }, 3000);
            }
        },
        mookDead: function(mookEl) {
            if (DEBUG)
                console.log("Mook killed callback has been hit.");

            sfxEnemyDie.trigger('play');
            mookGenerator.killMook(mookEl, animHelper);
            ship.scoreKill(ship);
        }
    });

    eventManager.context = eventManager;

    $(document).on('keypress', function(event) {
        switch (event.keyCode) {
            case KEYCODES.START:
                eventManager.startGame();
                break;
            case KEYCODES.PAUSE:
                if (EVENTS.PAUSE)
                    eventManager.unpauseGame();
                else
                    eventManager.pauseGame();
                break;
        }
    });

    eventManager.reset();
});