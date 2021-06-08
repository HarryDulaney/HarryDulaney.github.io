/** @author Harry Dulaney */
let open = 0;
var themeMode = "dark_mode";
$(document).ready(function () {

    $('#expandMenu').on('click', function () {
        if (open === 0) {
            $('#mobile--navigation').css('display', 'block');
            $('#navbar').css('height', '200px');
            open = 1;
        } else if (open === 1) {
            $('#mobile--navigation').css('display', 'none');
            $('#navbar').css('height', 'fit-content');
            open = 0;

        }

    });

    $('#navbar').on('dblclick', function () {
        if (open === 1) {
            $('#mobile--navigation').css('display', 'none');
            $('#navbar').css('height', 'fit-content');
            open = 0;
        }
    });


    $('#body--main').on('click', function () {
        if (open === 1) {
            $('#mobile--navigation').css('display', 'none');
            $('#navbar').css('height', 'fit-content');
            open = 0;

        }
    });
});

function enableSubmitButton() {
    document.getElementById("submit-button").disabled = false;
    document.getElementById("submit-button").setAttribute("value", "Submit");
}

function disableSubmitButton() {
    document.getElementById("submit-button").disabled = true;
    // document.getElementById("submit-button").setAttribute("value", "Verify");

}