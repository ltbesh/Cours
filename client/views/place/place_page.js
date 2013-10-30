Template.place_page.helpers({
    place: function(){
        return place =  Places.findOne(Session.get('current_place'));
    },
    course: function(){
        if(Session.get("current_course"))
            return Courses.findOne(Session.get("current_course"));
    },
});
Template.place_page.destroyed = function(){
    Session.set('current_place', null);
}

