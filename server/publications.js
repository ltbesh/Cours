Meteor.publish('courses', function(daySelector, priceMin, priceMax, scheduleMin, scheduleMax,limit){
 	 var coursesCursor = Courses.find({   
 		day_of_week : {$in: daySelector}, 
    	price : {$gt : priceMin, $lt : priceMax}, 
    	starts : {$gt : scheduleMin},
   		ends : {$lt : scheduleMax}},
   		{sort: {price: 1}, limit: limit, fields: {description: 0, additional_information: 0}});

 	 var courses = coursesCursor.fetch();
 	 var coursesPlacesIds = _.pluck(courses,'placeId');
 	 var placesCursor = Places.find({_id : {$in : coursesPlacesIds}}, {fields: {description:0 }});

 	 return [coursesCursor, placesCursor];
});

Meteor.publish('place', function(placeId){
	return Places.find(placeId);
});


Meteor.publish('course', function(courseId){
	return Courses.find(courseId);
});