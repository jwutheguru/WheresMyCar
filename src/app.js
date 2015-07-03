define(['jquery', 'geolocation', 'readout', 'overlay'], function($, geolocation, readout, overlay) {

    var appStarted = false;

    var lsSavedLocationKey = 'savedLocation';

    var savedLocation;
    var currentLocation;
    var currentLocationInterval;

    var $btnSetLocation;
    var $btnGetDirection;
    var $btnClearSessionData;

    function registerControls() {
        $btnSetLocation = $('#btnSetLocation');
        $btnGetDirection = $('#btnGetDirection');
        $btnClearSessionData = $('#btnClearSessionData');
    }

    function registerControlsEvents() {
        $btnClearSessionData.on('click', function(e) {
            localStorage[lsSavedLocationKey] = '';
            delete localStorage[lsSavedLocationKey];

            readout.displaySavedLocation('');
            readout.displayDirection('');
            readout.displayInformation('');

            clearInterval(currentLocationInterval);
            currentLocationInterval = null;
        });

        $btnSetLocation.on('click', function(e) {
            if (savedLocation) {
                if (!confirm('You currently have a location saved. Would you like to overwrite it?')) return;
            }

            clearInterval(currentLocationInterval);
            currentLocationInterval = null;

            overlay.showLoading();
            navigator.geolocation.getCurrentPosition(setLocationHandler, geolocationErrorHandler);
        });

        $btnGetDirection.on('click', function(e) {
            clearInterval(currentLocationInterval);

            overlay.showLoading();
            currentLocationInterval = setInterval(function() {
                navigator.geolocation.getCurrentPosition(getDirectionHandler, geolocationErrorHandler);
            }, 3000);
        });
    }

    function setLocationHandler(location, loadedFromSession) {
        overlay.hideOverlay();

        savedLocation = {
            coords: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                altitude: location.coords.altitude,
                accuracy: location.coords.accuracy,
                altitudeAccuracy: location.coords.altitudeAccuracy,
                heading: location.coords.heading,
                speed: location.coords.speed
            },
            timestamp: location.timestamp
        };

        localStorage[lsSavedLocationKey] = JSON.stringify(savedLocation);

        readout.displaySavedLocation(
            'Saved position' + (loadedFromSession ? ' (from previous session)' : '') + '\n' +
            '[' + (new Date(savedLocation.timestamp)).toString() + ']\n\n' +
            'Details:\n\n' + 
            JSON.stringify(savedLocation, null, 2)
        );

        $btnGetDirection.prop('disabled', false);
    }

    function getDirectionHandler(location) {
        overlay.hideOverlay();

        currentLocation = {
            coords: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                altitude: location.coords.altitude,
                accuracy: location.coords.accuracy,
                altitudeAccuracy: location.coords.altitudeAccuracy,
                heading: location.coords.heading,
                speed: location.coords.speed
            },
            timestamp: location.timestamp
        };

        readout.displayDirection(
            'Current position\n' + 
            '[' + (new Date(currentLocation.timestamp)).toString() + ']\n\n' +
            'Details:\n\n' + 
            JSON.stringify(currentLocation, null, 2));

        var distance = geolocation.calculateDistance(currentLocation, savedLocation);
        var bearing = geolocation.calculateBearing(currentLocation, savedLocation);

        var dir = geolocation.getDirectionText(bearing);

        readout.displayInformation('Your destination is ' + distance.toFixed(2) + ' feet away, bearing ' + bearing.toFixed(2) + ' degrees (' + dir + ').');
    }

    function geolocationErrorHandler(error) {
        overlay.hideOverlay();
        readout.displaySavedLocation('');
        readout.displayDirection('');
        readout.displayInformation('');

        switch(error.code) {
            case error.PERMISSION_DENIED:
                readout.displayInformation('You have disabled Location Services for this site. This app requires your location to function. Please enable to continue.');
                break;
            case error.POSITION_UNAVAILABLE:
                readout.displayInformation('Your location could not be determined.');
                break;
            case error.TIMEOUT:
                readout.displayInformation('Attemping to get location timed out and could not be determined.');
                break;
            case error.UNKNOWN_ERROR:
                readout.displayInformation('An unknown error has occurred.');
                break;
        }
    }

    function reloadSession() {
        var savedData = localStorage[lsSavedLocationKey];
        if (!savedData) return;

        setLocationHandler(JSON.parse(savedData), true);
    }

    function start() {
        if (appStarted) return;

        registerControls();
        registerControlsEvents();

        reloadSession();

        appStarted = true;
    }

    return {
        start: start,
        setSavedLocation: function(location) {
            savedLocation = location;
        },
        getSavedLocation: function() {
            return savedLocation;
        }
    };

});