
var Ship = function(x, y) {
    this.bindKeys();
};

Ship.prototype = {
    x: 10,
    y: 10,
    shipEl: $('#ship'),
    bindKeys: function() {
        $(document).on('keydown', function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            switch (keycode) {
                case 87:
                    // if (DEBUG)
                    //     alert("Moving up");
                    this.shipEl.velocity({
                        properties: {
                            top: this.shipEl.top - 1
                        },
                        options: {
                            duration: 1,
                            loop: true
                        }
                    });
                    break;
                case 65:
                    if (DEBUG)
                        alert("Moving left");
                    break;
                case 83:
                    if (DEBUG)
                        alert("Moving down");
                    break;
                case 68:
                    if (DEBUG)
                        alert("Moving right");
                    break;
            }
        });

        $(document).on('keyup', function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            switch (keycode) {
                case 87:
                    if (DEBUG)
                        alert("Stopped moving up");
                    break;
                case 65:
                    if (DEBUG)
                        alert("Stopped moving left");
                    break;
                case 83:
                    if (DEBUG)
                        alert("Stopped moving down");
                    break;
                case 68:
                    if (DEBUG)
                        alert("Stopped moving right");
                    break;
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