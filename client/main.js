// Selector for courses search
Session.set("day_selector", [0,1,2,3,4,5,6]);
Session.set("price_min", 0);
Session.set("price_max", 200);
Session.set("schedule_min", 0);
Session.set("schedule_max", 1440);
Session.set("tag_selector", null); // tag object
Session.set("geographical_search", {address : null, location: null});

// Set the default active tab for course detail
Session.set("place_detail_information_active_tab", "photo_tab");

// User preference for calendar view
Session.set("user_pref_calendar_view", "agendaWeek");

// Used to draw the map
Session.set("map", false);

// Set filepicker key
Meteor.startup( function() {
    filepicker.setKey("AbMQbak12TuefvS5Uz1mVz");
});

// Datepicker used in timeslot modal
$.datepicker.setDefaults($.datepicker.regional[ "fr" ]);

// Used to know where to display errors
Handlebars.registerHelper("show_modal", function() {
  return Session.get("show_modal");
});

// Suscribe to all the tags
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
    function(){return Session.get("geographical_search")},
    5);
});