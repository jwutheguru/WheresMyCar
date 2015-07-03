require.config({
    paths: {
        baseUrl: 'src',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery-ui': './bower_components/jquery-ui/jquery-ui.min'
    },
});

require(['app'], function(app) {
    'use strict';

    if (!navigator || !navigator.geolocation) {
        alert('No Geolocation API detected in browser');
        return;
    }

    app.start();

});
