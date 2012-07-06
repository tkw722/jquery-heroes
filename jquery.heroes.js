/**
 * jQuery Heroes
 * v1.0 (6/6/2012)
 *
 * Copyright (c) 2012, Tim Wagner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation 
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS 
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **/

(function($) {

    var heroes = {
        mergedSettings: {},
        currentlyHighlighting: false,
        defaultOptions: {
            overlayOpacity: 0.3,
            overlayColor: '#333',
            animateOverlay: true,
            animationSpeed: 500,
            animationEasing: '',
            clickOverlayToClose: true,
            beforeShowHeroes: function(){},
            afterShowHeroes: function(){},
            beforeHideHeroes: function(){},
            afterHideHeroes: function(){}
        }
    };

    var helpers = {
        saveOldStyles: function($element) {
            $element.data('heroes-old-position', $element.css('position'));
            $element.data('heroes-old-zindex', $element.css('z-index'));
        },
        restoreOldStyles: function($element) {
            $element.css({
                'position': $element.data('heroes-old-position'),
                'z-index': $element.data('heroes-old-zindex')
            });
        },
        hideHeroes: function() {
            var $heroOverlay = $('#heroes-overlay'),
                $elements = $('.heroes-highlighted');

            heroes.mergedSettings.beforeHideHeroes();

            if(heroes.mergedSettings.animateOverlay){
                $heroOverlay.animate({
                    'opacity': 0
                }, heroes.mergedSettings.animationSpeed, heroes.mergedSettings.animationEasing, function(){
                    $elements.each(function() {
                        helpers.restoreOldStyles($(this));
                    }).removeClass('heroes-highlighted');

                    $heroOverlay.remove();

                    heroes.mergedSettings.afterHideHeroes();

                    heroes.currentlyHighlighting = false;
                });
            } else {
                $heroOverlay.css('opacity', '0');

                $elements.each(function() {
                    helpers.restoreOldStyles($(this));
                }).removeClass('heroes-highlighted');

                $heroOverlay.remove();

                heroes.mergedSettings.afterHideHeroes();

                heroes.currentlyHighlighting = false;
            }
        }
    };

    var methods = {
        init: function(options) {
            var $heroOverlay = null,
                $elements = $(this);

            // Load in user specified options and merge with default settings.
            $.extend(heroes.mergedSettings, heroes.defaultOptions, options);

            heroes.mergedSettings.beforeShowHeroes();

            // Prep the new heroes to be highlighted, but don't disturb the saved styles of any heroes previously highlighted.
            $elements.each(function() {
                var $currentHero = $(this).addClass('heroes-highlighting');

                if(!$currentHero.hasClass('heroes-highlighted')) helpers.saveOldStyles($currentHero);

                $currentHero.css({
                    'position': $currentHero.data('heroes-old-position') == 'static' ? 'relative' : 'static',
                    'z-index': '9999999'
                });
            });

            // If we AREN'T yet highlighting heroes, so let's do some highlighting.
            if(!heroes.currentlyHighlighting) {
                $heroOverlay = $('<div id="heroes-overlay"></div>').css({
                    'position': 'fixed',
                    'background': heroes.mergedSettings.overlayColor,
                    'opacity': '0',
                    'top': '0px',
                    'left': '0px',
                    'height': '100%',
                    'width': '100%',
                    'z-index': '9999998'
                });

                $('body').append($heroOverlay);

                if(heroes.mergedSettings.animateOverlay){
                    $heroOverlay.animate({
                        opacity: heroes.mergedSettings.overlayOpacity
                    }, heroes.mergedSettings.animationSpeed, heroes.mergedSettings.animationEasing, heroes.mergedSettings.afterShowHeroes);
                } else {
                    $heroOverlay.css('opacity', heroes.mergedSettings.overlayOpacity);
                    heroes.mergedSettings.afterShowHeroes();
                }

                if(heroes.mergedSettings.clickOverlayToClose) {
                    $heroOverlay.off('click', helpers.hideHeroes).on('click', helpers.hideHeroes);
                }

                heroes.currentlyHighlighting = true;
            } else { // We ARE already highlighting heroes, but you've called me again so you must want to change what you're highlighting.
                $('.heroes-highlighted:not(.heroes-highlighting)').each(function() {
                    helpers.restoreOldStyles($(this));
                }).removeClass('heroes-highlighted');
                heroes.mergedSettings.afterShowHeroes();

                if(heroes.mergedSettings.clickOverlayToClose) {
                    $('#heroes-overlay').off('click', helpers.hideHeroes).on('click', helpers.hideHeroes);
                }

                heroes.currentlyHighlighting = true; // Just want to be explicit, we're still highlighting heroes.
            }

            $elements.addClass('heroes-highlighted').removeClass('heroes-highlighting');

            return $elements;
        },
        hideHeroes: helpers.hideHeroes
    };
    
    $.fn.heroes = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.heroes');
        }
    };

})(jQuery);