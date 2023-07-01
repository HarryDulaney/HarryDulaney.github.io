/**
 * Fetch and set Github Stats for the
 * Projects section.
 * 
 * Uses github api based on username and repo names
 */
function getAllRepoStats(document) {
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
    const PFOLIE = 'pfolie';
    const HARRY_DULANEY_COM = 'HarryDulaney.github.io';


    fetch(API_BASE + REPOS_URL + PAGE_COUNT_QUERY, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success
            response.json().then(data => {
                for (let i in data) {
                    switch (data[i].name) {
                        case HARRY_DULANEY_COM:
                            /* Set HarryDulaney.com Github Stats */
                            let hdComStats = document.getElementById('harrydulaney-com-stats');
                            let hdComUpdateTime = hdComStats.getElementsByClassName('git-stats-datetime');
                            let hdComStars = document.getElementById('harrydulaney-com-stars');
                            let hdComForks = document.getElementById('harrydulaney-com-forks');
                            hdComStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                            hdComForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                            /* Set Last Updated */
                            const hdComTime = new Date().toLocaleTimeString();
                            const hdComDate = new Date().toLocaleDateString();
                            hdComUpdateTime[0].innerHTML = (`<span>${hdComDate} ${hdComTime}</span>`);
                            break;
                        case PFOLIE:
                            /* Set Pfolie Github Stats */
                            let pfolieStats = document.getElementById('pfolie-app-stats');
                            let pfolieUpdateTime = pfolieStats.getElementsByClassName('git-stats-datetime');
                            let pfolieStars = document.getElementById('pfolie-stars');
                            let pfolieForks = document.getElementById('pfolie-forks');
                            pfolieStars.innerHTML = (`<strong> ${data[i].stargazers_count}</strong>`);
                            pfolieForks.innerHTML = (`<strong>${data[i].forks_count}</strong>`);
                            /* Set Last Updated */
                            const pt1 = new Date().toLocaleTimeString();
                            const pd1 = new Date().toLocaleDateString();
                            pfolieUpdateTime[0].innerHTML = (`<span>${pt1} ${pd1}</span>`);
                            break;
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
                            simAirUpdateTime[0].innerHTML = (`<span>${t1} ${d1}</span>`);
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
                            deezerUpdateTime[0].innerHTML = (`<span>${d3} ${t3}</span>`);
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
                            introJavaUpdated[0].innerHTML = (`<span>${d4} ${t4}</span>`);
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
                            fileCommUpdated[0].innerHTML = (`<span>${d5} ${t5}</span>`);
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
                            contactAppUpdate[0].innerHTML = (`<span>${d6} ${t6}</span>`);
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
                            updateDateTime[0].innerHTML = (`<span>${d7} ${t7}</span>`);
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
                            updateTime[0].innerHTML = (`<span>${d8} ${t8}</span>`);
                            break;

                    }
                }
            });

        } else {
            // Error
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    console.log('Following error\'s occurred while calling GitHub API...');
                    data.errors.forEach(error => {
                        console.log(error);
                    });
                } else {
                    console.log('Unknown error occurred while calling GitHub API...');
                }
            })
        }
    }).catch(error => {
        console.log('Unknown error occurred while calling GitHub API...');
    });


}

/**
 * Toggle expanded state of the projects section
 * Show's and hides the extended list of projects
 */
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
