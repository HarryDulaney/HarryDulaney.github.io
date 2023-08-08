'use strict';
//contact.js
let contactPageRecaptchaValidated = false;

/**
 * Initialize the contact form
 * @param {document} document
 * @param {formElementId} formElementId
 */
function initContactForm(document, formElementId) {
    var form = document.getElementById(formElementId);
    form.addEventListener("submit", submitContactForm);
}

function closeContactFormStatusAlert() {
    let successStatus = document.getElementById("contact-form-status-alert");
    let errorStatus = document.getElementById("contact-form-status-alert-error");
    gsap.to(successStatus, { opacity: '0', ease: "easeOut", duration: 0.2 })
    gsap.to(errorStatus, { opacity: '0', ease: "easeOut", duration: 0.2 })
}

async function submitContactForm(event) {
    event.preventDefault();
    var form = document.getElementById('contact-form');
    var successStatus = document.getElementById("contact-form-status-alert");
    var errorStatus = document.getElementById("contact-form-status-alert-error");
    showLoadingMask();

    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success
            gsap.to(successStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
            form.reset();
            hideLoadingMask();
        } else {
            // Error
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    gsap.to(errorStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
                    console.log('Unknown error occurred on contact form...');
                    form.reset();
                    hideLoadingMask();
                } else {
                    gsap.to(errorStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
                    console.log('Unknown error occurred on contact form...');
                    form.reset();
                    hideLoadingMask();
                }
            })
        }
    }).catch(error => {
        gsap.to(errorStatus, { opacity: '1', ease: "easeIn", duration: 0.2 })
        form.reset();
        hideLoadingMask();
    });
}

function showLoadingMask() {
    const parentContainer = document.querySelector("#parent-container");
    const template = document.querySelector("#loading-mask");
    const node = template.content.firstElementChild.cloneNode(true);
    parentContainer.appendChild(node);
}

function hideLoadingMask() {
    const loadingOverlay = document.querySelector("#loading-mask");
    loadingOverlay.remove();
}

/**
 * Enable the Contact Form Submit Button
 * @param {*} token 
 */
function enableContactSubmitButton(token) {
    contactPageRecaptchaValidated = true;
    $('#submit-button-contact-form').prop('disabled', false);
    $('#submit-button-contact-form').attr('title', 'Submit and Send!.');
}

/**
 * Disable the Contact Form Submit Button
 */
function disableContactSubmitButton() {
    contactPageRecaptchaValidated = false;
    $('#submit-button-contact-form').prop('disabled', true);
}
