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
    getAllRepoStats();
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

function enableSubmitButton(token) {
    $('#submit-button').prop('disabled', false);
}

function disableSubmitButton() {
    $('#submit-button').prop('disabled', true);

}

function expandMobileMenu() {
    gsap.to('.top--navbar', {height: '185px', duration: 0.1})
    gsap.to('.bars', {opacity: 0, duration: 0.1});
    gsap.to('.mobile--nav', {display: 'block', duration: 0.2})
    gsap.to('.close', {opacity: 1, duration: 0.2});
    open = true;

}

/**
 * Retrieve's stats on all repo's for my username and
 * updates the document elements
 */
function getAllRepoStats() {
    const API_BASE = 'https://api.github.com/users/harrydulaney';
    const REPOS_URL = '/repos';
    const CLONE_ACTIVITY_URL = '/graphs/clone-activity-data';
    const VIEW_ACTIVITY_URL = '/graphs/traffic-data';
    const INTRO_JAVA = 'intro-to-java-programming';
    const DEEZER_APP = 'deezer-example-web-app';
    const STOCK_PREDICTOR = 'stock-predictor';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_BASE + REPOS_URL, true);

    xhr.onload = function () {
        const data = JSON.parse(this.response);
        for (let i in data) {
            /* Set Deezer Web App GitHub Stats */
            if (data[i].name === DEEZER_APP) {
                // let deezerStats = document.getElementById('deezer-app-stats');
                // let deezerUpdateTime = deezerStats.getElementsByClassName('git-stats-datetime');

                let deezerStars = document.getElementById('deezer-stars');
                let deezerForks = document.getElementById('deezer-forks');
                // let deezerWatchers = document.getElementById('deezer-watchers');

                deezerStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                deezerForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                // deezerWatchers.innerHTML = (`<strong>${data[i].watchers_count}</strong>`);
                /* Set Last Updated */
                // const date = new Date().toISOString();
                // deezerUpdateTime[0].innerHTML = (`<div><small>Last Updated: ${date}</small></div>`);


            }
            /* Set Intro to Java Programming GitHub Stats */
            if (data[i].name === INTRO_JAVA) {
                // let introJavaStats = document.getElementById('intro-java-app-stats');
                // let introJavaUpdated = introJavaStats.getElementsByClassName('git-stats-datetime');

                let introToJavaStars = document.getElementById('intro-java-program-stars');
                let introToJavaForks = document.getElementById('intro-java-program-forks');
                // let introToJavaWatchers = document.getElementById('intro-java-program-watchers');

                introToJavaStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                introToJavaForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                // introToJavaWatchers.innerHTML = (`<strong>${data[i].watchers_count}</strong>`);

                /* Set Last Updated */
                // const date = new Date().toISOString();
                // introJavaUpdated[0].innerHTML = (`<small>Last Updated: ${date}</small>`);

            }
            /* Set Stock Picker GitHub Stats */
            if (data[i].name === STOCK_PREDICTOR) {
                // let stockPredStats = document.getElementById('stock-predictor-stats');
                // let updateTime = stockPredStats.getElementsByClassName('git-stats-datetime');

                let stockPredStars = document.getElementById('stock-predictor-stars');
                let stockPredForks = document.getElementById('stock-predictor-forks');
                // let stockPredWatchers = document.getElementById('stock-predictor-watchers');

                stockPredStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                stockPredForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                // stockPredWatchers.innerHTML = (`<strong>${data[i].watchers_count}</strong>`);
                /* Set Last Updated */
                // const date = new Date().toISOString();
                // updateTime[0].innerHTML = (`<small>Last Updated: ${date}</small>`);
            }
        }

    }
    xhr.send();
}

