Meteor.publish('courses', 
	function(day_selector, price_min, price_max, schedule_min, schedule_max,subject_search, geographical_search, limit){
		if(geographical_search){
			var places_id = Places.find({location: {$near: geographical_search, $maxDistance : 2000}}, {fields : {_id : 1}}).fetch();
			var places_id_array = [];

			_.each(places_id, function(id_object){
				places_id_array.push(id_object._id);
			});
		}
		if(places_id){
			var courses_cursor = Courses.find({
				tag_id: subject_search,   
				day_of_week : {$in: day_selector},
				place_id : {$in: places_id_array}, 
				price : {$gt : price_min, $lt : price_max}, 
				starts : {$gt : schedule_min},
				ends : {$lt : schedule_max}},
				{sort: {price: 1}, limit: limit, fields: {description: 0, additional_information: 0}});
			var courses = courses_cursor.fetch();
			var courses_places_id = _.pluck(courses,'place_id');
			var places_cursor = Places.find({_id : {$in : courses_places_id}}, {fields: {description:0 }});
			return [courses_cursor, places_cursor];
		}
	}
);

Meteor.publish('place', function(place_id){
	return Places.find(place_id);
});

Meteor.publish('course', function(courseId){
	return Courses.find(courseId);
});

Meteor.publish('tags', function(){
	return Tags.find({}, {sort: {name: 1}});
}); 

Meteor.publish('owned_places', function(){
	return Places.find({user_id:this.userId});
})