'use strict';

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


/** 
 * Save user preference for theme
 */
function storeTheme(themeName) {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

/**
 * Expand the mobile menu navigation
 */
function expandMobileMenu() {
    gsap.to('.top--navbar', { height: 'fit-content', duration: 0.1 });
    gsap.to('.mobile--nav', { display: 'block', duration: 0.2 });
    open = true;

}

/**
 * Retract the mobile menu navigation to start position
 */
function retractMobileMenu() {
    gsap.to('.mobile--nav', { display: 'none', duration: 0.2 });
    gsap.to('.top--navbar', { height: 'fit-content', duration: 0.1 });
    open = false;
}

/**
 * Make the navbar visible
 */
function showNavbar() {
    $('.top--navbar').css('top', '0px');
}

/**
 * Disappear the navbar
 */
function hideNavBar() {
    $('.top--navbar').css('top', '-50px');
}


function showBlogArrow(element) {
    gsap.to('#blog--link-arrow', { display: 'inherit', duration: 0.2 })
    gsap.to('#blog--link-arrow', { opacity: 1, duration: 0.5 });
}

function hideBlogArrow(element) {
    gsap.to('#blog--link-arrow', { opacity: 0, duration: 0.5 });
    gsap.to('#blog--link-arrow', { display: 'none', duration: 0.2 })
}
