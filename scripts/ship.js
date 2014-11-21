// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var Ship = function(shipEl, scoreEl, bulletContainer, sfxShipShoot, livesContainer, lives, x, y) {
    this.shipEl = shipEl;
    this.scoreEl = scoreEl;
    this.bulletContainerEl = bulletContainer;
    this.livesContainerEl = livesContainer;
    this.currentLives = lives;
    this.sfxShipShoot = sfxShipShoot;

    for (var i = 1; i < lives; i++)
        this.livesContainerEl.append('<img src="./images/ship.png"/>');

    this.scoreEl.append(this.score);
    this.shipEl.velocity({ properties: { left: x, top: y }, options: { duration: 1 } });

    if (DEBUG)
        console.log("Ship object created.");
};

Ship.prototype = {
    score: 0,
    bindKeys: function(shipContext, eventManager) {
        var me = shipContext;

        $(document).on('keydown', function(event) {
            if (eventManager.events.gameStart && eventManager.events.playerAlive && !eventManager.events.pause) {
                me.checkMoveKeys(event, true);
                me.moveShip(me.shipEl);
            }
        });

        $(document).on('keyup', function(event) {
            if (eventManager.events.gameStart && eventManager.events.playerAlive && !eventManager.events.pause) {
                me.checkMoveKeys(event, false);
                me.moveShip(me.shipEl);
            }
        });

        $(document).on('keypress', function(event) {
            if (eventManager.events.gameStart && eventManager.events.playerAlive && !eventManager.events.pause)
                if (event.keyCode === 32 || event.which == 32) {
                    //me.sfxShipShoot.play();
                    me.shoot(me.shipEl, me.bulletContainerEl);
                }
        });
    },
    checkMoveKeys: function(event, keyIsHeld) {
        if (event.keyCode in KEYS_HELD)
            KEYS_HELD[event.keyCode] = keyIsHeld;
    },
    moveShip: function(shipEl) {
        var topChange,
            leftChange,
            shipPosition = shipEl.position();

        if (!KEYS_HELD[KEYCODES.UP] && !KEYS_HELD[KEYCODES.DOWN] &&
            !KEYS_HELD[KEYCODES.LEFT] && !KEYS_HELD[KEYCODES.RIGHT])
            shipEl.velocity('stop', true);
        else {
            if (KEYS_HELD[KEYCODES.UP] && shipPosition.top >= GAMEFRAME.TOP)
                topChange = '-=2.75';

            if (KEYS_HELD[KEYCODES.DOWN] && (shipPosition.top + shipEl.height()) <= GAMEFRAME.BOTTOM)
                topChange = '+=2.75';

            if (KEYS_HELD[KEYCODES.LEFT] && shipPosition.left >= GAMEFRAME.LEFT)
                leftChange = '-=2.75';

            if (KEYS_HELD[KEYCODES.RIGHT] && (shipPosition.left + shipEl.width()) <= GAMEFRAME.RIGHT)
                leftChange = '+=2.75';

            if (topChange && leftChange)
                shipEl.velocity({ properties: { left: leftChange, top: topChange }, options: { duration: 2 } });
            else if (topChange)
                shipEl.velocity({ properties: { top: topChange }, options: { duration: 2 } });
            else if (leftChange)
                shipEl.velocity({ properties: { left: leftChange }, options: { duration: 2 } });
        }
    },
    shoot: function(shipEl, bulletContainerEl) {
        if (bulletContainerEl.children().length < MAX_BULLETS_ONSCREEN) {
            var shipPosition = shipEl.position();
            bulletContainerEl.append('<div class="fixed bullet"></div>');

            var bulletFocus = $(bulletContainerEl.selector + ' .bullet').last();
            bulletFocus.velocity( { properties: { left: (shipPosition.left + (shipEl.width() / 2)) - bulletFocus.width() / 2, top: shipPosition.top - (shipEl.height() / 2) }, options: { duration: 1 }})
                       .velocity( { properties: { opacity: 1 }, options: { duration: 1 }})
                       .velocity( { properties: { top: 0 }, options: { duration: GAMEFRAME.BOTTOM * (shipPosition.top / GAMEFRAME.BOTTOM) }})
                       .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(bulletEl) { $(bulletEl).remove(); } }});
        }
    },
    scoreKill: function(shipContext) {
        var me = shipContext;

        me.score++;
        me.scoreEl.html(me.score);
    },
    bindCollisions: function(shipContext, eventManager) {
        var me = shipContext;

        me.shipCollisionChecker = setInterval(function() {
            if (me.checkShipCollision(me.shipEl))
                eventManager.killPlayer();
        }, 20);

        me.bulletCollisionChecker = setInterval(function() {
            me.checkBulletCollision(me.bulletContainerEl, eventManager);
        }, 20);
    },
    checkShipCollision: function(shipEl) {
        var mookCollision = shipEl.collision('.mook'),
            mookBulletCollisions = shipEl.collision('.mookbullet'),
            mookExplosionCollisions = shipEl.collision('.mookbulletexplode');

        return (mookCollision.length || mookBulletCollisions.length || mookExplosionCollisions.length);
    },
    checkBulletCollision: function(bulletContainerEl, eventManager) {
        var bulletsEl = bulletContainerEl.children();

        for (var i = 0; i < bulletsEl.length; i++) {
            var bulletCollision = $(bulletsEl[i]).collision('.mook');

            if (bulletCollision.length) {
                bulletsEl[i].remove();
                for (var j = 0; j < bulletCollision.length; j++)
                    eventManager.killMook($(bulletCollision[j]));
            }
        }
    },
    respawn: function(shipContext, gameFrameEl, x, y) {
        var me = shipContext,
            newShipEl;

        gameFrameEl.append('<div id="ship" class="ship fixed normal-size"></div>');
        newShipEl = $('#ship');
        me.shipEl = newShipEl;
        me.shipEl.velocity({ properties: { left: x, top: y }, options: { duration: 1 } });

        if (DEBUG)
            console.log("Ship respawned.");
    },
    die: function(shipContext, animHelper) {
        var me = shipContext,
            shipEl = me.shipEl,
            livesEls = me.livesContainerEl.children();

        shipEl.velocity('stop', true);
        animHelper.addToDeathAnimationQueue(animHelper, shipEl, false);

        me.currentLives--;
        $(livesEls[livesEls.length - 1]).remove();

        if (DEBUG)
            console.log("Ship died.");
    },
    pause: function() {

    },
    unpause: function() {

    }
};