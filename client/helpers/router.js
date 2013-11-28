Meteor.Router.add({
    "/" : "home",
    "/search" : "place_search_page",
    "/place/:_id" : {
        to: "place_page", 
        and: function(id) {
            Session.set("current_place", {_id:id});
            var place = Places.findOne(id);
            if(Session.get("tag_selector")){
                var course = Courses.findOne({place_id : id, tag_id : Session.get("tag_selector")});
                Session.set("current_course", course);
            }
        }
    },
    "/edit/place/:_id": {
        to : "edit_place_form",
        and : function(id){
            if(id!=="new"){
                var place = Places.findOne(id);
                Session.set("current_place", place);
                Session.set('geographical_search', 
                    { 
                        address :place.address,
                        location: place.location
                });
            }
            else{
                Session.set("current_place", null);
            }
        }
    },
    "/edit/course/:_id":{
        to : "edit_course_form",
        and : function(id){
            Session.set("edit_course_pictures", []);
            if(id!=="new"){
                var course = Courses.findOne(id);
                Session.set("edit_course_pictures", course.pictures);
            }
            else{
                var user_id = Meteor.userId();
                var course = Courses.findOne({user_id: user_id, status:"adding"});
                if(! course)
                    course = Meteor.call("insert_base_course",{});
            }
            if(course){
                Session.set("edit_course", true);
                Session.set("current_course", course);
            }
            // FIX ME Add routing if course does not exist.
        }
    },
    "/user/:_id": {
        to: "user_page", 
        and: function(id) {Session.set("current_user", id);}
    },
    "/signin":"user_signin",
    "/signup":"user_signup",
    "/account":"user_edit",
    "*": "404"
});

Meteor.Router.filters({
    "login_required": function(page){
        if(Meteor.user()){
            return page;
        }
        else if (Meteor.loggingIn()){
            return "loading";
        }
        else
        {
            return "login";
        }
    },
    "place_required": function(page){
        var places = Places.find({user_id:Meteor.user()._id});
        if (places.count()>0){
            return page;
        }
        else{
            return "place_edit_form";
        }
    },
    "clear_alerts": function(page) {
        clear_alerts();
        return page; 
    }
});
Meteor.Router.beforeRouting = function(){
    Session.set("current_course", null); // course object
    Session.set("current_place", null); // place object
    Session.set("show_edit_time_slot", false);
    Session.set("edit_course", false);
    Session.set("edit_course_pictures", []); // Array of URL
}

Meteor.Router.filter("login_required", {only: ["course_edit_form", "place_edit_form"]});
Meteor.Router.filter("place_required", {only: "course_edit_form"});
Meteor.Router.filter('clear_alerts');