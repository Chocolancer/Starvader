
var EventManager = function(callbacks) {

    if (callbacks !== undefined)
        for (var cb in callbacks)
            if (this.eventCallbacks.hasOwnProperty(cb))
                this.eventCallbacks[cb] = callbacks[cb];
    else
        if (DEBUG)
            alert("Event manager has no callbacks!");

    if (DEBUG)
        alert("Event manager initiated!");
};

EventManager.prototype = {
    events: {
        idle: true,
        pause: false,
        gameStart: false,
        playerAlive: false,
        playerDead: false
    },
    eventCallbacks: {
        idle: undefined,
        pause: undefined,
        unpause: undefined,
        gameStart: undefined,
        playerAlive: undefined,
        playerDead: undefined
    },
    reset: function() {
        for (var ev in this.events) {
            ev = false;
        }
        this.events.idle = true;
        this.eventCallbacks.idle();
    },
    startGame: function() {
        this.events.idle = false;
        this.events.gameStart = true;
        this.events.playerAlive = true;
        this.eventCallbacks.gameStart();
        this.eventCallbacks.playerAlive();
    },
    respawnPlayer: function() {
        this.events.playerAlive = true;
        this.events.playerDead = false;
        this.eventCallbacks.playerAlive();
    },
    killPlayer: function() {
        this.events.playerAlive = false;
        this.events.playerDead = true;
        this.eventCallbacks.playerDead();
    },
    pauseGame: function() {
        this.events.pause = true;
        this.eventCallbacks.pause();
    },
    unpauseGame: function() {
        this.events.pause = false;
        this.eventCallbacks.unpause();
    }
};