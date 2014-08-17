// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var Mook = function(x, y) {

    if (DEBUG)
        console.log("Mook object created.");
};

Mook.prototype = {
    enemyEl: $('#ship'),
    bulletContainerEl: $('#mookbulletcontainer')
};