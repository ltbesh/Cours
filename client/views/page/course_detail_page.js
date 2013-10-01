Template.course_detail_page.helpers({
	current_course: function(){
		return Courses.findOne(Session.get('current_course'));
	}
});