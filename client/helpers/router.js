Meteor.Router.add({
	'/' : 'home',
	'/search' : 'course_list_page',
	'/course/:_id' : {
		to: 'course_detail_page', 
		and: function(id) { Session.set('current_course', id); }
	}
});