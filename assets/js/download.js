'use strict';
//download.js
let downloadPageRecaptchaValidated = false;
/* --------------- Handle download page recapatcha--------------- */

/**
 * Enable the resume download button
 * @param {*} token 
 */
function enableResumeDownloadButton(token) {
    downloadPageRecaptchaValidated = true;
    $('#resume--download-icon').removeClass('fas fa-window-close');
    $('#resume--download-icon').addClass('fas fa-download');
    $('.download--wrapper .download--image').prop('disabled', false);
    $('.download--wrapper .download--image').prop('href', "assets/img/HarryDulaneyResume.pdf");
    $('.download--wrapper .download--image').prop('download', "HarryDulaneyResume");
    $(".download--wrapper .download--image").css('cursor', 'pointer');
    $('.download--wrapper .download--image').attr('title', 'Download my resume.');
}

/**
 * Disable the resume download button
 */
function disableResumeDownloadButton() {
    downloadPageRecaptchaValidated = false;
    $('#resume--download-icon').removeClass('fas fa-download');
    $('#resume--download-icon').addClass('fas fa-window-close');
    $('.download--wrapper .download--image').prop('href', "#");
    $('.download--wrapper .download--image').prop('download', undefined);
    $('.download--wrapper.download--image').css('cursor', 'not-allowed');
    $('.download--wrapper.download--image').attr('title', 'Please complete the recaptcha to download my resume.');
    $('.download--wrapper .download--image').prop('disabled', true);
}
