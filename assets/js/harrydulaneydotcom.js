/** @author Harry Dulaney */

var open, mainNavVisible, max1180, max900, max767, max600, max360, mtl;

$(document).ready(function () {
    open = false;
    mainNavVisible = true;
    max1180 = window.matchMedia("(max-width: 1180px)");
    max900 = window.matchMedia("(max-width: 900px)");
    max767 = window.matchMedia("(max-width: 767)");
    max600 = window.matchMedia("(max-width: 600px)");
    max360 = window.matchMedia("(max-width: 360px)");
    mtl = gsap.timeline({defaults: {duration: 1, ease: 'expo.inOut'}});

    $(window).on('scroll', function () {
        if (open) {
            retractMobileMenu();
        }
        if (max1180.matches || max900.matches) {
        }
    });

    $('.mobile-nav-toggle').on('click', function () {
        if (!open) {
            expandMobileMenu();
        } else if (open) {
            retractMobileMenu();
        }

    });

    $('.main--body').on('click', function () {
        if (open) {
            retractMobileMenu();
        }
    });
});

function retractMobileMenu() {
    mtl.to('.close', {opacity: 0, duration: 0.2}, '-=0.5')
        .to('.top--navbar', {height: '41px', duration: 0.2}, '-=0.5')
        .to('.mobile--nav', {display: 'none', duration: 0.2}, '-=0.5')
        .to('.bars', {opacity: 1, duration: 0.1}, '-=0.5')
        .to('.top--navbar', {height: 'fit-content',duration:0.1}, '-=0.5');
    open = false;
}

function expandMobileMenu() {
    mtl.to('.top--navbar', {height: '185px', duration: 0.1}, '-=0.5')
        .to('.bars', {opacity: 0, duration: 0.1}, '-=0.5')
        .to('.mobile--nav', {display: 'block', duration: 0.2}, '-=0.5')
        .to('.close', {opacity: 1, duration: 0.2}, '-=0.5');
    open = true;
}