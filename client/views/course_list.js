Template.course_list.helpers ({
	courses: function () {
    var courses =  Courses.find({});
    return courses;
	},
	courses_ready: function(){
		return ! course_handle.loading();
	},
	all_courses_loaded: function(){
		var day_selector = (Session.get("day_selector") && Session.get("day_selector").length>0) ? Session.get("day_selector") : [1,2,3,4,5,6,7];
		var price_min = (Session.get("price_min")) ? Session.get("price_min") : 0;
		var price_max = (Session.get("price_max")) ? Session.get("price_max") : 200;
		var schedule_min = (Session.get("schedule_min")) ? Session.get("schedule_min") : 0;
		var schedule_max = (Session.get("schedule_max")) ? Session.get("schedule_max") : 1440;
		
		return ! course_handle.loading() && Courses.find({}).count() < course_handle.loaded();
	}
});

Template.course_list.events({
	'click .load-more' : function(e){
		e.preventDefault();
		course_handle.loadNextPage();
	}
})