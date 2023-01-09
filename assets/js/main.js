/**
 * main.js is the entry point and main module for harrydulaney.com
 * @author Harry Dulaney
 * @since  0.3.0
 */


'use strict';

var open = false;
var isBlog = false;
var max600 = window.matchMedia("(max-width: 600px)");


/**
 * Initialize
 */
$(document).ready(function () {
    var initialScrollPos = window.scrollY;
    $(window).on('scroll', function () {
        if (open) {
            retractMobileMenu();
        }
        if (max600.matches) { // Mobile scroll behavior
            showNavbar();
        } else {
            // Regular Nav Bar behavior
            var currentScrollPos = window.scrollY;
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

    $('.main-container').on('click', function () {
        //Mobile body click behavior
        if (max600.matches) {
            if (open) {
                retractMobileMenu();
            }
        }

    });

    $('#mobile-menu-intro,#mobile-menu-project,#mobile-menu-about,#mobile-menu-contact, #mobile-menu-downloads').on('click', function () {
        if (open) {
            retractMobileMenu();
        }
    });
    /* Handle user preference for theme */
    // const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    // if (currentTheme) {
    //     document.documentElement.setAttribute('data-theme', currentTheme);

    // if (currentTheme === 'dark') {
    //     toggleSwitch.checked = true;
    // }
    // }
    /* Calculate + render years of experience */
    const startDate = new Date(2020, 4, 1);
    let elapsedTimeMillis = Date.now() - startDate.getTime();
    let elapsedTimeYears = elapsedTimeMillis / 31557600000; // Divide by millis in one year
    let yearsExpSnippet = 'I have ' + (elapsedTimeYears).toFixed(1) + ' years of professional experience working on Agile project teams';
    renderAboutMe(yearsExpSnippet);
    // Fetch and initialize Git status' on projects
    getAllRepoStats();
    // Draw skill charts
    // initSkillCharts();
    // Initialize Blog Mode
    initBlogView();
    // const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    // toggleSwitch.addEventListener('change', switchTheme, false);

});

function renderAboutMe(text) {
    let element = document.getElementById('insertYearsExperience');
    element.innerText = text;
}

function expandMobileMenu() {
    gsap.to('.top--navbar', { height: 'fit-content', duration: 0.1 })
    gsap.to('.bars', { opacity: 0, duration: 0.1 });
    gsap.to('.mobile--nav', { display: 'block', duration: 0.2 })
    gsap.to('.close', { opacity: 1, duration: 0.2 });
    open = true;

}

function retractMobileMenu() {
    gsap.to('.close', { opacity: 0, duration: 0.2 });
    gsap.to('.mobile--nav', { display: 'none', duration: 0.2 });
    gsap.to('.bars', { opacity: 1, duration: 0.1 });
    gsap.to('.top--navbar', { height: 'fit-content', duration: 0.1 });
    open = false;
}

function showNavbar() {
    $('.top--navbar').css('top', '0px');
}

function hideNavBar() {
    $('.top--navbar').css('top', '-50px');
}

function openBlog() {
    var tl = gsap.timeline();
    tl.add(gsap.to('.main-container', { duration: 0.5, translateX: '-100%' }));
    tl.add(gsap.set('.main-container', { display: 'none' }));
    tl.add(gsap.from('.blog-container', { display: 'block', translateX: '200%', duration: 0.5 }));
    tl.add(gsap.to('.blog-container', {
        display: 'block',
        duration: 0.5,
        translateX: 0
    }));

    tl.add(gsap.to('#nav-menu-downloads', { display: 'none', duration: 0.1 }));
    tl.add(gsap.to('#nav-menu-intro', { display: 'none', duration: 0.1 }));
    tl.add(gsap.to('#nav-menu-project', { display: 'none', duration: 0.1 }));
    tl.add(gsap.to('#nav-menu-contact', { display: 'none', duration: 0.1 }));
    tl.add(gsap.to('#nav-menu-about', { display: 'none', duration: 0.1 }));
    tl.play().then(() => {
        document.getElementById('blog--link').innerHTML = `<a href="" id="blog--link" class="m-sm-3" style="text-decoration: none;">
                <span id="blog--link-arrow"><i class="fas fa-arrow-left"></i></span>
                <span>Home</span>
            </a>`;
    });

    isBlog = true;
}

function closeBlog() {
    isBlog = false;
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
    const API_BASE = 'https://api.github.com/users/harrydulaney';
    const VIEWS_COUNT = '/traffic/popular/referrers';
    const REPOS_URL = '/repos';
    const PAGE_COUNT_QUERY = '?per_page=40';
    const INTRO_JAVA = 'intro-to-java-programming';
    const NOTES_ANDROID = 'notes-android-app';
    const CONTACT_LIST_APP = 'Contact-List-Android';
    const FILE_COMM = 'file-commander';
    const DEEZER_APP = 'deezer-web-app';
    const STOCK_PREDICTOR = 'stock-predictor';
    const SIM_AIR = 'airline-reservation-system';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_BASE + REPOS_URL + PAGE_COUNT_QUERY, true);

    xhr.onload = function () {
        const data = JSON.parse(this.response);
        for (let i in data) {
            switch (data[i].name) {
                case SIM_AIR:
                    /* Set Air Sim Github Stats */
                    let simAirStats = document.getElementById('sim-air-app-stats');
                    let simAirUpdateTime = simAirStats.getElementsByClassName('git-stats-datetime');
                    let simAirStars = document.getElementById('sim-air-stars');
                    let simAirForks = document.getElementById('sim-air-forks');
                    simAirStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    simAirForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t1 = new Date().toLocaleTimeString();
                    const d1 = new Date().toLocaleDateString();
                    simAirUpdateTime[0].innerHTML = (`<div>${t1} ${d1}</div>`);
                    break;

                case DEEZER_APP:
                    /* Set Deezer Web App Github Stats */
                    let deezerStats = document.getElementById('deezer-app-stats');
                    let deezerUpdateTime = deezerStats.getElementsByClassName('git-stats-datetime');
                    let deezerStars = document.getElementById('deezer-stars');
                    let deezerForks = document.getElementById('deezer-forks');
                    deezerStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    deezerForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t3 = new Date().toLocaleTimeString();
                    const d3 = new Date().toLocaleDateString();
                    deezerUpdateTime[0].innerHTML = (`<div>${d3} ${t3}</div>`);
                    break;

                case INTRO_JAVA:
                    /* Set Intro to Java Programming GitHub Stats */
                    let introJavaStats = document.getElementById('intro-java-app-stats');
                    let introJavaUpdated = introJavaStats.getElementsByClassName('git-stats-datetime');
                    let introToJavaStars = document.getElementById('intro-java-program-stars');
                    let introToJavaForks = document.getElementById('intro-java-program-forks');
                    introToJavaStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    introToJavaForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t4 = new Date().toLocaleTimeString();
                    const d4 = new Date().toLocaleDateString();
                    introJavaUpdated[0].innerHTML = (`<div>${d4} ${t4}</div>`);
                    break;

                case FILE_COMM:
                    /* Set File Commander GitHub Stats */
                    let fileCommStats = document.getElementById('file-commander-stats');
                    let fileCommUpdated = fileCommStats.getElementsByClassName('git-stats-datetime');
                    let fileCommStars = document.getElementById('file-commander-stars');
                    let fileCommForks = document.getElementById('file-commander-forks');
                    fileCommStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    fileCommForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t5 = new Date().toLocaleTimeString();
                    const d5 = new Date().toLocaleDateString();
                    fileCommUpdated[0].innerHTML = (`<div>${d5} ${t5}</div>`);
                    break;

                case CONTACT_LIST_APP:
                    /* Set Contact List App GitHub Stats */
                    let contactAppStats = document.getElementById('contact-app-stats');
                    let contactAppUpdate = contactAppStats.getElementsByClassName('git-stats-datetime');
                    let contactAppStars = document.getElementById('contact-app-stars');
                    let contactAppForks = document.getElementById('contact-app-forks');
                    contactAppStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    contactAppForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t6 = new Date().toLocaleTimeString();
                    const d6 = new Date().toLocaleDateString();
                    contactAppUpdate[0].innerHTML = (`<div>${d6} ${t6}</div>`);
                    break;

                case NOTES_ANDROID:
                    /* Set Notes 4 Android GitHub Stats */
                    let notesStats = document.getElementById('notes-4-android-stats');
                    let updateDateTime = notesStats.getElementsByClassName('git-stats-datetime');
                    let notesStars = document.getElementById('notes-4-android-stars');
                    let notesForks = document.getElementById('notes-4-android-forks');
                    notesStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    notesForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t7 = new Date().toLocaleTimeString();
                    const d7 = new Date().toLocaleDateString();
                    updateDateTime[0].innerHTML = (`<div>${d7} ${t7}</div>`);
                    break;

                case STOCK_PREDICTOR:
                    /* Set Stock Picker GitHub Stats */
                    let stockPredStats = document.getElementById('stock-predictor-stats');
                    let updateTime = stockPredStats.getElementsByClassName('git-stats-datetime');
                    let stockPredStars = document.getElementById('stock-predictor-stars');
                    let stockPredForks = document.getElementById('stock-predictor-forks');
                    stockPredStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                    stockPredForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                    /* Set Last Updated */
                    const t8 = new Date().toLocaleTimeString();
                    const d8 = new Date().toLocaleDateString();
                    updateTime[0].innerHTML = (`<div>${d8} ${t8}</div>`);
                    break;
   
            }
        }

    }
    xhr.send();

    GitHubCalendar(".calendar", "harrydulaney", {
        responsive: true,
        tooltips: true,
    });

}

function showArrow(element) {
    gsap.to('#blog--link-arrow', { display: 'inherit', duration: 0.2 })
    gsap.to('#blog--link-arrow', { opacity: 1, duration: 0.5 });
}

function hideArrow(element) {
    gsap.to('#blog--link-arrow', { opacity: 0, duration: 0.5 });
    gsap.to('#blog--link-arrow', { display: 'none', duration: 0.2 })
}


function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this

    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this

    }
}

function initBlogView() {
    const blogLink = $('#blog--link');
    blogLink.bind('click', function (e) {
        openBlog();
    });
    const blogLinkMobile = $('#blog--link-mobile');
    blogLinkMobile.bind('click', function (e) {
        openBlog();
        // Set Navbar to react to scroll behavior from blog iframe
        var blogContainer = $('.blog-container');
        var initialScrollPos = blogContainer.scrollTop;
        blogContainer.on('scroll', function () {
            if (open) {
                retractMobileMenu();
            }
            if (max600.matches) { // Mobile scroll behavior
                showNavbar();
            } else {
                // Regular Nav Bar behavior
                var currentScrollPos = blogContainer.scrollTop;
                if (initialScrollPos > currentScrollPos) {
                    showNavbar();
                } else if (currentScrollPos >= 41) {
                    hideNavBar();
                }
                initialScrollPos = currentScrollPos;
            }
        });
        retractMobileMenu();
    });

    blogLink.bind('mouseenter', function (e) {
        showArrow(this);
    });
    blogLink.bind('mouseleave', function (e) {
        hideArrow(this);
    });
}
