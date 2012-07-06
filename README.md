jquery-heroes
=============

A jQuery plugin for highlighting the heroes on a page.

To highlight a hero on the page just call heroes() on the selector for the hero.

    $('.one-hero').heroes();

If that selector leads to multiple elements being highlighted jQuery Heroes will highlight each one separately.

    $('.two-heroes').heroes();

You can also highlight the heroes from the result of two or more selectors.

    $('.one-hero, .two-heroes').heroes();

Parameters (**defaults in bold**):

* overlayOpacity (**0.3**)
* overlayColor (**'#333'**)
* animateOverlay (**true**)
* animationSpeed (**500**)
* animationEasing (**''**)
* clickOverlayToClose (**true**)
* beforeShowHeroes
* afterShowHeroes
* beforeHideHeroes
* afterHideHeroes

#  

__*Please note that in order to have your heroes show up correctly they must have a background defined. Otherwise the overlay will simply show through.*__

#  

### Questions? Problems? Please feel free to let me know!

#  

----

License
-------
Copyright (c) 2012, Tim Wagner

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation 
and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.