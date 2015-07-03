define([], function() {

    var R = 6371; // km. The radius of the Earth.

    function toRadian(degree) {
        return degree * Math.PI / 180;
    }

    function toDegree(radian) {
        return radian * 180 / Math.PI;
    }

    function convertKmToFeet(km) {
        return km * 3280.84;
    }

    function calculateDistance(current, target) {
        var lat1 = current.coords.latitude;
        var long1 = current.coords.longitude;
        var lat2 = target.coords.latitude;
        var long2 = target.coords.longitude;

        var dLat = toRadian(lat2 - lat1);
        var dLon = toRadian(long2 - long1);
        lat1 = toRadian(lat1);
        lat2 = toRadian(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // distance in km

        return convertKmToFeet(d);
    }

    function calculateBearing(current, target) {
        var lat1 = current.coords.latitude;
        var long1 = current.coords.longitude;
        var lat2 = target.coords.latitude;
        var long2 = target.coords.longitude;

        lat1 = toRadian(lat1);
        long1 = toRadian(long1);
        lat2 = toRadian(lat2);
        long2 = toRadian(long2);

        // var y = Math.sin(λ2-λ1) * Math.cos(φ2);
        // var x = Math.cos(φ1)*Math.sin(φ2) -
        //         Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
        // var brng = toDegree(Math.atan2(y, x));

        var y = Math.sin(long2-long1) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) -
                Math.sin(lat1)*Math.cos(lat2)*Math.cos(long2-long1);
        var bearing = toDegree(Math.atan2(y, x));

        bearing = (bearing + 360) % 360;

        return bearing;
    }

    function getDirectionText(bearing) {
        var directionText = '';
        if (bearing > 337.5 && bearing <= 22.5) directionText = 'N';
        else if (bearing > 22.5 && bearing <= 67.5) directionText = 'NE';
        else if (bearing > 67.5 && bearing <= 112.5) directionText = 'E';
        else if (bearing > 112.5 && bearing <= 157.5) directionText = 'SE';
        else if (bearing > 157.5 && bearing <= 202.5) directionText = 'S';
        else if (bearing > 202.5 && bearing <= 247.5) directionText = 'SW';
        else if (bearing > 247.5 && bearing <= 292.5) directionText = 'W';
        else if (bearing > 292.5 && bearing <= 337.5) directionText = 'NW';

        return directionText;
    }

    return {
        calculateDistance: calculateDistance,
        calculateBearing: calculateBearing,
        getDirectionText: getDirectionText
    };

});
