// STARVADER: A simple shoot-'em-up using DOM in jQuery and Velocity.js
// Copyright 2014 Chocolancer; MIT License: http://opensource.org/licenses/MIT

var AnimHelper = function() {
    this.startDeathAnimationCycle(this);

    if (DEBUG)
        console.log("Animation helper loaded.");
};

AnimHelper.prototype = {
    deathAnimatedEls: [],
    bigDeathAnimatedEls: [],
    startDeathAnimationCycle: function(animHelperContext) {
        var me = animHelperContext;

        me.deathAnimationTimer = setInterval(function() { me.checkDeathAnimations(me); }, DEATH_ANIMATION_INTERVAL);
    },
    stopDeathAnimationCycle: function(animHelperContext) {
        clearInterval(animHelperContext.deathAnimationTimer);
    },
    addToDeathAnimationQueue: function(animHelperContext, el, isBig) {
        var me = animHelperContext;

        if (isBig)
            me.bigDeathAnimatedEls.push(el);
        else
            me.deathAnimatedEls.push(el);
    },
    checkDeathAnimations: function(animHelperContext) {
        var me = animHelperContext;

        me.toggleFrames(me, me.deathAnimatedEls, NORMAL_DEADFRAME_CLASSES);
        me.toggleFrames(me, me.bigDeathAnimatedEls, BIG_DEADFRAME_CLASSES);
    },
    toggleFrames: function(animHelperContext, elArray, frames) {
        var me = animHelperContext;
        // for each element in the queue, toggle classes which trigger which image to show as part of the death
        // animation. Remove once it goes through the last toggle
        for (var i = 0; i < elArray.length; i++) {
            var focusEl = elArray[i],
                elClass = focusEl.attr('class').split(' ');

            if (elClass.indexOf(frames.FRAME2) !== -1) {
                elArray[i].remove();
                elArray.splice(i, 1);
            }
            else {
                me.searchAndReplaceClass(elClass, frames.FRAME1, frames.FRAME2);
                me.searchAndReplaceClass(elClass, frames.FRAME0, frames.FRAME1);

                me.searchAndReplaceClass(elClass, 'big-mook', frames.FRAME0);
                me.searchAndReplaceClass(elClass, 'mook', frames.FRAME0);
                me.searchAndReplaceClass(elClass, 'ship', frames.FRAME0);

                focusEl.attr('class', elClass.join(' '));
            }
        }
    },
    searchAndReplaceClass: function(classArray, classToReplace, replacingClass) {
        var classIndex = classArray.indexOf(classToReplace);
        if (classIndex !== -1) {
            classArray.splice(classIndex, 1);
            if (replacingClass)
                classArray.push(replacingClass);
        }
    }
};