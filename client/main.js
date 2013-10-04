

Session.set('day_selector', [1,2,3,4,5,6,7]);

var price_min = (Session.get("price_min")) ? Session.get("price_min") : 0;
var price_max = (Session.get("price_max")) ? Session.get("price_max") : 200;
var schedule_min = (Session.get("schedule_min")) ? Session.get("schedule_min") : 0;
var schedule_max = (Session.get("schedule_max")) ? Session.get("schedule_max") : 1440;

course_handle = Meteor.subscribeWithPagination('courses', Session.get('day_selector'), price_min, price_max, schedule_min, schedule_max,10);
Meteor.subscribe('places');

