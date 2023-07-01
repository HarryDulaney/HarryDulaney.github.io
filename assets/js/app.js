'use strict';

/**
 * app.js for harrydulaney.com
 * @author Harry Dulaney
 * @since  1.1.0
 */

const THEME_STORAGE_KEY = 'harry-dulaney-com-theme-preference';
const LAST_PAGE_KEY = 'harry-dulaney-com-last-page-visited';
const LIGHT_THEME_NAME = 'light';
const DARK_THEME_NAME = 'dark';
const LIGHT_THEME_ICON_ID = '#fs-light-theme-icon-id';
const DARK_THEME_ICON_ID = '#fs-dark-theme-icon-id';
const LIGHT_THEME_ICON_MOBILE_ID = '#mobile-light-theme-icon-id';
const DARK_THEME_ICON_MOBILE_ID = '#mobile-dark-theme-icon-id';
const THEME_SWITCH_CONTAINER_CLASS = 'theme-switch-container';
const THEME_SWITCH_ID_MOBILE = 'mobile-theme-icon';
const THEME_PREFERENCE_ATTRIBUTE = 'data-theme';
const MILLIS_PER_YEAR = 31557600000;
const INTRO_SCROLL_ANIMATION_DELAY = 20 * 1000; // 20 seconds
const INTRO_PAGE_FLAG = 'intro';
const PROJECTS_PAGE_FLAG = 'projects';
const ABOUT_PAGE_FLAG = 'about';
const CONTACT_PAGE_FLAG = 'contact';
const DOWNLOADS_PAGE_FLAG = 'downloads';

const NAV_MENU_INTRO_ID = 'nav-menu-intro';
const NAV_MENU_ABOUT_ID = 'nav-menu-about';
const NAV_MENU_CONTACT_ID = 'nav-menu-contact';
const NAV_MENU_PROJECTS_ID = 'nav-menu-projects';
const NAV_MENU_DOWNLOADS_ID = 'nav-menu-downloads';

const NAV_MOBILE_INTRO_ID = 'mobile-menu-intro';
const NAV_MOBILE_PROJECTS_ID = 'mobile-menu-projects';
const NAV_MOBILE_ABOUT_ID = 'mobile-menu-about';
const NAV_MOBILE_DOWNLOADS_ID = 'mobile-menu-downloads';
const NAV_MOBILE_CONTACT_ID = 'mobile-menu-contact';


var open = false;
var isBlog = false;
var isMobile = window.matchMedia("(max-width: 846px)");
var introArrowTimer = null;
var introAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true });
var introBackgroundEffect = null;
var currentTheme = DARK_THEME_NAME;
var currentPage = INTRO_PAGE_FLAG;
var lastPage = INTRO_PAGE_FLAG;

/**
 * Main method, on document ready
 */
$(document).ready(function () {
    initializePage();

    $(window).on('resize', onWindowResize);

    var initialScrollPos = window.scrollY;

    $(window).on('scroll', function () {
        // Hide scroll arrow on scroll

        if (open) {
            retractMobileMenu();
            $('#mobile-nav-icon').removeClass('open');
        }

        if (isMobile.matches) { // Mobile scroll behavior
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
        if (isMobile.matches) {
            $('#mobile-nav-icon').toggleClass('open');
            if (!open) {
                expandMobileMenu();
            } else if (open) {
                retractMobileMenu();
                $('#mobile-nav-icon').removeClass('open');

            }
        }

    });

    $('.main-container').on('click', function () {

        //Mobile body click behavior
        if (isMobile.matches) {
            if (open) {
                retractMobileMenu();
                $('#mobile-nav-icon').removeClass('open');

            }
        }

    });

    $('#mobile-menu-intro,#mobile-menu-projects,#mobile-menu-about,#mobile-menu-contact, #mobile-menu-downloads').on('click', function () {
        if (open) {
            retractMobileMenu();
            $('#mobile-nav-icon').removeClass('open');

        }
    });


});


function onWindowResize() {
    if (currentTheme === LIGHT_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        if (currentPage === INTRO_PAGE_FLAG) {
            introBackgroundEffect.resize();
        }
    } else if (currentTheme === DARK_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        if (currentPage === INTRO_PAGE_FLAG) {
            introBackgroundEffect.resize();
        }
    }

};

function initializePage() {
    currentPage = getLastPageVisited();
    const parentContainer = document.querySelector("#parent-container");
    let template = document.getElementById("intro-page");
    let node = template.content.firstElementChild.cloneNode(true);
    parentContainer.appendChild(node);

    switch (currentPage) {
        case INTRO_PAGE_FLAG:
            handleNavElement(INTRO_PAGE_FLAG);
            break;
        case PROJECTS_PAGE_FLAG:
            handleNavElement(PROJECTS_PAGE_FLAG);
            node.remove();
            template = document.getElementById("projects-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            break;
        case ABOUT_PAGE_FLAG:
            handleNavElement(ABOUT_PAGE_FLAG);
            node.remove();
            template = document.getElementById("about-me-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);

            break;
        case CONTACT_PAGE_FLAG:
            handleNavElement(CONTACT_PAGE_FLAG);
            node.remove();
            template = document.getElementById("contact-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            break;
        case DOWNLOADS_PAGE_FLAG:
            handleNavElement(DOWNLOADS_PAGE_FLAG);
            node.remove();
            template = document.getElementById("downloads-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            break;

    }

    handleTheme(currentPage);

}

function resetNavLinks() {
    let navElementIds = [NAV_MENU_INTRO_ID, NAV_MENU_PROJECTS_ID, NAV_MENU_ABOUT_ID, NAV_MENU_CONTACT_ID, NAV_MENU_DOWNLOADS_ID];
    if (isMobile.matches) {
        navElementIds = [NAV_MOBILE_INTRO_ID, NAV_MOBILE_PROJECTS_ID, NAV_MOBILE_ABOUT_ID, NAV_MOBILE_CONTACT_ID, NAV_MOBILE_DOWNLOADS_ID];
    }

    for (let i = 0; i < navElementIds.length; i++) {
        let navElement = document.getElementById(navElementIds[i]);
        navElement.dataset.active = false;
    }

}

function handleNavElement(pageFlag) {
    resetNavLinks();
    switch (pageFlag) {
        case INTRO_PAGE_FLAG:
            let introElementId = null;
            if (isMobile.matches) {
                introElementId = NAV_MOBILE_INTRO_ID;
            } else {
                introElementId = NAV_MENU_INTRO_ID;
            }
            document.getElementById(introElementId).dataset.active = true;
            break;

        case PROJECTS_PAGE_FLAG:
            let projectsElementId = null;
            if (isMobile.matches) {
                projectsElementId = NAV_MOBILE_PROJECTS_ID;
            } else {
                projectsElementId = NAV_MENU_PROJECTS_ID;
            }
            document.getElementById(projectsElementId).dataset.active = true;
            break;

        case ABOUT_PAGE_FLAG:
            let aboutElementId = null;
            if (isMobile.matches) {
                aboutElementId = NAV_MOBILE_ABOUT_ID;
            } else {
                aboutElementId = NAV_MENU_ABOUT_ID;

            }
            document.getElementById(aboutElementId).dataset.active = true;
            break;

        case CONTACT_PAGE_FLAG:
            let contactElementId = null;
            if (isMobile.matches) {
                contactElementId = NAV_MOBILE_CONTACT_ID;
            } else {
                contactElementId = NAV_MENU_CONTACT_ID;

            }
            document.getElementById(contactElementId).dataset.active = true;
            break;

        case DOWNLOADS_PAGE_FLAG:
            let downloadsElementId = null;
            if (isMobile.matches) {
                downloadsElementId = NAV_MOBILE_DOWNLOADS_ID;
            } else {
                downloadsElementId = NAV_MENU_DOWNLOADS_ID;

            }
            document.getElementById(downloadsElementId).dataset.active = true;
            break;
    }

}

function intro() {
    if (handleCurrentPage(currentPage, INTRO_PAGE_FLAG, document)) {
        handleNavElement(INTRO_PAGE_FLAG);
        const parentContainer = document.querySelector("#parent-container");
        const template = document.querySelector("#intro-page");
        const node = template.content.firstElementChild.cloneNode(true);
        parentContainer.appendChild(node);
        currentPage = INTRO_PAGE_FLAG;
        setLastPageVisited(currentPage);
        handleTheme(currentPage);
    }

}


function projects() {
    if (handleCurrentPage(currentPage, PROJECTS_PAGE_FLAG, document)) {
        handleNavElement(PROJECTS_PAGE_FLAG);
        const parentContainer = document.querySelector("#parent-container");
        const template = document.querySelector("#projects-page");
        const renderProjects = template.content.firstElementChild.cloneNode(true);
        parentContainer.appendChild(renderProjects);
        currentPage = PROJECTS_PAGE_FLAG;
        setLastPageVisited(currentPage);
        // Fetch and initialize Git status' on projects
        getAllRepoStats(document);
        handleTheme(currentPage);
    }

}

function downloads() {
    if (handleCurrentPage(currentPage, DOWNLOADS_PAGE_FLAG, document)) {
        handleNavElement(DOWNLOADS_PAGE_FLAG);
        const parentContainer = document.querySelector("#parent-container");
        const template = document.getElementById("downloads-page");
        const node = template.content.firstElementChild.cloneNode(true);
        parentContainer.appendChild(node);
        currentPage = DOWNLOADS_PAGE_FLAG;
        setLastPageVisited(currentPage);
        handleTheme(currentPage);
    }
}

function contact() {
    if (handleCurrentPage(currentPage, CONTACT_PAGE_FLAG, document)) {
        handleNavElement(CONTACT_PAGE_FLAG);
        const parentContainer = document.querySelector("#parent-container");
        const template = document.querySelector("#contact-page");
        const node = template.content.firstElementChild.cloneNode(true);
        parentContainer.appendChild(node);
        currentPage = CONTACT_PAGE_FLAG;
        setLastPageVisited(currentPage);
        initContactForm();
        handleTheme(currentPage);
    }
}


function about() {
    if (handleCurrentPage(currentPage, ABOUT_PAGE_FLAG, document)) {
        handleNavElement(ABOUT_PAGE_FLAG);
        const parentContainer = document.querySelector("#parent-container");
        const template = document.querySelector("#about-me-page");
        const node = template.content.firstElementChild.cloneNode(true);
        parentContainer.appendChild(node);
        /* Calculate + render years of experience */
        const fullTimeStartDate = new Date(2019, 4, 1);
        const javaStartDate = new Date(2017, 1, 1);
        const springStartDate = new Date(2017, 4, 1);
        const javaScriptStartDate = new Date(2014, 4, 1);
        const angularStartDate = new Date(2019, 1, 1);
        const azureCloudStartDate = new Date(2020, 9, 1);
        const kubernetesStartDate = new Date(2021, 4, 1);
        const microServicesStartDate = new Date(2020, 9, 1);
        const webDevelopmentStartDate = new Date(2014, 1, 1);
        const restApiStartDate = new Date(2017, 6, 1);

        renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
            azureCloudStartDate, kubernetesStartDate, microServicesStartDate, restApiStartDate, webDevelopmentStartDate);
        currentPage = ABOUT_PAGE_FLAG;
        setLastPageVisited(currentPage);
        handleTheme(currentPage);
    }
}


function handleCurrentPage(currentPage, nextPage, document) {
    if (nextPage === currentPage) { return false; }
    switch (currentPage) {
        case INTRO_PAGE_FLAG:
            const introPage = document.querySelector(".intro--wrapper");
            introPage.remove();
            break;
        case PROJECTS_PAGE_FLAG:
            const projectsPage = document.querySelector(".projects--wrapper");
            projectsPage.remove();
            break;
        case ABOUT_PAGE_FLAG:
            const aboutPage = document.querySelector(".about--wrapper");
            aboutPage.remove();
            break;
        case CONTACT_PAGE_FLAG:
            const contactPage = document.querySelector(".contact--wrapper");
            contactPage.remove();
            break;
        case DOWNLOADS_PAGE_FLAG:
            const downloadsPage = document.querySelector(".download--wrapper");
            downloadsPage.remove();
            break;
        default:
            console.error("Attempted to navigate to an unknown page: " + currentPage);
            break;
    }

    return true;
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
/* ---------------  Contact Form Handlering--------------- */
/**
 * Enable the Contact Form Submit Button
 * @param {*} token 
 */
function enableSubmitButton(token) {
    $('#submit-button-contact-form').prop('disabled', false);
}

/**
 * Disable the Contact Form Submit Button
 */
function disableSubmitButton() {
    $('#submit-button-contact-form').prop('disabled', true);
}

function initContactForm() {
    var form = document.getElementById('contact-form');
    form.addEventListener("submit", submitContactForm);
}

async function submitContactForm(event) {
    event.preventDefault();
    var form = document.getElementById('contact-form');
    var successStatus = document.getElementById("contact-form-status-alert");
    var errorStatus = document.getElementById("contact-form-status-alert-error");

    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success
            gsap.to(successStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
            form.reset();
        } else {
            // Error
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    gsap.to(errorStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
                    console.log('Unknown error occurred on contact form...');
                    form.reset();
                } else {
                    gsap.to(errorStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
                    console.log('Unknown error occurred on contact form...');
                    form.reset();
                }
            })
        }
    }).catch(error => {
        gsap.to(errorStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
        form.reset();
    });
}

function closeContactFormStatusAlert() {
    let successStatus = document.getElementById("contact-form-status-alert");
    let errorStatus = document.getElementById("contact-form-status-alert-error");
    gsap.to(successStatus, { opacity: '0', ease: "easeOut", duration: 0.2 })
    gsap.to(errorStatus, { opacity: '0', ease: "easeOut", duration: 0.2 })
}



function showBlogArrow(element) {
    gsap.to('#blog--link-arrow', { display: 'inherit', duration: 0.2 })
    gsap.to('#blog--link-arrow', { opacity: 1, duration: 0.5 });
}

function hideBlogArrow(element) {
    gsap.to('#blog--link-arrow', { opacity: 0, duration: 0.5 });
    gsap.to('#blog--link-arrow', { display: 'none', duration: 0.2 })
}


/**
 * Initialize the UI theme from user prefereneces
 */
function handleTheme(page) {
    currentTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (currentTheme === null) {
        // localStorage.themeName is null, set to Dark as default
        currentTheme = DARK_THEME_NAME;
        storeTheme(currentTheme);
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        setDarkTheme(page);

    } else if (currentTheme === LIGHT_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        setLightTheme(page);

    } else if (currentTheme === DARK_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        setDarkTheme(page);
    }

}


function getLastPageVisited() {
    const page = localStorage.getItem(LAST_PAGE_KEY);

    if (page !== null) {
        return page;
    }

    return INTRO_PAGE_FLAG;
}


function setLastPageVisited(page) {
    localStorage.setItem(LAST_PAGE_KEY, page);
}

function initCloudsLightMode() {
    if (introBackgroundEffect) {
        introBackgroundEffect.destroy();
    }

    introBackgroundEffect = VANTA.CLOUDS({
        el: ".intro--wrapper",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: "rgba(217, 231, 250)"
    });

}

function initCloudsDarkMode() {
    if (introBackgroundEffect) {
        introBackgroundEffect.destroy();
    }

    introBackgroundEffect = VANTA.RINGS({
        el: ".intro--wrapper",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: 0x0e0e0e
    });


}


/** 
 * Toggle between light and dark themes 
 */
function toggleTheme() {
    if (localStorage.getItem(THEME_STORAGE_KEY) === LIGHT_THEME_NAME) {
        storeTheme(DARK_THEME_NAME);
        currentTheme = DARK_THEME_NAME;
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        setDarkTheme(currentPage);
    } else {
        storeTheme(LIGHT_THEME_NAME);
        currentTheme = LIGHT_THEME_NAME;
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        setLightTheme(currentPage);
    }
}

/** 
 * Save user preference for theme
 */
function storeTheme(themeName) {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

function setLightTheme(page) {
    switch (page) {
        case INTRO_PAGE_FLAG:
            initCloudsLightMode();
            break;
        case ABOUT_PAGE_FLAG:
            $('.about-me-bg-overlay').css('background', 'url("./assets/img/graphics/undraw_moonlight_-5-ksn-light.svg") no-repeat center');
            $('.about-me-bg-overlay').css('position', 'relative');
            $('.about-me-bg-overlay').css('display', 'block');
            $('.about-me-bg-overlay').css('background-size', 'contain');
            $('.about-me-bg-overlay').css('z-index', '0');
            break;
        case PROJECTS_PAGE_FLAG:
            var gitStatusTextStyle = document.querySelectorAll('.git-stats-label-text');
            gitStatusTextStyle.forEach(element => {
                element.classList.remove('text-white');
            });

            var statsDateTime = document.querySelectorAll('.git-stats-datetime')
            statsDateTime.forEach(element => {
                element.classList.remove('text-white');
            });
            break;
        case CONTACT_PAGE_FLAG:
            break;
        case DOWNLOADS_PAGE_FLAG:
            break;

    }

}

function setDarkTheme(page) {
    switch (page) {
        case INTRO_PAGE_FLAG:
            initCloudsDarkMode();
            break;
        case ABOUT_PAGE_FLAG:
            $('.about-me-bg-overlay ').css('background', 'url("./assets/img/graphics/undraw_moonlight_-5-ksn.svg") no-repeat center');
            $('.about-me-bg-overlay ').css('position', 'relative');
            $('.about-me-bg-overlay ').css('display', 'block');
            $('.about-me-bg-overlay ').css('background-size', 'contain');
            $('.about-me-bg-overlay ').css('z-index', '0');
            break;
        case PROJECTS_PAGE_FLAG:
            var gitStatusTextStyle = document.querySelectorAll('.git-stats-label-text')
            gitStatusTextStyle.forEach(element => {
                element.classList.add('text-white');
            });

            var statsDateTime = document.querySelectorAll('.git-stats-datetime')
            statsDateTime.forEach(element => {
                element.classList.add('text-white');
            });
            break;
        case CONTACT_PAGE_FLAG:
            break;
        case DOWNLOADS_PAGE_FLAG:
            break;

    }

}
