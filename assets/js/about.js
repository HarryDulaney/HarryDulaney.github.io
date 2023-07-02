'use strict';
//about.js

function renderAboutMe(
    fullTimeStartDate,
    javaStartDate,
    springStartDate,
    javaScriptStartDate,
    angularStartDate,
    azureCloudStartDate,
    kubernetesStartDate,
    microServicesStartDate,
    restApiStartDate,
    webDevelopmentStartDate
) {
    /* Java */
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

    /* Spring */
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

    /* JavaScript */
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

    /* Angular */
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

    /* Azure */
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

    /* K8s */
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

    /* Microservices Design Patterns */
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

    /* Web Development */
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

    /* Rest APIs */
    let restApisElapsedTime = Date.now() - restApiStartDate.getTime();
    let restApisElapsedYears = restApisElapsedTime / MILLIS_PER_YEAR; // Divide by millis in one year
    let restApisElapsedFormated = (restApisElapsedYears).toFixed(1);
    let restApisSkillElement = document.getElementById('rest-apis-skill-exp-elapsed');
    let restApisWrapperElement = restApisSkillElement.querySelector('.wrapper');
    restApisWrapperElement.dataset.years = restApisElapsedFormated;
    let restApiSkillDataElement = restApisSkillElement.querySelector('.skills-data');
    restApiSkillDataElement.innerText = restApisElapsedFormated + ' years';
    let restApiProgressBarElement = restApisSkillElement.querySelector('.skills-progress-box');
    let restApiDataEl = restApiProgressBarElement.querySelector('.skills-progress');
    restApiDataEl.dataset.years = restApisElapsedFormated;

}
