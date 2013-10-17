
// Publish the Courses and Places that corresponds to selectors passed as arguments
Meteor.publish('searched_places',function(	
	day_selector /* Array of int beetwen 1 and 7 */, 
	price_min /* int course price must be higher*/, 
	price_max /* int course price must be lower*/, 
	schedule_min /* int beetwen 0 and 1440, courses must start after that time*/, 
	schedule_max /* int beetwen 0 and 1440, courses must finish before that time*/,
	subject_search /* id of a tag object, tag_id of course must match this*/, 
	geographical_search /* geoJSON point, Places are looked for around that point*/, 
	limit /* number of results per page*/){

	// Return both cursor, one for places and one for courses
	return get_searched_places(day_selector, price_min, price_max, schedule_min, schedule_max, subject_search, geographical_search, limit)
});

// Publish only one place given an id
Meteor.publish('current_place', function(place_id){
	return Places.find(place_id);
});

// Publish only one course given an id
Meteor.publish('current_course', function(course_id){
	return Courses.find(course_id);
});

// Publish all tags
Meteor.publish('tags', function(){
	return Tags.find({});
}); 

// Publish places owned by the user
Meteor.publish('owned_places', function(){
	return get_owned_places(this.userId);
});

Meteor.publish('owned_courses', function(){
	return get_owned_courses(this.userId);
});