/** @author Harry Dulaney */

var open = false;
var mainNavVisible = true;
var max1180 = window.matchMedia("(max-width: 1180px)");
var max900 = window.matchMedia("(max-width: 900px)");
var max767 = window.matchMedia("(max-width: 767)");
var max600 = window.matchMedia("(max-width: 600px)");
var max360 = window.matchMedia("(max-width: 360px)");
var min900 = window.matchMedia("(min-width: 900)");
var min600 = window.matchMedia("(min-width: 600)");

$(document).ready(function () {
    var initialScrollPos = window.pageYOffset;

    $(window).on('scroll', function () {
        if (open) {
            retractMobileMenu();
        }
        if (max600.matches) { // Mobile scroll behavior
            showNavbar();
        } else {
            // Regular Nav Bar behavior
            var currentScrollPos = window.pageYOffset;
            if (initialScrollPos > currentScrollPos) {
                showNavbar();
            } else if (currentScrollPos >= 41) {
                hideNavBar();
            }
            initialScrollPos = currentScrollPos;
        }
    });

    $('.mobile-nav-toggle').on('click', function () {
        //Mobile nav click behavior
        if (max600.matches) {
            if (!open) {
                expandMobileMenu();
            } else if (open) {
                retractMobileMenu();
            }
        }


    });

    $('.main--body').on('click', function () {
        //Mobile body click behavior
        if (max600.matches) {
            if (open) {
                retractMobileMenu();
            }
        } else {
            // Regular Nav Behavior
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

function showNavbar() {
    $('.top--navbar').css('top', '0px');
}

function hideNavBar() {
    $('.top--navbar').css('top', '-50px');
}


function expandMobileMenu() {
    gsap.to('.top--navbar', {height: '185px', duration: 0.1})
    gsap.to('.bars', {opacity: 0, duration: 0.1});
    gsap.to('.mobile--nav', {display: 'block', duration: 0.2})
    gsap.to('.close', {opacity: 1, duration: 0.2});
    open = true;

}