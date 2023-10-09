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
    window.location.assign('#/intro');
}


function projects() {
    window.location.assign('#/projects');
}

function downloads() {
    window.location.assign('#/downloads');
}

function contact() {
    window.location.assign('#/contact');
}

function about() {
    window.location.assign('#/about');
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


$(window).on('load', function () {
    const fragment = window.location.hash;
    if (fragment.includes('intro')) {
        router(fragment);
    } else if (fragment.includes('about')) {
        router(fragment);
    } else if (fragment.includes('projects')) {
        router(fragment);
    } else if (fragment.includes('contact')) {
        router(fragment);
    } else if (fragment.includes('downloads')) {
        router(fragment);
    } else if (fragment.includes('blog')) {
        router(fragment);
    }
});