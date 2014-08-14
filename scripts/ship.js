
var Ship = function(shipEl, x, y) {
    this.shipEl = shipEl;
    this.bindKeys();
};

Ship.prototype = {
    shipEl: $('#ship'),
    bindKeys: function() {
        $(document).on('keydown', function(event) {
            if (eventManager.events.gameStart && eventManager.events.playerAlive)
            {
                var keycode = (event.keyCode ? event.keyCode : event.which),
                    shipPosition = ship.shipEl.position();

                if (shipPosition.left >= 0 || 
                    shipPosition.top >= 0 || 
                    (shipPosition.left + shipPosition.width()) <= gameFrame.width() || 
                    (shipPosition.top + shipPosition.height()) <= gameFrame.height()) {
                    switch (keycode) {
                        case 87:
                            ship.shipEl.velocity({
                                properties: { top: '-=2' }, options: { duration: 2 }
                            });
                            break;
                        case 65:
                            ship.shipEl.velocity({
                                properties: { left: '-=2' }, options: { duration: 2 }
                            });
                            break;
                        case 83:
                            ship.shipEl.velocity({
                                properties: { top: '+=2' }, options: { duration: 2 }
                            });
                            break;
                        case 68:
                            ship.shipEl.velocity({
                                properties: { left: '+=2' }, options: { duration: 2 }
                            });
                            break;
                    }
                }
            }
        });

        //event for bullet
    },
    unbindKeys: function() {

    },
    shoot: function() {

    },
    respawn: function(gameCallback) {

    },
    die: function(gameCallback) {

    }
};