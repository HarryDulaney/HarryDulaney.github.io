'use strict';
//download.js
let downloadPageRecaptchaValidated = false;
/* --------------- Handle download page recapatcha--------------- */
/**
 * Onload callback for the Download page recaptcha
 */
function onloadDownloadRecaptcha() {
    if (downloadPageRecaptchaValidated) {
        $('#resume--download-icon').removeClass('fas fa-window-close');
        $('#resume--download-icon').addClass('fas fa-download');
        $('.download--wrapper .downloads .download--image').prop('disabled', false);
        $('.download--wrapper .downloads .download--image').css('cursor', 'pointer');
        $('.download--wrapper .downloads .download--image').prop('href', "assets/img/HarryDulaneyResume.pdf");
        $('.download--wrapper .downloads .download--image').prop('download', "HarryDulaneyResume");
        $('.download--wrapper .downloads .download--image').attr('title', 'Download Ready!.');
    } else {
        $('#resume--download-icon').removeClass('fas fa-download');
        $('#resume--download-icon').addClass('fas fa-window-close');
        $('.download--wrapper .downloads .download--image').prop('href', "#");
        $('.download--wrapper .downloads .download--image').prop('download', "");
        $('.download--wrapper .downloads .download--image').css('cursor', 'not-allowed');
        $('.download--wrapper .downloads .download--image').attr('title', 'Please complete the recaptcha to download my resume.');
        $('.download--wrapper .downloads .download--image').prop('disabled', true);
    }

}

/**
 * Enable the resume download button
 * @param {*} token 
 */
function enableResumeDownloadButton(token) {
    downloadPageRecaptchaValidated = true;
    $('#resume--download-icon').removeClass('fas fa-window-close');
    $('#resume--download-icon').addClass('fas fa-download');
    $('.download--wrapper .downloads .download--image').prop('disabled', false);
    $('.download--wrapper .downloads .download--image').prop('href', "assets/img/HarryDulaneyResume.pdf");
    $('.download--wrapper .downloads .download--image').prop('download', "HarryDulaneyResume");
    $('.download--wrapper .downloads .download--image').css('cursor', 'pointer');
    $('.download--wrapper .downloads .download--image').attr('title', 'Download To Download!');
}

/**
 * Disable the resume download button
 */
function disableResumeDownloadButton() {
    downloadPageRecaptchaValidated = false;
    $('#resume--download-icon').removeClass('fas fa-download');
    $('#resume--download-icon').addClass('fas fa-window-close');
    $('.download--wrapper .downloads .download--image').prop('href', "#");
    $('.download--wrapper .downloads .download--image').prop('download', null);
    $('.download--wrapper .downloads .download--image').css('cursor', 'not-allowed');
    $('.download--wrapper .downloads .download--image').attr('title', 'Please complete the recaptcha to download my resume.');
    $('.download--wrapper .downloads .download--image').prop('disabled', true);
}
