'use strict';

/**
 * app.js is main javascript driver for harrydulaney.com
 * @author Harry Dulaney
 * @since  1.1.1
 */


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

/**
 * Handle rendering page on initial load
 */
function initializePage() {
    const parentContainer = document.querySelector("#parent-container");
    let node = document.querySelector('#loading-page');
    let template = null;

    currentPage = getLastPageVisited();
    switch (currentPage) {
        case INTRO_PAGE_FLAG:
            handleNavElement(INTRO_PAGE_FLAG);
            node.remove();
            template = document.getElementById("intro-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            break;

        case PROJECTS_PAGE_FLAG:
            handleNavElement(PROJECTS_PAGE_FLAG);
            node.remove();
            template = document.getElementById("projects-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            // Fetch and initialize Git status' on projects
            getAllRepoStats(document);
            break;

        case ABOUT_PAGE_FLAG:
            handleNavElement(ABOUT_PAGE_FLAG);
            node.remove();
            template = document.getElementById("about-me-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            /* Calculate + render years of experience */
            renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
                azureCloudStartDate, kubernetesStartDate, microServicesStartDate, restApiStartDate, webDevelopmentStartDate);
            break;

        case CONTACT_PAGE_FLAG:
            handleNavElement(CONTACT_PAGE_FLAG);
            node.remove();
            template = document.getElementById("contact-page");
            node = template.content.firstElementChild.cloneNode(true);
            parentContainer.appendChild(node);
            initContactForm(document, 'contact-form');
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

/* ----------------------------------------------- Page Navigation ---------------------------------------------------- */
function intro() {
    if (handleCurrentPage(currentPage, INTRO_PAGE_FLAG, document)) {
        handleNavElement(INTRO_PAGE_FLAG);
        const parentContainer = document.querySelector("#parent-container");
        const template = document.querySelector("#intro-page");
        const node = template.content.firstElementChild.cloneNode(true);
        parentContainer.appendChild(node);
        currentPage = INTRO_PAGE_FLAG;
        handleTheme(currentPage);
        setLastPageVisited(currentPage);
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
        // Fetch and initialize Git status' on projects
        getAllRepoStats(document);
        handleTheme(currentPage);
        setLastPageVisited(currentPage);
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
        handleTheme(currentPage);
        setLastPageVisited(currentPage);
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
        initContactForm(document, 'contact-form');
        handleTheme(currentPage);
        setLastPageVisited(currentPage);
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
        renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
            azureCloudStartDate, kubernetesStartDate, microServicesStartDate, restApiStartDate, webDevelopmentStartDate);
        currentPage = ABOUT_PAGE_FLAG;
        handleTheme(currentPage);
        setLastPageVisited(currentPage);
    }
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

function handleCurrentPage(currentPage, nextPage, document) {
    if (nextPage === currentPage) { return false; }
    switch (currentPage) {
        case INTRO_PAGE_FLAG:
            const introPage = document.querySelector(".intro--wrapper");
            introBackgroundEffect.destroy(); // Cleanup intro page background effect
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



/**
 * Initialize light/dark theme from user prefereneces
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

function clearIntroAnimation() {
    if (introBackgroundEffect) {
        introBackgroundEffect.destroy();
    } else {
        console.log('introBackgroundEffect is null');
    }

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


function setLightTheme(page) {
    switch (page) {
        case INTRO_PAGE_FLAG:
            initCloudsLightMode();
            break;
        case ABOUT_PAGE_FLAG:
            clearIntroAnimation();
            $('.about-me-bg-overlay').css('background', 'url("./assets/img/graphics/undraw_moonlight_-5-ksn-light.svg") no-repeat center');
            $('.about-me-bg-overlay').css('position', 'relative');
            $('.about-me-bg-overlay').css('display', 'block');
            $('.about-me-bg-overlay').css('background-size', 'contain');
            $('.about-me-bg-overlay').css('z-index', '0');
            break;
        case PROJECTS_PAGE_FLAG:
            clearIntroAnimation();
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
            clearIntroAnimation();
            break;
        case DOWNLOADS_PAGE_FLAG:
            clearIntroAnimation();
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
