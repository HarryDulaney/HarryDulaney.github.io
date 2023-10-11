'use strict';

/**
 * app.js is main javascript driver for harrydulaney.com
 * @author Harry Dulaney
 * @since  1.4.6
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
var isLoading = false;
var isMobile = window.matchMedia("(max-width: 846px)");
var introArrowTimer = null;
var introAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true });
var introBackgroundEffect = null;
var currentTheme = DARK_THEME_NAME;
var currentPage = 'intro';
var lastPage = 'intro';
var initialized = false;

const routes = {};
const templates = {};

function template(name, templateFunction) {
    return templates[name] = templateFunction;
};

function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
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


/**
 * Intro page route handler
 */
function intro() {
    if (!initialized) {
        initialized = true;
    } else {
        animateTransition(document);
    }
    resetActiveNavItems();
    let introElementId = null;
    if (isMobile.matches) {
        introElementId = NAV_MOBILE_INTRO_ID;
    } else {
        introElementId = NAV_MENU_INTRO_ID;
    }
    document.getElementById(introElementId).dataset.active = true;
    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector('#intro-page');
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    currentPage = 'intro';
    handleTheme(currentPage);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");

}


function blog() {
    resetActiveNavItems();
    let blogIdElement = null;
    if (isMobile.matches) {
        blogIdElement = NAV_MOBILE_BLOG_ID;
    } else {
        blogIdElement = NAV_MENU_BLOG_ID;
    }
    document.getElementById(blogIdElement).dataset.active = true;

}


function projects() {
    if (!initialized) {
        initialized = true;
    } else {
        animateTransition(document);
    }
    resetActiveNavItems();
    let projectsElementId = null;
    if (isMobile.matches) {
        projectsElementId = NAV_MOBILE_PROJECTS_ID;
    } else {
        projectsElementId = NAV_MENU_PROJECTS_ID;
    }
    document.getElementById(projectsElementId).dataset.active = true;

    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector('#projects-page');
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    currentPage = 'projects';
    // Fetch and initialize Git status' on projects
    getAllRepoStats(document);
    handleTheme(currentPage);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");

}

function downloads() {
    if (!initialized) {
        initialized = true;
    } else {
        animateTransition(document);
    }
    resetActiveNavItems();
    let downloadsElementId = null;
    if (isMobile.matches) {
        downloadsElementId = NAV_MOBILE_DOWNLOADS_ID;
    } else {
        downloadsElementId = NAV_MENU_DOWNLOADS_ID;

    }
    document.getElementById(downloadsElementId).dataset.active = true;

    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector("#downloads-page");
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
    currentPage = 'downloads';
    handleTheme(currentPage);
}

function contact() {
    if (!initialized) {
        initialized = true;
    } else {
        animateTransition(document);
    }
    resetActiveNavItems();
    let contactElementId = null;
    if (isMobile.matches) {
        contactElementId = NAV_MOBILE_CONTACT_ID;
    } else {
        contactElementId = NAV_MENU_CONTACT_ID;

    }
    document.getElementById(contactElementId).dataset.active = true;

    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector("#contact-page");
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
    currentPage = 'contact';
    initContactForm(document, 'contact-form');
    handleTheme(currentPage);

}

function about() {
    if (!initialized) {
        initialized = true;
    } else {
        animateTransition(document);
    }
    resetActiveNavItems();
    let aboutElementId = null;
    if (isMobile.matches) {
        aboutElementId = NAV_MOBILE_ABOUT_ID;
    } else {
        aboutElementId = NAV_MENU_ABOUT_ID;
    }

    document.getElementById(aboutElementId).dataset.active = true;
    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector("#about-me-page");
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
    /* Calculate + render years of experience */
    renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
        azureCloudStartDate, kubernetesStartDate, microServicesStartDate, restApiStartDate, webDevelopmentStartDate);
    currentPage = 'about';
    handleTheme(currentPage);
}


template('intro', function () {
    intro();
});

template('about', function () {
    about();
});

template('projects', function () {
    projects();
});

template('contact', function () {
    contact();
});

template('downloads', function () {
    downloads();
});


route('/', 'intro');
route('/about', 'about');
route('/projects', 'projects');
route('/contact', 'contact');
route('/downloads', 'downloads');
route('/blog', 'blog');




$(window).on('resize', onWindowResize);
$(window).on('hashchange', router);
$(window).on('load', router);


/**
 * Main method, on document ready
 */
$(window).ready(function () {
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
});


function onWindowResize() {
    if (currentTheme === LIGHT_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        if (currentPage === 'intro') {
            introBackgroundEffect.resize();
        }
    } else if (currentTheme === DARK_THEME_NAME) {
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        if (currentPage === 'intro') {
            introBackgroundEffect.resize();
        }
    }
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
    switch (currentPage) {
        case 'intro':
            const introPage = document.querySelector('.intro--wrapper');
            let tl = new TimelineMax({
                onComplete: function () {
                    introBackgroundEffect.destroy(); // Cleanup intro page background effect
                    introPage.remove();
                },
            });
            tl.to(introPage, { duration: 0.1, x: '-100%' });
            break;
        case 'projects':
            const projectsPage = document.querySelector('.projects--wrapper');
            let t2 = new TimelineMax({
                onComplete: function () {
                    projectsPage.remove();
                },
            });
            t2.to(projectsPage, { duration: 0.1, x: '-100%' });
            break;
        case 'about':
            const aboutPage = document.querySelector('.about--wrapper');
            let tl3 = new TimelineMax({
                onComplete: function () {
                    aboutPage.remove();
                },
            });
            tl3.to(aboutPage, { duration: 0.1, x: '-100%' });
            break;
        case 'contact':
            const contactPage = document.querySelector('.contact--wrapper');
            let tl4 = new TimelineMax({
                onComplete: function () {
                    contactPage.remove();
                },
            });
            tl4.to(contactPage, { duration: 0.1, x: '-100%' });
            break;
        case 'downloads':
            const downloadsPage = document.querySelector('.download--wrapper');
            let tl5 = new TimelineMax({
                onComplete: function () {
                    downloadsPage.remove();
                },
            });
            tl5.to(downloadsPage, { duration: 0.1, x: '-100%' });
            break;
        default:
            console.error("Attempted to navigate to an unknown page: " + currentPage);
            break;
    }

    return true;
}

/**
 * Initialize light/dark theme from user prefereneces
 */
function handleTheme(page) {
    currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (currentTheme !== null) {
        currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (currentTheme === LIGHT_THEME_NAME) {
            document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
            setLightTheme(page);

        } else if (currentTheme === DARK_THEME_NAME) {
            document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
            setDarkTheme(page);
        }

    } else {
        currentTheme = LIGHT_THEME_NAME;
        storeTheme(currentTheme);
        document.body.setAttribute(THEME_PREFERENCE_ATTRIBUTE, currentTheme);
        setLightTheme(page);
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