
// Validated Sessions : 


// Selector for courses search
Session.set("day_selector", [0,1,2,3,4,5,6]);
Session.set("price_min", 0);
Session.set("price_max", 200);
Session.set("schedule_min", 0);
Session.set("schedule_max", 1440);
Session.set("tag_selector", null); // tag object
Session.set("geographical_search", {address : null, location: null});
Session.set("search_page", false);

// Set the default active tab for course detail
Session.set("place_detail_information_active_tab", "photo_tab");

Session.set("show_create_time_slot", false);

// Set the geographical selector with the place location if user edits a place
Session.set("edit_place", false); // Boolean

// Set function when user clicks on the calendar
Session.set("edit_course", false) // Boolean

// User preference for calendar view
Session.set("user_pref_calendar_view", "agendaWeek");
// Used to draw the map
Session.set("map", false);

$.datepicker.setDefaults($.datepicker.regional[ "fr" ]);
Session.set("show_modal", false);

Meteor.startup( function() {
    filepicker.setKey("AbMQbak12TuefvS5Uz1mVz");
});

Handlebars.registerHelper("show_modal", function() {
  return Session.get("show_modal");
});


// Subscription
Deps.autorun(function () {
    if(Session.get("current_place"))
        Meteor.subscribe("current_place", Session.get("current_place")._id);
});

Deps.autorun(function () {
    if(Session.get("current_course"))
        Meteor.subscribe("current_course_time_slots", Session.get("current_course")._id);
});

// Suscribe to the places the user owns
Meteor.subscribe("tags");
    
Deps.autorun(function(){
// Subscribe to the courses and places that match the user criterion
place_handle = Meteor.subscribeWithPagination(
    "searched_places", 
    function(){return Session.get("day_selector")}, 
    function(){return Session.get("price_min")}, 
    function(){return Session.get("price_max")}, 
    function(){return Session.get("schedule_min")}, 
    function(){return Session.get("schedule_max")},
    function(){return Session.get("tag_selector")},
    function(){return Session.get("geographical_search").location},
    5);
});