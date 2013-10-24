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

        //console.log(places_id);
        //console.log('before remove : ', gmaps.marker_data);

        // Remove the markers that are no longer in the places_id array
        _.each(gmaps.marker_data, function(marker){
            //console.log('marker id : ', marker.id);
            if(! _.contains(places_id, marker.id)){
                gmaps.remove_marker(marker.id);  
               //console.log('remove marker id : ', marker.id);
                }
        });
        //console.log('after remove : ', gmaps.marker_data);

        console.log('before adding : ', gmaps.marker_data);
        _.each(places, function(place){
            if(typeof(place.location.coordinates[1] !== undefined) && typeof(place.location.coordinates[0] !== undefined)){
                var obj_marker = {
                    id: place._id,
                    lat: place.location.coordinates[1],
                    lng: place.location.coordinates[0],
                    title: place.title
                };
                if(!gmaps.marker_exists('id', obj_marker.id)){
                    gmaps.add_marker(obj_marker);
                    console.log('add marker : ', obj_marker.id);
                }
                else{
                    console.log('did not add marker : ', obj_marker.id);
                }
            }
            else{
                console.log("probleme with place : ", place);
            }
        });
        console.log('after adding : ', gmaps.marker_data);

    });
};

Template.map.destroyed = function(){
    Session.set('map', false);
}