Meteor.publish('courses', function(day_selector, price_min, price_max, schedule_min, schedule_max,limit){
 	return Courses.find({   
 		day_of_week : {$in: day_selector}, 
    	price : {$gt : price_min, $lt : price_max}, 
    	starts : {$gt : schedule_min},
   		ends : {$lt : schedule_max}},
   		{sort: {price: -1}, limit: limit});
});

Meteor.publish('places', function(){
	return Places.find();
});

