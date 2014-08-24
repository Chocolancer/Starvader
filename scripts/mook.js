// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var MookGenerator = function(mookContainer, mookBulletContainerEl) {
    this.mookContainerEl = mookContainer;
    this.mookBulletContainerEl = mookBulletContainerEl;
    this.difficultySlider = 25;

    // start timer
    this.mookGenerateTimer = setInterval(this.generateMook(this), 3000);

    if (DEBUG)
        console.log("Mook generator created.");
};

MookGenerator.prototype = {
    generateMook: function(mookGeneratorContext) {
        var mookContainerEl = mookGeneratorContext.mookContainerEl,
            randomX = Math.ceil(Math.random() * (GAMEFRAME.RIGHT - 5)),
            randomSpeed = Math.ceil(Math.random() * 10000 + 2000);

        mookContainerEl.append('<div class="mook fixed"></div>');

        var mookFocus = $(mookContainerEl.selector + ' .mook').last();
        mookFocus.velocity( { properties: { left: randomX, top: GAMEFRAME.TOP + 5 }, options: { duration: 1 }})
                 .velocity( { properties: { opacity: 1 }, options: { duration: 1 }})
                 .velocity( { properties: { top: GAMEFRAME.BOTTOM - 16 }, options: { duration: randomSpeed }})
                 .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(mookEl) { $(mookEl).remove(); } }});
    },
    killAllMooks: function() {

    },
    pause: function() {

    },
    unpause: function() {

    }
};