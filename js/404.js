'use strict';

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

function router(fragment) {
    const route = resolveRoute(fragment);
    route();
};


/**
 * Intro page route handler
 */
function intro() {
    const introPath = window.location.origin + '/';
    window.location.assign(introPath);
}


function projects() {
    const projectsPath = window.location.origin + '/#/projects';
    window.location.assign(projectsPath);
}

function downloads() {
    const downloadPath = window.location.origin + '/#/downloads';
    window.location.assign(downloadPath);
}

function contact() {
    const contactPath = window.location.origin + '/#/contact';
    window.location.assign(contactPath);
}

function about() {
    const aboutPath = window.location.origin + '/#/about';
    window.location.assign(aboutPath);
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


route('/intro', 'intro');
route('/about', 'about');
route('/projects', 'projects');
route('/contact', 'contact');
route('/downloads', 'downloads');
route('/intro.html', 'intro');
route('/about.html', 'about');
route('/projects.html', 'projects');
route('/contact.html', 'contact');
route('/downloads.html', 'downloads');

function router(event) {
    const url = window.location.pathname;
    const route = resolveRoute(url);
    route();
}

document.addEventListener('readystatechange', function (event) {
    if (event.target.readyState === 'complete') {
        router();
    }
});