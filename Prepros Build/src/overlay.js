define(['jquery'], function($) {

    var $overlay;

    function createOverlay() {
        $overlay = $('<div>').attr({
            'class': 'overlay hidden'
        }).appendTo($(document.body));
    }

    function showOverlay() {
        if (!$overlay) createOverlay();
        $overlay.removeClass('hidden');
    }

    function hideOverlay() {
        if (!$overlay) createOverlay();
        $overlay.addClass('hidden');
        $overlay.empty();
    }

    function showLoading(label) {
        showOverlay();

        var $content = $('<div>')
            .attr({
                'class': 'content'
            })
            .appendTo($overlay);

        $('<img>').attr({
            'src': 'assets/images/loading.gif'
        }).appendTo($content);

        $('<label>').text(label || 'Please wait while we fetch your location')
            .appendTo($content);
    }

    return {
        showLoading: showLoading,
        hideOverlay: hideOverlay
    };

});