'use strict';
//download.js

/* --------------- Handle download page recapatcha--------------- */
/**
 * Enable the resume download button
 * @param {*} token 
 */
function enableResumeDownloadButton(token) {
    $('#resume--download-icon').removeClass('fas fa-window-close');
    $('#resume--download-icon').addClass('fas fa-download');

    $('#resume--download-link').prop('disabled', false);
    $('#resume--download-link').prop('href', "assets/img/HarryDulaneyResume.pdf");
    $('#resume--download-link').prop('download', "HarryDulaneyResume");

}

/**
 * Disable the resume download button
 */
function disableResumeDownloadButton() {
    $('#resume--download-icon').removeClass('fas fa-download');
    $('#resume--download-icon').addClass('fas fa-window-close');

    $('#resume--download-link').prop('disabled', true);
    $('#resume--download-link').prop('href', "#");
    $('#resume--download-link').prop('download', undefined);
}
