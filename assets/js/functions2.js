//@author Harry Dulaney
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

    if (themeMode === "dark_mode") {
        $('.w3-card-4').css("background-color","midnightblue");
        $('.section--heading').css("color","#0b023e");
    } else {
        $('.w3-card-4').css("background-color","#EAE7DC");
        $('.section--heading').css("color","#024356");

    }
});

$(window).on('resize', function () {
    if ($(window).width < 600) {

    }

});