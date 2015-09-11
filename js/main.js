$(document).ready(function() {
    $("#about-team article").on("click", function() {
        $(this).toggleClass("overlay");
    });
    $("nav > button.nav-toggle").on("click", function() {
    	$("nav > span.nav-items").toggleClass("visible");
    });
    $("#openings-select div").on("click", function() {
        var obj = $(this);
        obj.parent().children("div").removeClass("active");
        $("#openings-desc > article").removeClass("active");
        obj.addClass("active");
        $("#" + obj.attr("data-target")).addClass("active");
    });
});