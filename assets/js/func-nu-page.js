//@author Harry Dulaney
var tog = 0;
$(document).ready(function () {
    $("#expandMenu").on("mouseover", function () {
        $("#mobile--navigation").css("display", "block");
        $("#navbar").css("height", "200px");
        tog = 0;

    })
    $(window).on("click", function () {

        $("#mobile--navigation").css("display", "none");
        $("#navbar").css("height", 'fit-content');
    })

});
