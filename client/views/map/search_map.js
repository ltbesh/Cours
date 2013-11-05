Template.map.rendered = function() {
    if(!map)
        var map = new Course_map('#map');

    Deps.autorun(function(){

        if (Session.get("current_place")){
            var places = Places.find(Session.get("current_place")).fetch();
        }
        else{
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
                map.remove_markers(places_id);
            }
        }
        if(places){
            // Add all the marker in places
            for(var i = 0, places_length = places.length; i < places_length; i ++){
                map.add_marker(places[i]);
            }
            // Recenter the map to focus on the marker area
            map.calc_bounds();
        }
    });
};
