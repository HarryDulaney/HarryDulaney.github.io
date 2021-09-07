/** @author Harry Dulaney */

var open = false;
var mainNavVisible = true;
var max1180 = window.matchMedia("(max-width: 1180px)");
var max900 = window.matchMedia("(max-width: 900px)");
var max767 = window.matchMedia("(max-width: 767)");
var max600 = window.matchMedia("(max-width: 600px)");
var max360 = window.matchMedia("(max-width: 360px)");

$(document).ready(function () {
    $(window).on('scroll', function () {
        if (open) {
            retractMobileMenu();
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
    gsap.to('.close', {opacity: 0, duration: 0.2});
    gsap.to('.top--navbar', {height: '40px', duration: 0.2});
    gsap.to('.mobile--nav', {display: 'none', duration: 0.2});
    gsap.to('.bars', {opacity: 1, duration: 0.1});
    gsap.to('.top--navbar', {height: 'fit-content', duration: 0.1});
    open = false;
}

function expandMobileMenu() {
    gsap.to('.top--navbar', {height: '185px', duration: 0.1})
    gsap.to('.bars', {opacity: 0, duration: 0.1});
    gsap.to('.mobile--nav', {display: 'block', duration: 0.2})
    gsap.to('.close', {opacity: 1, duration: 0.2});
    open = true;
}