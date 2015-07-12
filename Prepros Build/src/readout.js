define(['jquery'], function($) {

    var $textSavedLocation;
    var $textDirection;
    var $textInformation;

    var $mapSavedLocation;
    var $mapDirection;

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

    function displaySavedLocationMap(position) {
        var $map = $('<div>').attr({
            'id': 'mapSavedLocation',
            'style': 'height: 300px'
        }).appendTo($textSavedLocation);

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var map = new google.maps.Map($map[0], {
            center: latLng,
            zoom: 12,
        });

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Target Location'
        });
    }

    function displayDirectionMap(position) {
        var $map = $('<div>').attr({
            'id': 'mapDirection',
            'style': 'height: 300px'
        }).appendTo($textDirection);

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var map = new google.maps.Map($map[0], {
            center: latLng,
            zoom: 12,
        });

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Target Location'
        });
    }

    return {
        displaySavedLocation: displaySavedLocation,
        displayDirection: displayDirection,
        displayInformation: displayInformation,
        displaySavedLocationMap: displaySavedLocationMap,
        displayDirectionMap: displayDirectionMap
    };

});