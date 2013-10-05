Template.map.rendered = function() {
    map = new GMaps({
        el: '#map',
        lat: 48.85432452980058,
        lng: 2.3462677001953125,
        zoomControl : true,
        zoomControlOpt: {
            style : 'MEDIUM',
            position: 'TOP_LEFT'
        },
        zoom: 12,
        panControl : false,
        streetViewControl : true,
        mapTypeControl: false,
        overviewMapControl: false
      });
};