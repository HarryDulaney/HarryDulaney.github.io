'use strict';

/**
 * app.js for harrydulaney.com
 * @author Harry Dulaney
 * @since  0.3.0
 */

const THEME_STORAGE_KEY = 'harry-dulaney-com-theme-preference';
const LIGHT_THEME_NAME = 'light';
const DARK_THEME_NAME = 'dark';
const THEME_SWITCH_ID = 'theme-switch-id';
const THEME_PREFERENCE_ATTRIBUTE = 'data-theme';

const MILLIS_PER_YEAR = 31557600000;

var open = false;
var isBlog = false;
var max600 = window.matchMedia("(max-width: 600px)");


/**
 * Main method, on document ready
 */
$(document).ready(function () {
    initializeTheme();
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

    /* Calculate + render years of experience */
    const fullTimeStartDate = new Date(2019, 4, 1);
    const javaStartDate = new Date(2017, 1, 1);
    const springStartDate = new Date(2017, 4, 1);
    const javaScriptStartDate = new Date(2010, 4, 1);
    const angularStartDate = new Date(2019, 1, 1);
    const azureCloudStartDate = new Date(2020, 9, 1);
    const kubernetesStartDate = new Date(2021, 4, 1);
    const microServicesStartDate = new Date(2020, 9, 1);
    const webDevelopmentStartDate = new Date(2010, 1, 1);




    renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
        azureCloudStartDate, kubernetesStartDate, microServicesStartDate, webDevelopmentStartDate);
    // Fetch and initialize Git status' on projects
    getAllRepoStats();

});

function renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
    azureCloudStartDate, kubernetesStartDate, microServicesStartDate, webDevelopmentStartDate) {
    /* Set About Me main paragraph years of work experience data */
    let fullTimeElapsedTime = Date.now() - fullTimeStartDate.getTime();
    let fullTimeElapsedYears = fullTimeElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let fullTimeWorkMessage = 'I have ' + (fullTimeElapsedYears).toFixed(1) + ' years of professional experience working on Agile project teams';
    let fullTimeWorkElement = document.getElementById('insertYearsExperience');
    fullTimeWorkElement.innerText = fullTimeWorkMessage;
    /* Set Top Skills years of work experience Java */
    let javaTimeElapsedTime = Date.now() - javaStartDate.getTime();
    let javaTimeElapsedYears = javaTimeElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let javaTimeElapsedFormated = javaTimeElapsedYears.toFixed(1);
    let javaTimeWorkElement = document.getElementById('java-skill-exp-elapsed');
    let javaWrapperElement = javaTimeWorkElement.querySelector('.wrapper');
    javaWrapperElement.dataset.years = javaTimeElapsedFormated;
    let javaTimeDataElement = javaTimeWorkElement.querySelector('.skills-data');
    javaTimeDataElement.innerText = javaTimeElapsedFormated + ' years';
    let javaProgressBarElement = javaTimeWorkElement.querySelector('.skills-progress-box');
    let javaDataEl = javaProgressBarElement.querySelector('.skills-progress');
    javaDataEl.dataset.years = javaTimeElapsedFormated;

    /* Set Top Skills years of work experience Spring */
    let springTimeElapsedTime = Date.now() - springStartDate.getTime();
    let springTimeElapsedYears = springTimeElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let springTimeFormated = (springTimeElapsedYears).toFixed(1);
    let springTimeWorkElement = document.getElementById('spring-skill-exp-elapsed');
    let springWrapperElement = springTimeWorkElement.querySelector('.wrapper');
    springWrapperElement.dataset.years = springTimeFormated;
    let springTimeDataElement = springTimeWorkElement.querySelector('.skills-data');
    springTimeDataElement.innerText = springTimeFormated + ' years';
    let springProgressBarElement = springTimeWorkElement.querySelector('.skills-progress-box');
    let springDataEl = springProgressBarElement.querySelector('.skills-progress');
    springDataEl.dataset.years = springTimeFormated;

    /* Set Top Skills years of work experience JavaScript */
    let jsStartElapsedTime = Date.now() - javaScriptStartDate.getTime();
    let jsStartElapsedYears = jsStartElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let jsTimeWorkFormated = (jsStartElapsedYears).toFixed(1);
    let jsSkillElement = document.getElementById('js-skill-exp-elapsed');
    let jsWrapperElement = jsSkillElement.querySelector('.wrapper');
    jsWrapperElement.dataset.years = jsTimeWorkFormated;
    let jsSkillTimeDataElement = jsSkillElement.querySelector('.skills-data');
    jsSkillTimeDataElement.innerText = jsTimeWorkFormated + ' years';
    let jsProgressBarElement = jsSkillElement.querySelector('.skills-progress-box');
    let jsDataEl = jsProgressBarElement.querySelector('.skills-progress');
    jsDataEl.dataset.years = jsTimeWorkFormated;

    /* Set Top Skills years of work experience Angular */
    let angularElapsedTime = Date.now() - angularStartDate.getTime();
    let angularElapsedYears = angularElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let angularElapsedTimeFormated = (angularElapsedYears).toFixed(1);
    let angularSkillsElement = document.getElementById('angular-skill-exp-elapsed');
    let angularWrapperElement = angularSkillsElement.querySelector('.wrapper');
    angularWrapperElement.dataset.years = angularElapsedTimeFormated;
    let angularSkillTimeDataElement = angularSkillsElement.querySelector('.skills-data');
    angularSkillTimeDataElement.innerText = angularElapsedTimeFormated + ' years';
    let angularProgressBarElement = angularSkillsElement.querySelector('.skills-progress-box');
    let angularDataEl = angularProgressBarElement.querySelector('.skills-progress');
    angularDataEl.dataset.years = angularElapsedTimeFormated;

    /* Set Top Skills years of work experience Azure */
    let azureElapsedTime = Date.now() - azureCloudStartDate.getTime();
    let azureElapsedYears = azureElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let azureElapsedTimeFormated = (azureElapsedYears).toFixed(1);
    let azureSkillElement = document.getElementById('azure-skill-exp-elapsed');
    let azureWrapperElement = azureSkillElement.querySelector('.wrapper');
    azureWrapperElement.dataset.years = azureElapsedTimeFormated;
    let azureSkillDataElement = azureSkillElement.querySelector('.skills-data');
    azureSkillDataElement.innerText = azureElapsedTimeFormated + ' years';
    let azureProgressBarElement = azureSkillElement.querySelector('.skills-progress-box');
    let azureDataEl = azureProgressBarElement.querySelector('.skills-progress');
    azureDataEl.dataset.years = azureElapsedTimeFormated;

    /* Set Top Skills years of work experience K8s */
    let kubElapsedTime = Date.now() - kubernetesStartDate.getTime();
    let kubElapsedTimeYears = kubElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let kubElapsedFormatted = (kubElapsedTimeYears).toFixed(1);
    let kubSkillsElement = document.getElementById('k8-skill-exp-elapsed');
    let kubWrapperElement = kubSkillsElement.querySelector('.wrapper');
    kubWrapperElement.dataset.years = kubElapsedFormatted;
    let kubSkillDataElement = kubSkillsElement.querySelector('.skills-data');
    kubSkillDataElement.innerText = kubElapsedFormatted + ' years';
    let kubProgressBarElement = kubSkillsElement.querySelector('.skills-progress-box');
    let kubDataEl = kubProgressBarElement.querySelector('.skills-progress');
    kubDataEl.dataset.years = kubElapsedFormatted;

    /* Set Top Skills years of work experience Microservices */
    let microServicesElapsedTime = Date.now() - microServicesStartDate.getTime();
    let msElapsedTimeYears = microServicesElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let msElapsedFormated = (msElapsedTimeYears).toFixed(1);
    let microServicesSkillElement = document.getElementById('microservice-skill-exp-elapsed');
    let microServicesWrapperElement = microServicesSkillElement.querySelector('.wrapper');
    microServicesWrapperElement.dataset.years = msElapsedFormated;
    let msSkillDataElement = microServicesSkillElement.querySelector('.skills-data');
    msSkillDataElement.innerText = msElapsedFormated + ' years';
    let msProgressBarElement = microServicesSkillElement.querySelector('.skills-progress-box');
    let msDataEl = msProgressBarElement.querySelector('.skills-progress');
    msDataEl.dataset.years = msElapsedFormated;

    /* Set Top Skills years of work experience Web Dev */
    let webDevTimeElapsedTime = Date.now() - webDevelopmentStartDate.getTime();
    let webDevElapsedTimeYears = webDevTimeElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let webDevElapsedTimeFormated = (webDevElapsedTimeYears).toFixed(1);
    let webDevSkillElement = document.getElementById('web-dev-skill-exp-elapsed');
    let webDevWrapperElement = webDevSkillElement.querySelector('.wrapper');
    webDevWrapperElement.dataset.years = webDevElapsedTimeFormated;
    let webDevSkillTimeDataElement = webDevSkillElement.querySelector('.skills-data');
    webDevSkillTimeDataElement.innerText = webDevElapsedTimeFormated + ' years';
    let webDevProgressBarElement = webDevSkillElement.querySelector('.skills-progress-box');
    let webDevDataEl = webDevProgressBarElement.querySelector('.skills-progress');
    webDevDataEl.dataset.years = webDevElapsedTimeFormated;

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

/* Contact Form Handlers */
function enableSubmitButton(token) {
    $('#submitButton').prop('disabled', false);
}

function disableSubmitButton() {
    $('#submitButton').prop('disabled', true);
}

/* Project Section Expand Handler */
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

}

function showArrow(element) {
    gsap.to('#blog--link-arrow', { display: 'inherit', duration: 0.2 })
    gsap.to('#blog--link-arrow', { opacity: 1, duration: 0.5 });
}

function hideArrow(element) {
    gsap.to('#blog--link-arrow', { opacity: 0, duration: 0.5 });
    gsap.to('#blog--link-arrow', { display: 'none', duration: 0.2 })
}


/**
 * Initialize the UI theme from user prefereneces
 */
function initializeTheme() {
    var themeName = localStorage.getItem(THEME_STORAGE_KEY);
    if (themeName !== null) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, themeName);
        if (themeName === LIGHT_THEME_NAME) {
            document.getElementById(THEME_SWITCH_ID).checked = true;
            setLightTheme();

        } else {
            document.getElementById(THEME_SWITCH_ID).checked = false;
            setDarkTheme();

        }
        return;
    }
    // localStorage.themeName is null, set to Dark as default
    themeName = DARK_THEME_NAME;
    setTheme(themeName);
    document.getElementById(THEME_SWITCH_ID).checked = false;


}

/** 
 * Toggle between light and dark themes 
 */
function toggleTheme() {
    if (localStorage.getItem(THEME_STORAGE_KEY) === LIGHT_THEME_NAME) {
        setTheme(DARK_THEME_NAME);
        document.getElementById(THEME_SWITCH_ID).checked = false;
    } else {
        setTheme(LIGHT_THEME_NAME);
        document.getElementById(THEME_SWITCH_ID).checked = true;
    }
}

/** 
 * Save user preference for theme
 */
function setTheme(themeName) {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
    document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, themeName);
    if (themeName === LIGHT_THEME_NAME) {
        setLightTheme();
    } else {
        setDarkTheme();
    }
}

function setLightTheme() {
    $('.splash-one-overlay').css('background', 'url("./assets/img/blue__splash_light_theme.png") no-repeat center');
    $('.splash-one-overlay').css('position', 'relative');
    $('.splash-one-overlay').css('display', 'block');
    $('.splash-one-overlay').css('background-size', 'cover');
    $('.splash-one-overlay').css('z-index', '0');

    $('.intro--wrapper').css('position', 'relative');
    $('.intro--wrapper').css('overflow', 'hidden');
    $('.intro--wrapper').css('background-color', 'var(--bgcolor-primary)');
    $('.intro--wrapper').css('height', 'calc(100vh - 40px)');

    $('.astronaut-flying-towards-overlay ').css('background', 'url("./assets/img/astronaut-flying-towards-viewer-light-theme.png") no-repeat center');
    $('.astronaut-flying-towards-overlay ').css('position', 'relative');
    $('.astronaut-flying-towards-overlay ').css('display', 'block');
    $('.astronaut-flying-towards-overlay ').css('background-size', 'contain');
    $('.astronaut-flying-towards-overlay ').css('z-index', '0');

    var gitStatusTextStyle = document.querySelectorAll('.git-stats-label-text');
    gitStatusTextStyle.forEach(element => {
        element.classList.remove('text-white');
    });

    var statsDateTime = document.querySelectorAll('.git-stats-datetime')
    statsDateTime.forEach(element => {
        element.classList.remove('text-white');
    });

}

function setDarkTheme() {
    $('.splash-one-overlay').css('background', 'url("./assets/img/blue__splash.png") no-repeat center');
    $('.splash-one-overlay').css('position', 'relative');
    $('.splash-one-overlay').css('display', 'block');
    $('.splash-one-overlay').css('background-size', 'cover');
    $('.splash-one-overlay').css('z-index', '0');

    $('.intro--wrapper').css('position', 'relative');
    $('.intro--wrapper').css('overflow', 'hidden');
    $('.intro--wrapper').css('background-color', 'var(--bgcolor-primary)');
    $('.intro--wrapper').css('height', 'calc(100vh - 40px)');

    $('.astronaut-flying-towards-overlay ').css('background', 'url("./assets/img/astronaut-flying-towards-view.png") no-repeat center');
    $('.astronaut-flying-towards-overlay ').css('position', 'relative');
    $('.astronaut-flying-towards-overlay ').css('display', 'block');
    $('.astronaut-flying-towards-overlay ').css('background-size', 'contain');
    $('.astronaut-flying-towards-overlay ').css('z-index', '0');


    var gitStatusTextStyle = document.querySelectorAll('.git-stats-label-text')
    gitStatusTextStyle.forEach(element => {
        element.classList.add('text-white');
    });

    var statsDateTime = document.querySelectorAll('.git-stats-datetime')
    statsDateTime.forEach(element => {
        element.classList.add('text-white');
    });
}