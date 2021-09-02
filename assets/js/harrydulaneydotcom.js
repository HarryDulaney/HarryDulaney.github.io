/** @author Harry Dulaney */
var open = false;
$(document).ready(function () {

    $('.mobile-nav-toggle').on('click', function () {
        if (!open) {
            expandMobileMenu();
        } else if (open) {
            retractMobileMenu();
        }

    });

    $(window).on('scroll', function () {
        if (open) {
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
    $('.mobile--nav').css('display', 'none');
    $('.top--navbar').css('height', 'fit-content');
    gsap.to('.bar',{rotation: -180, duration: 0.5});
    open = false;
}

function expandMobileMenu() {
    $('.mobile--nav').css('display', 'block');
    $('.top--navbar').css('height', '200px');
    gsap.to('.bar',{rotation: 180, duration: 0.5});
    open = true;

}