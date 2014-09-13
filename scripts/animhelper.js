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

        me.deathAnimationTimer = setInterval(function() { me.checkDeathAnimations(me); } 1500);
    },
    stopDeathAnimationCycle: function(animHelperContext) {
        clearInterval(animHelperContext.deathAnimationTimer);
    },
    addToDeathAnimationQueue: function(animHelperContext, el, isBig) {
        var me = animHelperContext;

        if (isBig)
            me.bigDeathAnimatedEls.add(el);
        else
            me.deathAnimatedEls.add(el);
    },
    checkDeathAnimations: function(animHelperContext) {
        var me = animHelperContext;

        for (var i = 0; i < me.deathAnimatedEls.length; i++) {
            var focusEl
            var foundClass = false;
            var elClass = me.deathAnimatedEls[i].attr('class').split(' ');

            for (var j = 0; j < elClass.length; j++) {
                if (elClass[j] === '.normal-deadframe0')
                    elClass[j] = '.normal-deadframe1';
                else if (elClass[j] === '.normal-deadframe1')
                    elClass[j] = '.normal-deadframe2';
                else if (elClass[j] === '.normal-deadframe2') {
                    me.deathAnimatedEls[i].remove();
                    me.deathAnimatedEls.splice(me.deathAnimatedEls[i], 1);
                }
            }


        }

        for (var k = 0; k < me.bigDeathAnimatedEls.length; k++) {
            var elClass = me.deathAnimatedEls[i].attr('class').split(' ');

            for (var l = 0; l < elClass.length; l++) {
                if (elClass[l] === '.')
                    elClass[l] = '';
                else if (elClass[l] === '.')
                    elClass[l] = '';
                else if (elClass[l] === '.') {
                    me.bigDeathAnimatedEls[i].remove();
                    me.bigDeathAnimatedEls.splice(me.deathAnimatedEls[i], 1);
                }
            }
        }
    }
};

