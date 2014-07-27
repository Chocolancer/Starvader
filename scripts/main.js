var DEBUG = true;

var resetCallback = function() {
    if (DEBUG)
        alert("Reset callback has been hit.");

    $(document).on('keypress', function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        switch (keycode) {
            case 13:
                if (DEBUG)
                    alert("Gamestart event on");
                eventManager.startGame();
                break;
            case 112:
                if (DEBUG)
                    alert("Pause event on");

                if (eventManager.event.pause)
                    eventManager.unpause();
                else
                    eventManager.pause();
                break;
        }
    });
};

var defaultCallback = function() {
    if (DEBUG)
        alert("This event doesn't have a callback function yet...");
};

var startGameCallback = function() {
    ship = new Ship(0, 0);
    if (DEBUG)
        alert("Ship initiated.");
};

var eventCallbacks = {
    idle: resetCallback,
    pause: defaultCallback,
    unpause: defaultCallback,
    gameStart: startGameCallback,
    playerAlive: defaultCallback,
    playerDead: defaultCallback
};

var eventManager = new EventManager(eventCallbacks);
var ship;

$(document).on('ready', function(event) {
    eventManager.reset();
});

// beginLoop();