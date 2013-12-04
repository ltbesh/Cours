Router.configure({ 
    layoutTemplate: "layout",
    waitOn : function(){
        return [ Meteor.subscribe("owned_places"), Meteor.subscribe("owned_courses")];
    },
});

Router.map(function(){ 
    this.route("home", {path: "/"});

    this.route("place_search_page", {
        path : "/search",
        before : function(){
            Session.set("search_page", true);
        },
        unload : function(){
            Session.set("search_page", false);
        }
    });

    this.route("edit_place_form", {
        path : "/edit/place/:_id",
        before: function(){
            Session.set("geographical_search", {address : null, location: null});
        },
        data: function() { 
            return Places.findOne(this.params._id); 
        }
    });

    this.route("edit_course_form", {
        path : "/edit/course/:_id",
        before : function(){
            // Set function when user clicks on the calendar and used for the tag selector
            Session.set("edit_course", true);
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
        },
        unload : function(){
            Session.set("edit_course", false);
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
}

Router.before(require_login, {only: ["user_edit", "edit_place_form", "edit_course_form"]});
Router.before(require_place, {only : ["edit_course_form"]});
Router.before(function(){
    clear_alerts();
    Session.set("show_modal", false); // Used to know where to display alerts
    Session.set("current_place", null);
    Session.set("current_course", null);
    Session.set("edit_course_pictures",[]); // Array of URL used by course_pictures and edit_course_form, set in the router

});
