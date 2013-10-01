Meteor.publish('courses', function(){
	return Courses.find();
});

Meteor.publish('places', function(){
	return Places.find();
});