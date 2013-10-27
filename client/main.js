// Selector for courses search
Session.set('day_selector', [1,2,3,4,5,6,7]);
Session.set('price_min', 0);
Session.set('price_max', 200);
Session.set('schedule_min', 0);
Session.set('schedule_max', 1440);
Session.set('subject_search', null);
Session.set('geographical_search', {address : null, location: null});

DEFAULT_COORDINATES = [2.3462677001953125,48.85432452980058];
// Id of the place and course that the user is currently looking at
Session.set('current_course', null);
Session.set('current_place', null);

// Set the default active tab for course detail
Session.set("place_detail_information_active_tab", 'photo_tab');

// Used to draw the map
Session.set('map', false);

Deps.autorun(function () {
	Meteor.subscribe('current_place', Session.get('current_place'));
});
Deps.autorun(function () {
	Meteor.subscribe('current_course', Session.get('current_course'));
});

// Suscribe to the places the user owns
//Meteor.subscribe('owned_places');
//Meteor.subscribe('owned_courses');
Meteor.subscribe('tags');

// Subscribe to the courses and places that match the user criterion
place_handle = Meteor.subscribeWithPagination(
	'searched_places', 
	function(){return Session.get('day_selector')}, 
	function(){return Session.get("price_min")}, 
	function(){return Session.get("price_max")}, 
	function(){return Session.get("schedule_min")}, 
	function(){return Session.get("schedule_max")},
	function(){return Session.get('subject_search')},
	function(){return Session.get('geographical_search').location},
	5);
