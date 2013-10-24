get_owned_places = function(id){
	return Places.find({user_id:id});
}

get_searched_places = function(
	day_selector /* Array of int beetwen 1 and 7 */, 
	price_min /* int course price must be higher*/, 
	price_max /* int course price must be lower*/, 
	schedule_min /* int beetwen 0 and 1440, courses must start after that time*/, 
	schedule_max /* int beetwen 0 and 1440, courses must finish before that time*/,
	subject_search /* id of a tag object, tag_id of course must match this*/, 
	geographical_search /* geoJSON point, Places are looked for around that point*/, 
	limit /* number of results per page*/){

	// Find the id of places that are near the geographical search
	if(geographical_search){
		var places_id = Places.find({location :{$near : {$geometry : geographical_search}, $maxDistance : 2000}}).fetch();
		var places_id_array = [];

		_.each(places_id, function(id_object){
			places_id_array.push(id_object._id);
		});
		// Find courses that match all the criterion
		if(places_id){
			var courses_cursor = Courses.find({
				tag_id: subject_search,   
				day_of_week : {$in: day_selector},
				place_id : {$in: places_id_array}, 
				price : {$gt : price_min, $lt : price_max}, 
				starts : {$gt : schedule_min},
				ends : {$lt : schedule_max}},
				{sort: {price: 1}, limit: limit, fields: {description: false, additional_information: false}});

			// Find the places linked to the courses we found
			var courses = courses_cursor.fetch();
			var courses_places_id = _.pluck(courses,'place_id');
			var places_cursor = Places.find({_id : {$in : courses_places_id}}, {fields: {description:0}});
		
			return [places_cursor, courses_cursor];
		}
	}

}
