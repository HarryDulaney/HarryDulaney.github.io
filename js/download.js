'use strict';

let downloadPageRecaptchaValidated = false;
const RESUME_DOWNLOAD_PATH = 'assets/img/HarryDulaneyResume.pdf';
const RESUME_DOWNLOAD_NAME = 'HarryDulaneyResume';
const RESUME_READY_MESSAGE = 'Ready to Download!';

const RESUME_DOWNLOAD_PATH_DISABLED = 'assets/img/HarryDulaneyResume.pdf';
const RESUME_DOWNLOAD_NAME_DISABLED = 'HarryDulaneyResume';
const RESUME_RECAPTCHA_REQUIRED = 'Please complete the recaptcha to download my resume.';
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
        $('.download--wrapper .downloads .download--image').prop('href', RESUME_DOWNLOAD_PATH);
        $('.download--wrapper .downloads .download--image').prop('download', RESUME_DOWNLOAD_NAME);
        $('.download--wrapper .downloads .download--image').attr('title', RESUME_READY_MESSAGE);
    } else {
        $('#resume--download-icon').removeClass('fas fa-download');
        $('#resume--download-icon').addClass('fas fa-window-close');
        $('.download--wrapper .downloads .download--image').prop('href', '#');
        $('.download--wrapper .downloads .download--image').prop('download', undefined);
        $('.download--wrapper .downloads .download--image').css('cursor', 'not-allowed');
        $('.download--wrapper .downloads .download--image').attr('title', RESUME_RECAPTCHA_REQUIRED);
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
    $('.download--wrapper .downloads .download--image').prop('href', RESUME_DOWNLOAD_PATH);
    $('.download--wrapper .downloads .download--image').prop('download', RESUME_DOWNLOAD_NAME);
    $('.download--wrapper .downloads .download--image').css('cursor', 'pointer');
    $('.download--wrapper .downloads .download--image').attr('title', RESUME_READY_MESSAGE);
}

/**
 * Disable the resume download button
 */
function disableResumeDownloadButton() {
    downloadPageRecaptchaValidated = false;
    $('#resume--download-icon').removeClass('fas fa-download');
    $('#resume--download-icon').addClass('fas fa-window-close');
    $('.download--wrapper .downloads .download--image').prop('href', '#');
    $('.download--wrapper .downloads .download--image').prop('download', undefined);
    $('.download--wrapper .downloads .download--image').css('cursor', 'not-allowed');
    $('.download--wrapper .downloads .download--image').attr('title', RESUME_RECAPTCHA_REQUIRED);
    $('.download--wrapper .downloads .download--image').prop('disabled', true);
}
