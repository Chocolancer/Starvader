// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var MookGenerator = function(mookContainer, mookBulletContainerEl) {
    this.mookContainerEl = mookContainer;
    this.mookBulletContainerEl = mookBulletContainerEl;
    this.difficultySlider = 25;

    // start generating. Each interval call randomly changes interval time.
    this.generateMook(this);

    if (DEBUG)
        console.log("Mook generator created.");
};

MookGenerator.prototype = {
    generateMook: function(mookGeneratorContext) {
        var me = mookGeneratorContext,
            mookContainerEl = me.mookContainerEl,
            randomX = Math.ceil(Math.random() * GAMEFRAME.RIGHT),
            randomSpeed = Math.ceil(Math.random() * 10000 + 2000),
            randomInterval = Math.ceil(Math.random() * 3000 + 750);

        if (me.mookGenerateTimer)
            clearInterval(me.mookGenerateTimer);

        me.mookGenerateTimer = setInterval(function() { me.generateMook(me); }, randomInterval);

        if (mookContainerEl.children().length <= MAX_MOOKS) {
            mookContainerEl.append('<div class="mook fixed"></div>');

            var mookFocus = $(mookContainerEl.selector + ' .mook').last();
            mookFocus.velocity( { properties: { left: randomX, top: GAMEFRAME.TOP + 5 }, options: { duration: 1 }})
                     .velocity( { properties: { opacity: 1 }, options: { duration: 1 }})
                     .velocity( { properties: { top: GAMEFRAME.BOTTOM - mookFocus.height() }, options: { duration: randomSpeed }})
                     .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(mookEl) { $(mookEl).remove(); } }});
        }
    },
    killMook: function() { //adds destroy effect to mook

    },
    removeAllMooks: function(mookContainerEl) { //unceremoniously removes the mook element
        debugger;
        var mooksEl = mookContainerEl.children();

        for (var i = 0; i < mookContainerEl.length; i++) {
            
        }
    },
    pause: function() {

    },
    unpause: function() {

    }
};