// Selector for courses search
Session.set("day_selector", [0,1,2,3,4,5,6]);
Session.set("price_min", 0);
Session.set("price_max", 200);
Session.set("schedule_min", 0);
Session.set("schedule_max", 1440);
Session.set("subject_search", null);
Session.set("geographical_search", {address : null, location: null});
Session.set("search_page", false);
// Id of the place and course that the user is currently looking at
Session.set("current_course", null);
Session.set("current_place", null);

// Set the default active tab for course detail
Session.set("place_detail_information_active_tab", "photo_tab");

Session.set("create_course_pictures",[]);

// Used to draw the map
Session.set("map", false);

Meteor.startup( function() {
    filepicker.setKey("AbMQbak12TuefvS5Uz1mVz");
});

Deps.autorun(function () {
    Meteor.subscribe("current_place", Session.get("current_place"));
});

Deps.autorun(function () {
    Meteor.subscribe("current_course_time_slots", Session.get("current_course"));
});


// Suscribe to the places the user owns
Meteor.subscribe("owned_places");
Meteor.subscribe("owned_courses");
Meteor.subscribe("tags");

// Subscribe to the courses and places that match the user criterion
place_handle = Meteor.subscribeWithPagination(
    "searched_places", 
    function(){return Session.get("day_selector")}, 
    function(){return Session.get("price_min")}, 
    function(){return Session.get("price_max")}, 
    function(){return Session.get("schedule_min")}, 
    function(){return Session.get("schedule_max")},
    function(){return Session.get("subject_search")},
    function(){return Session.get("geographical_search").location},
    5);
