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
    mookGenerateTimer: {},
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
    killMook: function(mookEl, animHelper) {
        if (DEBUG)
            console.log("Mook died.");

        mookEl.velocity('stop', true);
        animHelper.addToDeathAnimationQueue(animHelper, mookEl, false);
    },
    killAllMooks: function(mookGeneratorContext, animHelper) {
        var me = mookGeneratorContext;
            mooksEl = me.mookContainerEl.children();
            mooksBulletsEl = me.mookBulletContainerEl.children();

        clearInterval(me.mookGenerateTimer);

        for (var i = 0; i < mooksBulletsEl.length; i++)
            mooksBulletsEl[i].remove();
        for (var j = 0; j < mooksEl.length; j++)
            me.killMook($(mooksEl[j]), animHelper);
    },
    pause: function() {

    },
    unpause: function() {

    }
};