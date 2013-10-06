Template.course_detail_page.helpers({
	current_course: function(){
		return Courses.findOne(Session.get('current_course'));
	}
});

Template.course_detail_page.destroyed = function(){
	Session.set('current_course', null);
	Session.set('current_course_place', null);
}