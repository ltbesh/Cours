Template.map.rendered = function() {
    if(!Session.get('map'))
        gmaps.initialize();

    Deps.autorun(function(){
        var places = Places.find({}).fetch();
        var places_id = _.pluck(places,'_id');

        _.each(gmaps.markerData, function(marker){
            if(! _.contains(places_id, marker.id))
                gmaps.removeMarker(marker.id);                 
        });

        _.each(places, function(place){
            if(typeof(place.location.coordinates[1] !== undefined) && typeof(place.location.coordinates[0] !== undefined)){
                var obj_marker = {
                    id: place._id,
                    lat: place.location.coordinates[1],
                    lng: place.location.coordinates[0],
                    title: place.title
                };
                if(!gmaps.markerExists('id', obj_marker.id))
                    gmaps.addMarker(obj_marker)
            }
        });
    });
};

Template.map.destroyed = function(){
    Session.set('map', false);
}