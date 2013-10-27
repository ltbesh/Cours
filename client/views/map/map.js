Template.map.rendered = function() {
    if(!Session.get('map'))
        gmaps.initialize();

    Deps.autorun(function(){
        var places_cursor =  get_searched_places(   
            Session.get('day_selector'), 
            Session.get('price_min'), 
            Session.get('price_max'), 
            Session.get('schedule_min'), 
            Session.get('schedule_max'),
            Session.get('subject_search'), 
            Session.get('geographical_search').location, 
            5);

        if (places_cursor)
            var places = places_cursor[0].fetch();

        var places_id = _.pluck(places,'_id');

        //Remove the markers that are no longer in the places_id array
        _.each(gmaps.marker_data, function(marker){
            if(! _.contains(places_id, marker.id)){
                gmaps.remove_marker(marker.id);  
            }
        });
        _.each(places, function(place){
            if(typeof(place.location.coordinates[1] !== undefined) && typeof(place.location.coordinates[0] !== undefined)){
                var obj_marker = {
                    id: place._id,
                    lat: place.location.coordinates[1],
                    lng: place.location.coordinates[0],
                    title: place.title
                };
                var marker_not_exists = ! gmaps.marker_exists('id', obj_marker.id);
                if(! gmaps.marker_exists('id', obj_marker.id))
                    gmaps.add_marker(obj_marker);
            }
        });
    });
};

Template.map.destroyed = function(){
    Session.set('map', false);
}