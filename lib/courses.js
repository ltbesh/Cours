get_owned_courses = function(id){
	var places = Places.find({user_id:id}).fetch();
	var places_id = _.pluck(places, "_id")
	return Courses.find({place_id: {$in : places_id}});
}
