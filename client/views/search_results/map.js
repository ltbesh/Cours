Template.map.rendered = function() {
    if(!Session.get('map'))
        gmaps.initialize();

    Deps.autorun(function(){
        var places = Places.find().fetch();
        var placesIds = _.pluck(places,'_id');

        _.each(gmaps.markerData, function(marker){
            if(! _.contains(placesIds, marker.id))
                gmaps.removeMarker(marker.id);                 
        });

        _.each(places, function(place){
            if(typeof(place.lat !== undefined) && typeof(place.lng !== undefined)){
                var objMarker = {
                    id: place._id,
                    lat: place.lat,
                    lng: place.lng,
                    title: place.title
                };
                if(!gmaps.markerExists('id', objMarker.id))
                    gmaps.addMarker(objMarker)
            }
        });
    });
};

Template.map.destroyed = function(){
    Session.set('map', false);
}