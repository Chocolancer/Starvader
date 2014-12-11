// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var EventManager = function(callbacks) {
    if (callbacks !== undefined)
        for (var cb in callbacks)
            if (this.eventCallbacks.hasOwnProperty(cb))
                this.eventCallbacks[cb] = callbacks[cb];
    else
        if (DEBUG)
            console.log("Event manager has no callbacks!");

    if (DEBUG)
        console.log("Event manager initiated!");
};

EventManager.prototype = {
    eventCallbacks: {
        idle: undefined,
        pause: undefined,
        unpause: undefined,
        mookDead: undefined,
        gameStart: undefined,
        playerAlive: undefined,
        playerDead: undefined
    },
    reset: function() {
        for (var ev in EVENTS) {
            ev = false;
        }

        this.eventCallbacks.idle();
        EVENTS.IDLE = true;
    },
    startGame: function() {
        if (EVENTS.IDLE && !EVENTS.GAMESTART && !EVENTS.PLAYERALIVE) {
            this.eventCallbacks.gameStart();
            this.eventCallbacks.playerAlive();
            EVENTS.IDLE = false;
            EVENTS.GAMESTART = true;
            EVENTS.PLAYERALIVE = true;
        }
        else if (DEBUG){
            console.log("Invalid state change: startGame");
        }
    },
    respawnPlayer: function() {
        if (!EVENTS.PLAYERALIVE) {
            this.eventCallbacks.playerAlive();
            EVENTS.PLAYERALIVE = true;
        }
        else if (DEBUG){
            console.log("Invalid state change: respawnPlayer");
        }
    },
    killPlayer: function() {
        if (EVENTS.PLAYERALIVE) {
            this.eventCallbacks.playerDead();
            EVENTS.PLAYERALIVE = false;
        }
        else if (DEBUG) {
            console.log("Invalid state change: killPlayer");
        }
    },
    killMook: function(mookEl) {
        this.eventCallbacks.mookDead(mookEl);
    },
    pauseGame: function() {
        if (!EVENTS.PAUSE) {
            this.eventCallbacks.pause();
            EVENTS.PAUSE = true;
        }
        else if (DEBUG) {
            console.log("Invalid state change: pauseGame");
        }
    },
    unpauseGame: function() {
        if (EVENTS.PAUSE) {
            this.eventCallbacks.unpause();
            EVENTS.PAUSE = false;
        }
        else if (DEBUG) {
            console.log("Invalid state change: unpauseGame");
        }
    }
};