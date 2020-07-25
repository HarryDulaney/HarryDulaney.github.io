//@author Harry Dulaney
let open = 0;
$(document).ready(function () {
    $('#expandMenu').on('click', function () {
        if (open === 0) {
            $('#mobile--navigation').css('display', 'block');
            $('#navbar').css('height', '200px');
            open = 1;
        }
    })

    $('#navbar').on('dblclick', function () {
        if (open === 1) {
            $('#mobile--navigation').css('display', 'none');
            $('#navbar').css('height', 'fit-content');
            open = 0;
        }
    })


    $('#body--main').on('click', function () {
        if (open === 1) {
            $('#mobile--navigation').css('display', 'none');
            $('#navbar').css('height', 'fit-content');
            open = 0;

        }
    })

});
