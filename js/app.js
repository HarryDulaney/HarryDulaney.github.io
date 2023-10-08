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
var isLoading = true;
var isMobile = window.matchMedia("(max-width: 846px)");
var introArrowTimer = null;
var introAnimationTimeline = gsap.timeline({ repeat: -1, yoyo: true });
var introBackgroundEffect = null;
var currentTheme = DARK_THEME_NAME;
var currentPage = 'intro';
var lastPage = 'intro';
const introRoute = { name: 'intro', id: 'intro-page', template: '#intro-page', wrapper: '.intro--wrapper' };
const projectsRoute = { name: 'projects', id: 'projects-page', template: '#projects-page', wrapper: '.projects--wrapper' };
const aboutRoute = { name: 'about', id: 'about-me-page', template: '#about-me-page', wrapper: '.about--wrapper' };
const contactRoute = { name: 'contact', id: 'contact-page', template: '#contact-page', wrapper: '.contact--wrapper' };
const downloadsRoute = { name: 'downloads', id: 'downloads-page', template: '#downloads-page', wrapper: '.download--wrapper' };
const blogRoute = { name: 'blog', id: 'blog-page', template: '#blog-page' };

const routes = {
    '/': introRoute,
    '/intro': introRoute,
    '/index.html': introRoute,
    '/about': aboutRoute,
    '/about.html': aboutRoute,
    '/downloads': downloadsRoute,
    '/downloads.html': downloadsRoute,
    '/contact': contactRoute,
    '/contact.html': contactRoute,
    '/blog.html': blogRoute,
    '/blog': blogRoute
};


function resolveRoute(id) {
    try {
        return routes[id];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};

function router(event) {
    const url = window.location.hash.slice(1) || "/";
    const route = resolveRoute(url);
    loadRoute(route);
};

$(document).on("DOMContentLoaded", (event) => {
    showLoadingMask();
    isLoading = true;
});


$(document).on('hashchange', onHashChange);
$(window).on('resize', onWindowResize);

$(document).on("readystatechange", (event) => {
    if ((event.target.readyState === "interactive" ||
        event.target.readyState === "loading") && !isLoading) {
        showLoadingMask();
    } else if (event.target.readyState === "complete") {
        hideLoadingMask();
    }
});

$(document).on('load', function () {
    let route = routes[window.location.pathname];
    onInitialPageLoad(route);
    hideLoadingMask();
});


/**
 * Main method, on document ready
 */
$(document).ready(function () {
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


function showLoadingMask() {
    isLoading = true;
    let template = document.getElementById('loading-mask');
    const appContainer = document.querySelector("#app-container");
    let node = template.content.firstElementChild.cloneNode(true);
    appContainer.appendChild(node);
}

function hideLoadingMask() {
    if (isLoading) {
        let loaderMask = document.querySelector('.loading--wrapper');
        loaderMask.remove();
        isLoading = false;
    }
}


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


function onHashChange(event) {

}

/* ----------------------------------------------- Page Navigation ---------------------------------------------------- */

function loadRoute(route) {
    animateTransition(route, document);
    setActiveNavMenuItem(route.name);
    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector(route.template);
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    currentPage = route.name;
    handleTheme(currentPage);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
}

/**
 * Handle rendering page on initial load
 */
function onInitialPageLoad(route) {
    const appContainer = document.querySelector("#app-container");
    setActiveNavMenuItem(route.name);
    let template = document.getElementById(route.id);
    let node = template.content.firstElementChild.cloneNode(true);
    appContainer.appendChild(node);
    currentPage = route.name;
    handleTheme(currentPage);
}

function intro(route) {
    animateTransition(route, document);
    setActiveNavMenuItem(route.name);
    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector(route.template);
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    currentPage = 'intro';
    handleTheme(currentPage);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");

}


function blog() {
    setActiveNavMenuItem('blog');
}


function projects(route) {
    animateTransition(route, document)
    setActiveNavMenuItem('projects');
    const appContainer = document.querySelector("#app-container");
    const template = document.querySelector(route.template);
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    appContainer.appendChild(node);
    currentPage = 'projects';
    // Fetch and initialize Git status' on projects
    getAllRepoStats(document);
    handleTheme(currentPage);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");

}

function downloads(route) {
    animateTransition(route, document)
    setActiveNavMenuItem('downloads');
    const parentContainer = document.querySelector("#app-container");
    const template = document.getElementById(route.id);
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    parentContainer.appendChild(node);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
    currentPage = 'downloads';
    handleTheme(currentPage);

}

function contact(route) {
    animateTransition(route, document)
    setActiveNavMenuItem('contact');
    const parentContainer = document.querySelector("#app-container");
    const template = document.querySelector("#contact-page");
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    parentContainer.appendChild(node);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
    currentPage = 'contact';
    initContactForm(document, 'contact-form');
    handleTheme(currentPage);
}

function about(route) {
    animateTransition(route, document)
    setActiveNavMenuItem('about');
    const parentContainer = document.querySelector("#app-container");
    const template = document.querySelector("#about-me-page");
    const node = template.content.firstElementChild.cloneNode(true);
    node.classList.add('page-slide-in-start');
    parentContainer.appendChild(node);
    gsap.to(node, { duration: 0.1, x: 0 }, "<");
    /* Calculate + render years of experience */
    renderAboutMe(fullTimeStartDate, javaStartDate, springStartDate, javaScriptStartDate, angularStartDate,
        azureCloudStartDate, kubernetesStartDate, microServicesStartDate, restApiStartDate, webDevelopmentStartDate);
    currentPage = 'about';
    handleTheme(currentPage);
}


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

function setActiveNavMenuItem(pageName) {
    resetActiveNavItems();
    switch (pageName) {
        case 'intro':
            let introElementId = null;
            if (isMobile.matches) {
                introElementId = NAV_MOBILE_INTRO_ID;
            } else {
                introElementId = NAV_MENU_INTRO_ID;
            }
            document.getElementById(introElementId).dataset.active = true;
            break;

        case 'blog':
            let blogIdElement = null;
            if (isMobile.matches) {
                blogIdElement = NAV_MOBILE_BLOG_ID;
            } else {
                blogIdElement = NAV_MENU_BLOG_ID;
            }
            document.getElementById(blogIdElement).dataset.active = true;
            break;
        case 'projects':
            let projectsElementId = null;
            if (isMobile.matches) {
                projectsElementId = NAV_MOBILE_PROJECTS_ID;
            } else {
                projectsElementId = NAV_MENU_PROJECTS_ID;
            }
            document.getElementById(projectsElementId).dataset.active = true;
            break;

        case 'about':
            let aboutElementId = null;
            if (isMobile.matches) {
                aboutElementId = NAV_MOBILE_ABOUT_ID;
            } else {
                aboutElementId = NAV_MENU_ABOUT_ID;

            }
            document.getElementById(aboutElementId).dataset.active = true;
            break;

        case 'contact':
            let contactElementId = null;
            if (isMobile.matches) {
                contactElementId = NAV_MOBILE_CONTACT_ID;
            } else {
                contactElementId = NAV_MENU_CONTACT_ID;

            }
            document.getElementById(contactElementId).dataset.active = true;
            break;

        case 'downloads':
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

function animateTransition(route, document) {
    switch (route.name) {
        case 'intro':
            const introPage = document.querySelector(route.wrapper);
            let tl = new TimelineMax({
                onComplete: function () {
                    introBackgroundEffect.destroy(); // Cleanup intro page background effect
                    introPage.remove();
                },
            });
            tl.to(introPage, { duration: 0.1, x: '-100%' });
            break;
        case 'projects':
            const projectsPage = document.querySelector(route.wrapper);
            let tl2 = new TimelineMax({
                onComplete: function () {
                    projectsPage.remove();
                },
            });
            tl2.to(projectsPage, { duration: 0.1, x: '-100%' });
            break;
        case 'about':
            const aboutPage = document.querySelector(route.wrapper);
            let tl3 = new TimelineMax({
                onComplete: function () {
                    aboutPage.remove();
                },
            });
            tl3.to(aboutPage, { duration: 0.1, x: '-100%' });
            break;
        case 'contact':
            const contactPage = document.querySelector(route.wrapper);
            let tl4 = new TimelineMax({
                onComplete: function () {
                    contactPage.remove();
                },
            });
            tl4.to(contactPage, { duration: 0.1, x: '-100%' });
            break;
        case 'downloads':
            const downloadsPage = document.querySelector(route.wrapper);
            let tl5 = new TimelineMax({
                onComplete: function () {
                    downloadsPage.remove();
                },
            });
            tl5.to(downloadsPage, { duration: 0.1, x: '-100%' });
            break;
        default:
            console.error("Attempted to navigate to an unknown page: " + route.name);
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