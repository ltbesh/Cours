    Meteor.Router.add({
    "/" : "home",
    "/search" : "place_search_page",
    "/place/:_id" : {
        to: "place_page", 
        and: function(id) {
            Session.set("current_place", id);
            if(Session.get("subject_search")){
                var course = Courses.findOne({place_id : id, tag_id : Session.get("subject_search")});
                Session.set("current_course", course._id);
            }
        }
    },
    "/edit/place": "place_edit_form",
    "/update/place:_id": {
        to: "place_update_form",
        and: function(id){
            var place = Places.find(id).fetch()[0];
            Session.set("current_place", id);

            Session.set('geographical_search', 
                { 
                    address :place.address,
                    location: place.location
                });
        }
    },
    "/edit/course": "course_edit_form",
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
            return "place_creation_form";
        }
    },
    "clear_alerts": function(page) {
        clear_alerts();
        return page; 
    }
});

Meteor.Router.filter("login_required", {only: ["course_creation_form", "place_creation_form"]});
Meteor.Router.filter("place_required", {only: "course_creation_form"});
Meteor.Router.filter('clear_alerts');