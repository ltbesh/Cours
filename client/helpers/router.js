Meteor.Router.add({
	"/" : "home",
	"/search" : "place_search_page",
	"/course/:_id" : {
		to: "course_page", 
		and: function(id) {Session.set("current_course", id);}
	},
	"/create/place": "place_creation_form",
	"/create/course": "course_creation_form",
	"/user/:_id": {
		to: "user_page", 
		and: function(id) {Session.set("current_user", id);}
	},
	'/signin':'user_signin',
    '/signup':'user_signup',
    '/account':'user_edit',
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
	}
});

Meteor.Router.filter("login_required", {only: ["course_creation_form", "place_creation_form"]});
Meteor.Router.filter("place_required", {only: "course_creation_form"});