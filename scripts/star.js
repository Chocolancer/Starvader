// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var StarGenerator = function(starContainer) {
    this.starContainerEl = starContainer;

    this.generateStars(this);

    if (DEBUG)
        console.log("Star generator created.");
};

StarGenerator.prototype = {
    generateStars: function(starGeneratorContext) {
        var me = starGeneratorContext,
            starContainerEl = me.starContainerEl,
            randomX = Math.ceil(Math.random() * GAMEFRAME.RIGHT),
            randomSpeed = Math.ceil(Math.random() * 2000 + 750),
            randomInterval = Math.ceil(Math.random() * 150 + 100);

        if (me.starGenerateTimer)
            clearInterval(me.starGenerateTimer);

        me.starGenerateTimer = setInterval(function() { me.generateStars(me); }, randomInterval);

        if (starContainerEl.children().length <= MAX_STARS) {
            starContainerEl.append('<div class="star fixed"></div>');

            var starFocus = $(starContainerEl.selector + ' .star').last();
            starFocus.velocity( { properties: { left: randomX, top: GAMEFRAME.TOP + 5 }, options: { duration: 1 }})
                     .velocity( { properties: { opacity: 1 }, options: { duration: 1 }})
                     .velocity( { properties: { top: GAMEFRAME.BOTTOM + SCREEN_OFFSET - starFocus.height()}, options: { duration: randomSpeed }})
                     .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(starEl) { $(starEl).remove(); } }});
        }
    },
    removeAllStars: function() {

    },
    pause: function() {

    },
    unpause: function() {

    }
};