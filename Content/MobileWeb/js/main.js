
$(document).ready(function () {
    jQuery.each(callWhenReady, function (index, element) {
        eval(element);
    });
    callWhenReady.length = 0;
});
$(document).bind("mobileinit", function () {
    $.mobile.defaultPageTransition = "none"
    $.mobile.ajaxEnabled = false;
});

