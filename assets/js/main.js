'use strict';
var open = false;
var mainNavVisible = true;
var max1180 = window.matchMedia("(max-width: 1180px)");
var max900 = window.matchMedia("(max-width: 900px)");
var max767 = window.matchMedia("(max-width: 767)");
var max600 = window.matchMedia("(max-width: 600px)");
var max360 = window.matchMedia("(max-width: 360px)");
var min900 = window.matchMedia("(min-width: 900)");
var min600 = window.matchMedia("(min-width: 600)");

/**
 * Main
 */
$(document).ready(function () {
    'use strict';
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
    // Setup Git status on project section
    getAllRepoStats();
    // Initialize Blog Mode
    $('#blog--link-page').on('click', function (e) {
        openBlog();

    });

    $('#blog--link-mobile').on('click', function (e) {
        openBlog();
    });

});

function retractMobileMenu() {
    gsap.to('.close', {opacity: 0, duration: 0.2});
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

function openBlog() {
    var blogNode = document.getElementById('blog--container');
    var mainContainer = document.getElementById('top');
    mainContainer.style.display = 'none';
    blogNode.classList.remove('hide--h');
}

function closeBlog() {
    var blogNode = document.getElementById('blog--container');
    var mainContainer = document.getElementById('top');
    mainContainer.style.display = 'inherit';
    blogNode.classList.add('hide--h');
}


function expandMobileMenu() {
    gsap.to('.top--navbar', {height: '200px', duration: 0.1})
    gsap.to('.bars', {opacity: 0, duration: 0.1});
    gsap.to('.mobile--nav', {display: 'block', duration: 0.2})
    gsap.to('.close', {opacity: 1, duration: 0.2});
    open = true;

}

/* Contact Form Handlers */
function enableSubmitButton(token) {
    $('#submitButton').prop('disabled', false);
}

function disableSubmitButton() {
    $('#submitButton').prop('disabled', true);
}

/* Project Section Expand Handlers */
function toggleExpandProjects() {
    let p = document.getElementById('more-projects-wrapper');
    if (p.dataset.expanded === 'false') {
        p.classList.remove('hide--h');
        p.dataset.expanded = 'true';
        let btn = document.getElementById('expandProjectsBtn');
        btn.innerText = 'Show less projects...';
    } else {
        p.classList.add('hide--h');
        p.dataset.expanded = 'false';
        let btn = document.getElementById('expandProjectsBtn');
        btn.innerText = 'Show more projects...';
    }
}


/**
 * Retrieve stats on all repo's by username and
 * update the DOM elements
 */
function getAllRepoStats() {
    'use strict';
    const API_BASE = 'https://api.github.com/users/harrydulaney';
    const REPOS_URL = '/repos';
    const PAGE_COUNT_QUERY = '?per_page=40';
    const CLONE_ACTIVITY_URL = '/graphs/clone-activity-data';
    const VIEW_ACTIVITY_URL = '/graphs/traffic-data';
    const INTRO_JAVA = 'intro-to-java-programming';
    const NOTES_ANDROID = 'notes-android-app';
    const CONTACT_LIST_APP = 'Contact-List-Android';
    const FILE_COMM = 'file-commander';
    const DEEZER_APP = 'deezer-web-app';
    const STOCK_PREDICTOR = 'stock-predictor';
    const SIM_AIR = 'airline-reservation-system';
    const COIN_EXPLORER = 'coin-explorer';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_BASE + REPOS_URL + PAGE_COUNT_QUERY, true);

    xhr.onload = function () {
        const data = JSON.parse(this.response);
        for (let i in data) {
            /* Set Air Sim Github Stats */
            if (data[i].name === SIM_AIR) {
                let simAirStats = document.getElementById('sim-air-app-stats');
                let simAirUpdateTime = simAirStats.getElementsByClassName('git-stats-datetime');

                let simAirStars = document.getElementById('sim-air-stars');
                let simAirForks = document.getElementById('sim-air-forks');

                simAirStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                simAirForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                simAirUpdateTime[0].innerHTML = (`<div>${date} ${time}</div>`);
            }
            /* Set Deezer Web App GitHub Stats */
            if (data[i].name === DEEZER_APP) {
                let deezerStats = document.getElementById('deezer-app-stats');
                let deezerUpdateTime = deezerStats.getElementsByClassName('git-stats-datetime');

                let deezerStars = document.getElementById('deezer-stars');
                let deezerForks = document.getElementById('deezer-forks');

                deezerStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                deezerForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                deezerUpdateTime[0].innerHTML = (`<div>${date} ${time}</div>`);


            }
            /* Set Intro to Java Programming GitHub Stats */
            if (data[i].name === INTRO_JAVA) {
                let introJavaStats = document.getElementById('intro-java-app-stats');
                let introJavaUpdated = introJavaStats.getElementsByClassName('git-stats-datetime');

                let introToJavaStars = document.getElementById('intro-java-program-stars');
                let introToJavaForks = document.getElementById('intro-java-program-forks');

                introToJavaStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                introToJavaForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                introJavaUpdated[0].innerHTML = (`<div>${date} ${time}</div>`);

            }
            /* Set Coin Explorer GitHub Stats */
            if (data[i].name === COIN_EXPLORER) {
                let stats = document.getElementById('coin-explorer-app-stats');
                let updatedTime = stats.getElementsByClassName('git-stats-datetime');

                let stars = document.getElementById('coin-explorer-stars');
                let forks = document.getElementById('coin-explorer-forks');

                stars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                forks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                updatedTime[0].innerHTML = (`<div>${date} ${time}</div>`);

            }
            /* Set File Commander GitHub Stats */
            if (data[i].name === FILE_COMM) {
                let fileCommStats = document.getElementById('file-commander-stats');
                let fileCommUpdated = fileCommStats.getElementsByClassName('git-stats-datetime');

                let fileCommStars = document.getElementById('file-commander-stars');
                let fileCommForks = document.getElementById('file-commander-forks');

                fileCommStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                fileCommForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                fileCommUpdated[0].innerHTML = (`<div>${date} ${time}</div>`);

            }
            /* Set Notes 4 Android GitHub Stats */
            if (data[i].name === CONTACT_LIST_APP) {
                let contactAppStats = document.getElementById('contact-app-stats');
                let contactAppUpdate = contactAppStats.getElementsByClassName('git-stats-datetime');

                let contactAppStars = document.getElementById('contact-app-stars');
                let contactAppForks = document.getElementById('contact-app-forks');

                contactAppStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                contactAppForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                contactAppUpdate[0].innerHTML = (`<div>${date} ${time}</div>`);
            }
            /* Set Contact List App GitHub Stats */
            if (data[i].name === NOTES_ANDROID) {
                let notesStats = document.getElementById('notes-4-android-stats');
                let updateDateTime = notesStats.getElementsByClassName('git-stats-datetime');

                let notesStars = document.getElementById('notes-4-android-stars');
                let notesForks = document.getElementById('notes-4-android-forks');

                notesStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                notesForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                updateDateTime[0].innerHTML = (`<div>${date} ${time}</div>`);
            }
            /* Set Stock Picker GitHub Stats */
            if (data[i].name === STOCK_PREDICTOR) {
                let stockPredStats = document.getElementById('stock-predictor-stats');
                let updateTime = stockPredStats.getElementsByClassName('git-stats-datetime');

                let stockPredStars = document.getElementById('stock-predictor-stars');
                let stockPredForks = document.getElementById('stock-predictor-forks');

                stockPredStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                stockPredForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                /* Set Last Updated */
                const time = new Date().toLocaleTimeString();
                const date = new Date().toLocaleDateString();
                updateTime[0].innerHTML = (`<div>${date} ${time}</div>`);
            }
        }

    }
    xhr.send();
}

