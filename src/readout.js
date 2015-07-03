define(['jquery'], function($) {

    var $textSavedLocation;
    var $textDirection;
    var $textInformation;

    function displaySavedLocation(text) {
        if (!$textSavedLocation) $textSavedLocation = $('#textSavedLocation');

        $textSavedLocation.html(text);
    }

    function displayDirection(text) {
        if (!$textDirection) $textDirection = $('#textDirection');

        $textDirection.html(text);
    }

    function displayInformation(text) {
        if (!$textInformation) $textInformation = $('#textInformation');

        $textInformation.html(text);
    }

    return {
        displaySavedLocation: displaySavedLocation,
        displayDirection: displayDirection,
        displayInformation: displayInformation
    };

});