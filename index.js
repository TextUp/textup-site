$(document).ready(function() {

    // Nav
    // ---

    var $navItems = $("nav .nav-items"),
        $navToggle = $("nav button.nav-toggle"),
        $nav = $('nav');

    $navToggle.on("click", function(event) {
        $navItems.slideToggle();
    });
    $(document).on("click touchend", function(event) {
        var $target = $(event.target);
        if ($navToggle.is(':visible') && (!isOrClosest($target, $nav) ||
                isOrClosest($target, '.nav-items .nav-item a'))) {
            $navItems.slideUp();
        }
    }.bind(this));

    // Typed animation
    // ---------------

    $("#type-animate").typed({
        strings: ["TextUp.", "designers.", "innovators.", "solvers.", "listeners.", "TextUp."],
        backDelay: 1000
    });

    // Team overlays
    // -------------

    var $teamMembers = $("#about-team .team-member"),
        $closeOverlays = $("#about-team .team-member .overlay .btn");

    $teamMembers.on("click", function(event) {
        $(this).find('.overlay').fadeIn();
    });
    $closeOverlays.on('click', function(event) {
        event.stopImmediatePropagation();
        $(this).closest('.overlay').fadeOut();
    });

    // Helpers
    // -------

    function isOrClosest($el, test) {
        return $el && test && ($el.is(test) || $el.closest(test).length);
    }
});
