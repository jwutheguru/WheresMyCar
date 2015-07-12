define(['jquery'], function($) {

    var $readout;
    var $textSavedLocation;
    var $textDirection;
    var $textInformation;

    var $mapSavedLocation;

    var mapSavedLocation;
    var markerSavedLocation;
    var markerCurrentLocation;

    function displaySavedLocation(text) {
        if (!$readout) $readout = $('#readout');
        if (!$textSavedLocation) $textSavedLocation = $('#textSavedLocation');

        $textSavedLocation.html(text);
    }

    function displayDirection(text) {
        if (!$readout) $readout = $('#readout');
        if (!$textDirection) $textDirection = $('#textDirection');

        $textDirection.html(text);
    }

    function displayInformation(text) {
        if (!$readout) $readout = $('#readout');
        if (!$textInformation) $textInformation = $('#textInformation');

        $textInformation.html(text);
    }

    function displaySavedLocationMap(position) {
        if ($mapSavedLocation) $mapSavedLocation.remove();

        $mapSavedLocation = $('<div>').attr({
            'id': 'mapSavedLocation',
            'style': 'height: 400px'
        }).appendTo($textSavedLocation.parent());

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var map = new google.maps.Map($mapSavedLocation[0], {
            center: latLng,
            zoom: 15,
        });
        mapSavedLocation = map;

        markerSavedLocation = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Target Location'
        });
    }

    function displayDirectionMap(position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        if (!markerCurrentLocation) {
            markerCurrentLocation = new google.maps.Marker({
                map: mapSavedLocation,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: 'Current Location'
            });
        }
        markerCurrentLocation.setPosition(latLng);
    }

    return {
        displaySavedLocation: displaySavedLocation,
        displayDirection: displayDirection,
        displayInformation: displayInformation,
        displaySavedLocationMap: displaySavedLocationMap,
        displayDirectionMap: displayDirectionMap
    };

});