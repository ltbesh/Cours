
Router.configure({ 
    layoutTemplate: "layout"
});

Router.map(function(){ 
    this.route("home", {path: "/"});

    this.route("place_search_page", {path : "search"});
    this.route("edit_place_form", {
    	path : "/edit/place/:_id",
    	waitOn : function(){
    		return Meteor.subscribe('edit_place', this.params._id);
    	},
    	data: function() { 
    		return Places.findOne(this.params._id); 
    	},
    	action : function(){
    		Session.set("edit_place", true);
    		var place = Places.findOne(this.params._id);
    		if(place)
    		Session.set("geographical_search", { 
                         address :place.address,
                         location: place.location
            });
    		this.render();
    	}
    });
    this.route("user_edit", {path : "account"});
    this.route("user_signin", {path : "signin"});
    this.route("user_signup", {path : "signup"});
    this.route("404", {path : "*"});


});

//     "/edit/place/:_id": {
//         to : "edit_place_form",
//         and : function(id){
//             if(id!=="new"){
//                 var place = Places.findOne(id);
//                 Session.set("current_place", place);
//                 Session.set('geographical_search', 
//                     { 
//                         address :place.address,
//                         location: place.location
//                 });
//             }
//             else{
//                 Session.set("current_place", null);
//             }
//         }
//     },






// Meteor.Router.add({
//     "/place/:_id" : {
//         to: "place_page", 
//         and: function(id) {
//             Session.set("current_place", {_id:id});
//             var place = Places.findOne(id);
//             if(Session.get("tag_selector")){
//                 var course = Courses.findOne({place_id : id, tag_id : Session.get("tag_selector")});
//                 Session.set("current_course", course);
//             }
//         }
//     },

//     "/edit/course/:_id":{
//         to : "edit_course_form",
//         and : function(id){
//             if(id!=="new"){
//                 var course = Courses.findOne(id);
//                 Session.set("edit_course_pictures", course.pictures);
//             }
//             else{
//                 var user_id = Meteor.userId();
//                 var course = Courses.findOne({user_id: user_id, status:"adding"});
//                 if(! course)
//                     course = Meteor.call("insert_base_course",{});
//             }
//             if(course){
//                 Session.set("edit_course", true);
//                 Session.set("current_course", course);
//             }
//             // FIX ME Add routing if course does not exist.
//         }
//     },
//     "/user/:_id": {
//         to: "user_page", 
//         and: function(id) {Session.set("current_user", id);}
//     },

// });

// Meteor.Router.filters({
//     "login_required": function(page){
//         if(Meteor.user()){
//             return page;
//         }
//         else if (Meteor.loggingIn()){
//             return "loading";
//         }
//         else
//         {
//             return "login";
//         }
//     },
//     "place_required": function(page){
//         var places = Places.find({user_id:Meteor.user()._id});
//         if (places.count()>0){
//             return page;
//         }
//         else{
//             return "edit_place_form";
//         }
//     },
//     "clear_alerts": function(page) {
//         clear_alerts();
//         return page; 
//     }
// });
// Meteor.Router.beforeRouting = function(){
//     Session.set("current_course", null); // course object
//     Session.set("current_place", null); // place object
//     Session.set("show_edit_time_slot", false);
//     Session.set("edit_course", false);
//     Session.set("edit_course_pictures", []); // Array of URL
// }

// Meteor.Router.filter("login_required", {only: ["edit_course_form", "edit_place_form", "user_edit"]});
// Meteor.Router.filter("place_required", {only: "edit_course_form"});
// Meteor.Router.filter('clear_alerts');