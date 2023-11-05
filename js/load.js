
function load() {
    router();
    if (IS_RELOADED) {
        hideLoader();
        sessionStorage.setItem(PAGE_RELOADED_STORAGE_KEY, null);
        console.log('Page reloaded');
    }
}

$(window).on('load', load);
