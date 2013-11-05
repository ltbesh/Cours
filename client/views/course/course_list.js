Template.course_list.helpers({
	courses: function () {
	    var courses =  get_searched_courses(	
	    	Session.get('day_selector'), 
			Session.get('price_min'), 
			Session.get('price_max'), 
			Session.get('schedule_min'), 
			Session.get('schedule_max'),
			Session.get('subject_search'), 
			Session.get('geographical_search'), 
			Session.get('limit'));
	    return courses[0];
	},
	courses_ready: function(){
		return ! course_handle.loading();
	},
	all_courses_loaded: function(){	
		return ! course_handle.loading() && Courses.find().count() < course_handle.loaded();
	}
});

Template.course_list.events({
	'click .load-more' : function(e){
		e.preventDefault();
		course_handle.loadNextPage();
	}
});