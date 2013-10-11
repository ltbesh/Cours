Template.course_list_page.helpers ({
	courses: function () {
    var courses =  Courses.find({});
    return courses;
	},
	courses_ready: function(){
		return ! course_handle.loading();
	},
	all_courses_loaded: function(){	
		return ! course_handle.loading() && Courses.find().count() < course_handle.loaded();
	}
});

Template.course_list_page.events({
	'click .load-more' : function(e){
		e.preventDefault();
		course_handle.loadNextPage();
	}
});