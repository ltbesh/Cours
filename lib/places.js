get_owned_places = function(id){
    return Places.find({user_id:id});
}

get_searched_places = function(
    day_selector /* Array of int beetwen 1 and 7 */, 
    price_min /* int course price must be higher*/, 
    price_max /* int course price must be lower*/, 
    schedule_min /* int beetwen 0 and 1440, courses must start after that time*/, 
    schedule_max /* int beetwen 0 and 1440, courses must finish before that time*/,
    tag_selector /* id of a tag object, tag_id of course must match this*/, 
    geographical_search /* geoJSON point, Places are looked for around that point*/, 
    limit /* number of results per page*/){
    // Find the id of places that are near the geographical search
    if(geographical_search){
        // Search by postal code
        if(_.contains(geographical_search.types,"postal_code")){
            var places_cursor = Places.find({
                postal_code : geographical_search.postal_code}, 
                {fields : {_id: 1}});
        }
        // Search by city
        else if(_.contains(geographical_search.types,"locality")){
            var places_cursor = Places.find({
                locality : geographical_search.locality}, 
                {fields : {_id: 1}});
        }
        // Search by address
        else if(geographical_search.location){
            var places_cursor = Places.find({
                location :{$near : {$geometry : geographical_search.location}, $maxDistance : 2000}}, 
                {fields : {_id: 1}});
        }
    }
    // Find the id of the courses located in the places found above that match the price and tag criteria
    if(places_cursor){

        var places_id_array = _.pluck(places_cursor.fetch(), "_id");
        var courses_cursor = Courses.find({
            tag_id:  tag_selector,   
            place_id : {$in: places_id_array}, 
            price : {$gt : price_min, $lt : price_max}}, 
            {sort: {price: 1}, limit: limit, fields: {_id: true}});

        // Find the time slot that belong to the courses found above that match the day and time criterion
        if (courses_cursor){
            var courses_id_array = _.pluck(courses_cursor.fetch(), "_id");
            var time_slot_cursor = TimeSlots.find({
                course_id : {$in: courses_id_array}, 
                day_of_week : {$in: day_selector},
                start_time : {$gt : schedule_min},
                end_time : {$lt : schedule_max}});
        }
        // Find the courses linked to the time slots we found
        var time_slots_courses_id = _.pluck(time_slot_cursor.fetch(), "course_id");
        courses_cursor = Courses.find({_id : {$in : time_slots_courses_id}});

        // Find the places linked to the courses we found
        var courses_places_id = _.pluck(courses_cursor.fetch(),"place_id");
        var places_cursor = Places.find({_id : {$in : courses_places_id}});
        courses_cursor.rewind();

        return [places_cursor, courses_cursor, time_slot_cursor];
    }
}

upsert_place = function(place){
    Meteor.call("insert_or_update_place", place, function(error){
        if(error){
            insert_alert(error.reason, "danger");
        }
        else{
            if(place._id){
                insert_alert("Votre lieu à bien été modifié", "success");
            }
            else{
                insert_alert("Votre lieu à bien été ajouté", "success");
            }
            if(!Session.get("first_course")){
                Router.go("user_edit"); 
            }
        }
    });
}
