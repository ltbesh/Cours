Template.map.rendered = function() {
    if(!map)
        var map = new Course_map("#map_630");
    
    Deps.autorun(function(){
        // Map on the detail page
        if (Session.get("current_place")){
            var places = new Array();
            places.push(Places.findOne(Session.get("current_place")._id));
        }//Map on the search page
        else{
            var places_cursor =  get_searched_places(   
                Session.get("day_selector"), 
                Session.get("price_min"), 
                Session.get("price_max"), 
                Session.get("schedule_min"), 
                Session.get("schedule_max"),
                Session.get("tag_selector"), 
                Session.get("geographical_search"), 
                5);
            if (places_cursor){
                var places = places_cursor[0].fetch();
                var places_id = _.pluck(places,"_id");
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
