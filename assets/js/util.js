'use strict';

//utils.js
/**
 * Get current value of the scroll Y offset postion (scroll position)
 * @returns number of pixels scrolled vertically from top of page
 */
function getPixelScrolledFromTop(window, document) {
    if (window.scrollY && window.scrollY !== undefined) {
        return window.scrollY;
    } else {
        return (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
}