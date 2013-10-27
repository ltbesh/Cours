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

        if (places_cursor){
            var places = places_cursor[0].fetch();

            var places_id = _.pluck(places,'_id');

            //Remove the markers that are no longer in the places_id array
            gmaps.remove_markers(places_id);

            for(var i = 0, places_length = places.length; i < places_length; i ++){
                var place = places[i];
                if(!gmaps.marker_exists('id', place.id) && typeof(place.location.coordinates[1] !== undefined) && typeof(place.location.coordinates[0] !== undefined)){
                        var obj_marker = {
                            id: place._id,
                            lat: place.location.coordinates[1],
                            lng: place.location.coordinates[0],
                            title: place.title
                        };
                        gmaps.add_marker(obj_marker);
                    }
                }
            gmaps.calc_bounds();
        }
    });
};

Template.map.destroyed = function(){
    Session.set('map', false);
}