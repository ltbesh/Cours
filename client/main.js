Session.set('day_selector', [1,2,3,4,5,6,7]);
Session.set('price_min', 0);
Session.set('price_max', 200);
Session.set('schedule_min', 0);
Session.set('schedule_max', 1440);
Session.set('list_course_limit', 5);
Session.set('map', false);

Deps.autorun(function () {
	course_handle = Meteor.subscribeWithPagination(
		'courses', 
		Session.get('day_selector'), 
		Session.get("price_min"), 
		Session.get("price_max"), 
		Session.get("schedule_min"), 
		Session.get("schedule_max"),
		Session.get('list_course_limit'));
	Meteor.subscribe('place', Session.get('current_course_place'));
	Meteor.subscribe('course', Session.get('current_course'));
});
