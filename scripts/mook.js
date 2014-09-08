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
            mookContainerEl.append('<div class="mook fixed normal-size"></div>');

            var mookFocus = $(mookContainerEl.selector + ' .mook').last();
            mookFocus.velocity( { properties: { left: randomX, top: GAMEFRAME.TOP + 5 }, options: { duration: 1 }})
                     .velocity( { properties: { opacity: 1 }, options: { duration: 1 }})
                     .velocity( { properties: { top: GAMEFRAME.BOTTOM - mookFocus.height() }, options: { duration: randomSpeed }})
                     .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(mookEl) { $(mookEl).remove(); } }});
        }
    },
    killMook: function(mookEl) { //adds destroy effect to mook
        mookEl.velocity('stop', true);

        //temporary
        mookEl.remove();

        //TOGGLE_DEATH_ANIMATION(mookEl);
    },
    removeAllMooks: function(mookGeneratorContext) { //unceremoniously removes the mook element
        debugger;
        var me = mookGeneratorContext;
            mooksEl = me.mookContainerEl.children();
            mooksBulletsEl = me.mookBulletContainerEl.children();

        for (var mookEl in mooksEl)
            mookEl.remove();
        for (var mookBulletEl in mooksBulletsEl)
            mookBulletEl.remove();
    },
    pause: function() {

    },
    unpause: function() {

    }
};