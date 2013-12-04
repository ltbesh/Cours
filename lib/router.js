
Router.configure({ 
    layoutTemplate: "layout",
    waitOn : function(){
        return [ Meteor.subscribe("owned_places"), Meteor.subscribe("owned_courses")];
    },
});

Router.map(function(){ 
    this.route("home", {path: "/"});

    this.route("place_search_page", {path : "/search"});

    this.route("edit_place_form", {
        path : "/edit/place/:_id",
        data: function() { 
            return Places.findOne(this.params._id); 
        },
        action : function(){
            var place = Places.findOne(this.params._id);
            if(place)
            Session.set("geographical_search", {
                         address :place.address,
                         location: place.location
            });
            this.render();
        }
    });
    this.route("edit_course_form", {
        path : "/edit/course/:_id",
        before : function(){
            if(this.params._id ==="new"){
                var user_id = Meteor.userId();
                var course = Courses.findOne({user_id: user_id, status:"adding"});
                if(! course)
                    course = Meteor.call("insert_base_course",{});
            }
        },
        waitOn : function(){
            return Meteor.subscribe("current_course_time_slots", this.params._id);
        },
        action : function(){
            Session.set("edit_course", true);
            this.render();
        },
        data : function(){
            if(this.params._id ==="new"){
                var course =  Courses.findOne({status:"adding"});
            }
            else{
                var course = Courses.findOne(this.params._id);
                Session.set("edit_course_pictures", course.pictures);
            }
            Session.set("current_course", course);
            return course;
        }
    });

    this.route("place_page", {
        path : "/place/:_id",
        waitOn : function(){
            return Meteor.subscribe("place_detail", this.params._id);
        },
        data : function(){
            var place = Places.findOne(this.params._id);
            Session.set("current_place", place);
            return place;
        },
        action : function(){
            if(Session.get("tag_selector")){
                var course = Courses.findOne({place_id : this.params._id, tag_id : Session.get("tag_selector")});
                Session.set("current_course", course);
            }
            this.render();
        }
    });

    this.route("user_edit", {
        path : "account"
    });
    this.route("user_signin", {path : "signin"});
    this.route("user_signup", {path : "signup"});
    this.route("404", {path : "*"});


});

var require_login = function() { 
    if (! Meteor.user()) {
        this.render("accessDenied");
        this.stop(); 
    }
    else{
    }
}

var require_place = function(){
    var place = Places.findOne({user_id : Meteor.userId()});
    if(!place){
        Session.set("first_course", true);
        this.render("edit_place_form");
        this.stop();
    }
    else{
    }
}

Router.before(require_login, {only: ["user_edit", "edit_place_form", "edit_course_form"]});
Router.before(require_place, {only : ["edit_course_form"]});
Router.before(function(){
    clear_alerts();
    Session.set("current_place", null);
    Session.set("current_course", null);
    Session.set("edit_course_pictures",[]); // Array of URL used by course_pictures and edit_course_form, set in the router

});
