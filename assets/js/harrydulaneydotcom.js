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
    let tipped = 0;
    $('.spez-card').hover(function () {
        const tooltip = $(this).find('.tool--tip');
        if (tipped < 1) {
            tooltip.fadeIn().show('slow', function () {
                tooltip.delay(1000).fadeOut();
                tipped++;
            });
        } else {
            tipped = 0;

        }
    });

});
