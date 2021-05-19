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
    // /** Display tooltip on hover over project cards */
    // $('.spez-tippable').hover(function () {
    //     const $tooltip = $(this).find('.tool--tip');
    //     var tipCount = Number($tooltip.attr('data-count'));
    //
    //     if (tipCount < 1) {
    //         $tooltip.delay(500).fadeIn().show(1000, function () {
    //             $tooltip.delay(3000).fadeOut();
    //             tipCount++;
    //             $tooltip.attr('data-count', tipCount);
    //         });
    //     }
    // });
});
