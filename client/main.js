Session.set('day_selector', [1,2,3,4,5,6,7]);
Session.set('price_min', 0);
Session.set('price_max', 200);
Session.set('schedule_min', 0);
Session.set('schedule_max', 1440);
Session.set('map', false);
Session.set('current_course', null);
Session.set('current_course_place', null);


Deps.autorun(function () {
	Meteor.subscribe('place', Session.get('current_course_place'));
	Meteor.subscribe('course', Session.get('current_course'));
	Meteor.subscribe('tags');
});


course_handle = Meteor.subscribeWithPagination(
	'courses', 
	function(){return Session.get('day_selector')}, 
	function(){return Session.get("price_min")}, 
	function(){return Session.get("price_max")}, 
	function(){return Session.get("schedule_min")}, 
	function(){return Session.get("schedule_max")},5);