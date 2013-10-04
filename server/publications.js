Meteor.publish('courses', function(limit){
 	return Courses.find({},{sort: {price: -1}, limit: limit});
});

Meteor.publish('places', function(){
	return Places.find();
});