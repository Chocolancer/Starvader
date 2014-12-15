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
                     .velocity( { properties: { translateY: GAMEFRAME.BOTTOM - SCREEN_OFFSET }, options: { duration: randomSpeed }})
                     .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(starEl) { $(starEl).remove(); } }});
        }
    },
    removeAllStars: function(starGeneratorContext) {
        var me = starGeneratorContext,
            starContainerChildrenEl = me.starContainerEl.children();

        clearInterval(me.starGenerateTimer);
        for (var i = 0; i < starContainerChildrenEl.length; i++) {
            starContainerChildrenEl[i].remove();
        }
    },
    pause: function(starGeneratorContext) {
        var me = starGeneratorContext,
            starContainerChildrenEl = me.starContainerEl.children();

        clearInterval(me.starGenerateTimer);
        for (var i = 0; i < starContainerChildrenEl.length; i++) {
            var starFocus = $(starContainerChildrenEl[i]);

            starFocus.velocity('stop', true);
        }
    },
    unpause: function(starGeneratorContext) {
        var me = starGeneratorContext,
            starContainerChildrenEl = me.starContainerEl.children(),
            randomSpeed = Math.ceil(Math.random() * 2000 + 750);

        me.generateStars(starGeneratorContext);
        for (var i = 0; i < starContainerChildrenEl.length; i++) {
            var starFocus = $(starContainerChildrenEl[i]);

            starFocus.velocity( { properties: { opacity: 1 }, options: { duration: 1 }})
                     .velocity( { properties: { translateY: GAMEFRAME.BOTTOM - SCREEN_OFFSET }, options: { duration: randomSpeed }})
                     .velocity( { properties: { opacity: 0 }, options: { duration: 1, complete: function(starEl) { $(starEl).remove(); } }});
        }
    }
};