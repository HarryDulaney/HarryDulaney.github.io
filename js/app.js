'use strict';

/**
 * app.js is main javascript driver for harrydulaney.com
 * @author Harry Dulaney
 * @version  1.5.1
 */

/*  Global constants */
const THEME_STORAGE_KEY = 'harry-dulaney-com-theme-preference';
const LAST_PAGE_KEY = 'harry-dulaney-com-last-page-visited';
const DIRECT_ROUTE_NAV_KEY = `harry-dulaney-com-direct-route-navigation`;
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

const NAV_MENU_INTRO_ID = 'nav-menu-intro';
const NAV_MENU_ABOUT_ID = 'nav-menu-about';
const NAV_MENU_CONTACT_ID = 'nav-menu-contact';
const NAV_MENU_DOWNLOADS_ID = 'nav-menu-downloads';
const NAV_MENU_BLOG_ID = 'nav-menu-blog';
const NAV_MENU_PROJECTS_ID = 'nav-menu-projects';

const NAV_MOBILE_INTRO_ID = 'mobile-menu-intro';
const NAV_MOBILE_ABOUT_ID = 'mobile-menu-about';
const NAV_MOBILE_DOWNLOADS_ID = 'mobile-menu-downloads';
const NAV_MOBILE_CONTACT_ID = 'mobile-menu-contact';
const NAV_MOBILE_BLOG_ID = 'mobile-menu-blog';
const NAV_MOBILE_PROJECTS_ID = 'mobile-menu-projects';

const BLOG_URL = 'https://blog.harrydulaney.com';

/* About Me - timeline dates */
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

/* Global Variables */
var open = false;
var isBlog = false;
var isLoading = true;
var isMobile = window.matchMedia("(max-width: 846px)");
var introArrowTimer = null;
var introAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true });
var introBackgroundEffect = null;
var CURRENT_THEME = DARK_THEME_NAME;
var CURRENT_PAGE_NAME = 'intro';
var lastPage = 'intro';
var INITIALIZED = false;

var APP_CONTAINER = null;
var FOOTER_CONTAINER = null;
var NAV_BAR_CONTAINER = null;
var LOADER_CONTAINER = null;

var INTRO_NAV_ELEMENT_ID = null;
var ABOUT_NAV_ELEMENT_ID = null;
var CONTACT_NAV_ELEMENT_ID = null;
var PROJECTS_NAV_ELEMENT_ID = null;
var DOWNLOADS_NAV_ELEMENT_ID = null;
var BLOG_NAV_ELEMENT_ID = null;

const routes = {};
const templates = {};

function addTemplate(name, templateFunction, idSelector) {
    return templates[name] = { 'fn': templateFunction, 'id': idSelector, 'element': null };
};

function initializePageElements() {
    for (let name in templates) {
        const htmlTemplate = document.querySelector(templates[name]['id']);
        templates[name]['element'] = htmlTemplate.content.firstElementChild.cloneNode(true);
    }
}

function addRoute(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    } else if (typeof template === 'string') {
        return routes[path] = templates[template]['fn'];
    } else {
        return;
    };
};

function resolveRoute(routeName) {
    try {
        return routes[routeName];
    } catch (e) {
        throw new Error(`Route ${routeName} not found`);
    };
};

function router(event) {
    const url = window.location.hash.slice(1) || "/";
    const route = resolveRoute(url);
    route();
};

function navigate(navigateFn) {
    if (INITIALIZED) {
        animateTransition(document);
        navigateFn();
    } else {
        navigateFn();
        hideLoader(200);
        INITIALIZED = true;
    }
}

/**
 * Intro page route handler
 */
function navigateToHome() {
    resetActiveNavItems();
    document.getElementById(INTRO_NAV_ELEMENT_ID).dataset.active = true;
    let introElement = templates['intro']['element'];
    introElement.classList.add('page-slide-in-start');
    APP_CONTAINER.appendChild(introElement);
    CURRENT_PAGE_NAME = 'intro';
    handleTheme(CURRENT_PAGE_NAME);
    gsap.to(introElement, { duration: 0.1, x: 0 }, "<");

}

function blog() {
    resetActiveNavItems();
    document.getElementById(BLOG_NAV_ELEMENT_ID).dataset.active = true;

}

function navigateToProjects() {
    resetActiveNavItems();
    document.getElementById(PROJECTS_NAV_ELEMENT_ID).dataset.active = true;
    const projectsElement = templates['projects']['element'];
    projectsElement.classList.add('page-slide-in-start');
    APP_CONTAINER.appendChild(projectsElement);
    CURRENT_PAGE_NAME = 'projects';
    // Fetch and initialize Git status' on projects
    getAllRepoStats(document);
    handleTheme(CURRENT_PAGE_NAME);
    gsap.to(projectsElement, { duration: 0.1, x: 0 }, "<");

}

function navigateToDownloads() {
    resetActiveNavItems();
    document.getElementById(DOWNLOADS_NAV_ELEMENT_ID).dataset.active = true;
    const downloadsElement = templates['downloads']['element'];
    downloadsElement.classList.add('page-slide-in-start');
    APP_CONTAINER.appendChild(downloadsElement);
    gsap.to(downloadsElement, { duration: 0.1, x: 0 }, "<");
    CURRENT_PAGE_NAME = 'downloads';
    handleTheme(CURRENT_PAGE_NAME);
}

function navigateToContact() {
    resetActiveNavItems();
    document.getElementById(CONTACT_NAV_ELEMENT_ID).dataset.active = true;
    const contactElement = templates['contact']['element'];
    contactElement.classList.add('page-slide-in-start');
    APP_CONTAINER.appendChild(contactElement);
    gsap.to(contactElement, { duration: 0.1, x: 0 }, "<");
    CURRENT_PAGE_NAME = 'contact';
    initContactForm(document, 'contact-form');
    handleTheme(CURRENT_PAGE_NAME);

}

function navigateToAbout() {
    resetActiveNavItems();
    document.getElementById(ABOUT_NAV_ELEMENT_ID).dataset.active = true;
    const aboutElement = templates['about']['element'];
    aboutElement.classList.add('page-slide-in-start');
    APP_CONTAINER.appendChild(aboutElement);
    gsap.to(aboutElement, { duration: 0.1, x: 0 }, "<");
    /* Calculate + render years of experience */
    renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
        azureCloudStartDate, kubernetesStartDate, microServicesStartDate, restApiStartDate, webDevelopmentStartDate);
    CURRENT_PAGE_NAME = 'about';
    handleTheme(CURRENT_PAGE_NAME);
}

function toggleLoader() {
    if (isLoading) {
        hideLoader();
    } else {
        showLoader();
    }
}

function showLoader() {
    FOOTER_CONTAINER.classList.add('hide-footer');
    NAV_BAR_CONTAINER.classList.add('hide-navbar');
    FOOTER_CONTAINER.classList.remove('show-footer');
    NAV_BAR_CONTAINER.classList.remove('show-navbar');
    LOADER_CONTAINER.classList.add('show-loading');
    LOADER_CONTAINER.classList.remove('hide-loading');
    isLoading = true;
}

function hideLoader(delay) {
    setTimeout(function () {
        LOADER_CONTAINER.classList.remove('show-loading');
        LOADER_CONTAINER.classList.add('hide-loading');
        FOOTER_CONTAINER.classList.remove('hide-footer');
        NAV_BAR_CONTAINER.classList.remove('hide-navbar');
        FOOTER_CONTAINER.classList.add('show-footer');
        NAV_BAR_CONTAINER.classList.add('show-navbar');
        isLoading = false;
    }, delay || 0);
}

addTemplate('intro', function () {
    navigate(navigateToHome);
}, '#intro-page-template');

addTemplate('about', function () {
    navigate(navigateToAbout);
}, '#about-page-template');

addTemplate('projects', function () {
    navigate(navigateToProjects);
}, '#projects-page-template');

addTemplate('contact', function () {
    navigate(navigateToContact);
}, '#contact-page-template');

addTemplate('downloads', function () {
    navigate(navigateToDownloads);
}, '#downloads-page-template');

addRoute('/', 'intro');
addRoute('/about', 'about');
addRoute('/projects', 'projects');
addRoute('/contact', 'contact');
addRoute('/downloads', 'downloads');

$(window).on('hashchange', router);
$(window).on('load', router);

/**
 * Main method, on document ready
 */
$(window).ready(function () {
    APP_CONTAINER = document.querySelector("#app-container");
    initializePageElements();
    FOOTER_CONTAINER = document.querySelector('#footer-container');
    NAV_BAR_CONTAINER = document.querySelector('#nav-container');
    LOADER_CONTAINER = document.querySelector('#loader-container');
    showLoader();
    setNavMenuElementIds();
    initializeTheme();
    var initialScrollPos = window.scrollY;
    var blogArrowTimeline;

    $('#nav-menu-blog').bind('mouseenter', function (e) {
        blogArrowTimeline = showArrow(this);
    });

    $('#nav-menu-blog').bind('mouseleave', function (e) {
        hideArrow(blogArrowTimeline);
    });

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

    $(window).on('resize', onWindowResize);

});

function setNavMenuElementIds() {
    if (isMobile.matches) {
        INTRO_NAV_ELEMENT_ID = NAV_MOBILE_INTRO_ID;
        ABOUT_NAV_ELEMENT_ID = NAV_MOBILE_ABOUT_ID;
        CONTACT_NAV_ELEMENT_ID = NAV_MOBILE_CONTACT_ID;
        PROJECTS_NAV_ELEMENT_ID = NAV_MOBILE_PROJECTS_ID;
        DOWNLOADS_NAV_ELEMENT_ID = NAV_MOBILE_DOWNLOADS_ID;
        BLOG_NAV_ELEMENT_ID = NAV_MOBILE_BLOG_ID;

    } else {
        INTRO_NAV_ELEMENT_ID = NAV_MENU_INTRO_ID;
        ABOUT_NAV_ELEMENT_ID = NAV_MENU_ABOUT_ID;
        CONTACT_NAV_ELEMENT_ID = NAV_MENU_CONTACT_ID;
        PROJECTS_NAV_ELEMENT_ID = NAV_MENU_PROJECTS_ID;
        DOWNLOADS_NAV_ELEMENT_ID = NAV_MENU_DOWNLOADS_ID;
        BLOG_NAV_ELEMENT_ID = NAV_MENU_BLOG_ID;
    }
}

function onWindowResize() {
    if (CURRENT_THEME === LIGHT_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
        if (CURRENT_PAGE_NAME === 'intro') {
            introBackgroundEffect.resize();
        }
    } else if (CURRENT_THEME === DARK_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
        if (CURRENT_PAGE_NAME === 'intro') {
            introBackgroundEffect.resize();
        }
    }

    setNavMenuElementIds();
};

function resetActiveNavItems() {
    let navElementIds = [NAV_MENU_INTRO_ID, NAV_MENU_PROJECTS_ID, NAV_MENU_ABOUT_ID, NAV_MENU_CONTACT_ID, NAV_MENU_DOWNLOADS_ID];
    if (isMobile.matches) {
        navElementIds = [NAV_MOBILE_INTRO_ID, NAV_MOBILE_PROJECTS_ID, NAV_MOBILE_ABOUT_ID, NAV_MOBILE_CONTACT_ID, NAV_MOBILE_DOWNLOADS_ID];
    }

    for (let i = 0; i < navElementIds.length; i++) {
        let navElement = document.getElementById(navElementIds[i]);
        navElement.dataset.active = false;
    }

}

function animateTransition(document) {
    switch (CURRENT_PAGE_NAME) {
        case 'intro':
            const introPage = templates['intro']['element'];
            let tl = new TimelineMax({
                onComplete: function () {
                    introBackgroundEffect.destroy(); // Cleanup intro page background effect
                    introPage.remove();
                },
            });
            tl.to(introPage, { duration: 0.1, x: '-100%' });
            break;
        case 'projects':
            const projectsPage = templates['projects']['element'];
            let t2 = new TimelineMax({
                onComplete: function () {
                    projectsPage.remove();
                },
            });
            t2.to(projectsPage, { duration: 0.1, x: '-100%' });
            break;
        case 'about':
            const aboutPage = templates['about']['element'];
            let tl3 = new TimelineMax({
                onComplete: function () {
                    aboutPage.remove();
                },
            });
            tl3.to(aboutPage, { duration: 0.1, x: '-100%' });
            break;
        case 'contact':
            const contactPage = templates['contact']['element'];
            let tl4 = new TimelineMax({
                onComplete: function () {
                    contactPage.remove();
                },
            });
            tl4.to(contactPage, { duration: 0.1, x: '-100%' });
            break;
        case 'downloads':
            const downloadsPage = templates['downloads']['element'];
            let tl5 = new TimelineMax({
                onComplete: function () {
                    downloadsPage.remove();
                },
            });
            tl5.to(downloadsPage, { duration: 0.1, x: '-100%' });
            break;
        default:
            console.error("Attempted to navigate to an unknown page: " + CURRENT_PAGE_NAME);
            break;
    }

    return true;
}

function initializeTheme() {
    if (localStorage.getItem(THEME_STORAGE_KEY) !== null) {
        CURRENT_THEME = localStorage.getItem(THEME_STORAGE_KEY);
        if (CURRENT_THEME === LIGHT_THEME_NAME) {
            document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
        } else if (CURRENT_THEME === DARK_THEME_NAME) {
            document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
        }
    } else {
        CURRENT_THEME = LIGHT_THEME_NAME;
        storeTheme(CURRENT_THEME);
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
    }
}

/**
 * Initialize page-specific light/dark theming 
 */
function handleTheme(page) {
    if (!CURRENT_THEME || CURRENT_THEME === null || CURRENT_THEME === LIGHT_THEME_NAME) {
        setLightTheme(page);
    } else {
        setDarkTheme(page);
    }
}

function initLightModeIntro() {
    if (introBackgroundEffect) {
        introBackgroundEffect.destroy();
    }

    introBackgroundEffect =
        VANTA.BIRDS({
            el: ".intro--wrapper",
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            colorMode: "lerp",
            birdSize: 0.80,
            wingSpan: 29.00,
            separation: 60.00,
            alignment: 53.00,
            cohesion: 56.00,
            backgroundColor: "rgba(217, 231, 250)",
            backgroundAlpha: 0.00
        });

}

function initDarkModeIntro() {
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
        backgroundColor: 0x0e0e0e,
    });
}

function clearIntroAnimation() {
    if (introBackgroundEffect) {
        introBackgroundEffect.destroy();
    }
}

/** 
 * Toggle between light and dark themes 
 */
function toggleTheme() {
    if (localStorage.getItem(THEME_STORAGE_KEY) === LIGHT_THEME_NAME) {
        storeTheme(DARK_THEME_NAME);
        CURRENT_THEME = DARK_THEME_NAME;
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
        setDarkTheme(CURRENT_PAGE_NAME);
    } else {
        storeTheme(LIGHT_THEME_NAME);
        CURRENT_THEME = LIGHT_THEME_NAME;
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, CURRENT_THEME);
        setLightTheme(CURRENT_PAGE_NAME);
    }
}

function setLightTheme(page) {
    switch (page) {
        case 'intro':
            initLightModeIntro();
            break;
        case 'about':
            clearIntroAnimation();
            $('.about-me-bg-overlay').css('background', 'url("./assets/img/graphics/undraw_moonlight_-5-ksn-light.svg") no-repeat center');
            $('.about-me-bg-overlay').css('position', 'relative');
            $('.about-me-bg-overlay').css('display', 'block');
            $('.about-me-bg-overlay').css('background-size', 'contain');
            $('.about-me-bg-overlay').css('z-index', '0');
            break;
        case 'projects':
            clearIntroAnimation();
            break;
        case 'contact':
            clearIntroAnimation();
            break;
        case 'downloads':
            clearIntroAnimation();
            break;

    }
}

function setDarkTheme(page) {
    switch (page) {
        case 'intro':
            initDarkModeIntro();
            break;
        case 'about':
            clearIntroAnimation();
            $('.about-me-bg-overlay ').css('background', 'url("./assets/img/graphics/undraw_moonlight_-5-ksn.svg") no-repeat center');
            $('.about-me-bg-overlay ').css('position', 'relative');
            $('.about-me-bg-overlay ').css('display', 'block');
            $('.about-me-bg-overlay ').css('background-size', 'contain');
            $('.about-me-bg-overlay ').css('z-index', '0');
            break;
        case 'projects':
            clearIntroAnimation();
            break;
        case 'contact':
            clearIntroAnimation();
            break;
        case 'downloads':
            clearIntroAnimation();
            break;
    }
}

function showArrow(element) {
    const rect = element.getBoundingClientRect();
    const targetEl = element.querySelector('#blog--link-arrow');
    var tl = gsap.timeline({ duration: 0.5 });
    tl.to(targetEl, { duration: 0.1, opacity: 1 });
    tl.to(targetEl, { left: rect.right, top: rect.top, duration: 0.2 }, '>');
    tl.to(targetEl, { rotation: '+=300', duration: 0.1 }, '+=0.3');
    tl.duration(0.3);
    return tl;
}

function hideArrow(timeline) {
    timeline.reverse();
}