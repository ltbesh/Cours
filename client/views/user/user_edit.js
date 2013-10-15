Template.user_edit.helpers({
	user: function(){
		return Meteor.user();
	},
	places: function(){
		return get_owned_places(Meteor.userId());
	},
	courses: function(){
		return get_owned_courses(Meteor.userId());
	}
})