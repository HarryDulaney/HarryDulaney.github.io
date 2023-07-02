'use strict';
//contact.js

/**
 * Initialize the contact form
 * @param {document} document
 * @param {formElementId} formElementId
 */
function initContactForm(document, formElementId) {
    var form = document.getElementById(formElementId);
    form.addEventListener("submit", submitContactForm);
}