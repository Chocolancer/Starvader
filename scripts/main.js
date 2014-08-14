var DEBUG = false,
    gameFrame = $('#gameframe'),
    ship = new Ship($('#ship'), 0, 0),
    mooks

var resetCallback = function() {
    if (DEBUG)
        alert("Reset callback has been hit.");

    // show display elements
    $('#gametitle').velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
    $('#gameinstructions').velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
    $('#gameprompt').velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
    $('#gamecredit').velocity({ properties: { opacity: 1 }, options: { duration: 1 } });
    $('#displaymook').velocity({ properties: { opacity: 1 }, options: { duration: 1 } });

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

var pauseCallback = function() {

};

var unpauseCallback = function() {

};

var defaultCallback = function() {
    if (DEBUG)
        alert("This event doesn't have a callback function yet...");
};

var startGameCallback = function() {
    $('#gametitle').velocity ({ properties: { opacity: 0 }, options: { duration: 1 } });
    $('#gameinstructions').velocity ({ properties: { opacity: 0 }, options: { duration: 1 } });
    $('#gameprompt').velocity ({ properties: { opacity: 0 }, options: { duration: 1 } });
    $('#gamecredit').velocity ({ properties: { opacity: 0 }, options: { duration: 1 } });
    $('#displaymook').velocity({ properties: { opacity: 0 }, options: { duration: 1 } });

    for (var i = 0; i < 5; i++) {
        $('#lives').append('<img src="./images/ship.png"/>');
    }
};

var eventCallbacks = {
    idle: resetCallback,
    pause: defaultCallback,
    unpause: defaultCallback,
    gameStart: startGameCallback,
    playerAlive: defaultCallback,
    playerDead: defaultCallback
};

var eventManager = new EventManager(eventCallbacks),
    ship;
    

$(document).on('ready', function(event) {
    eventManager.reset();
});

// beginLoop();