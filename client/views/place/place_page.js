Template.place_page.helpers({
    course: function(){
        if(Session.get("current_course"))
            return Session.get("current_course");
    },
});

Template.place_page.destroyed = function(){
    Session.set("current_place", null);
    Session.set("place_detail_information_active_tab", "photo_tab");
}

