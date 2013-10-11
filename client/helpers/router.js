Meteor.Router.add({
	'/' : 'home',
	'/search' : 'course_list_page',
	'/course/:_id' : {
		to: 'course_detail_page', 
		and: function(id) {Session.set('current_course', id);}
	},
	'/create/place': 'create_place',
	'/create/course': 'create_course'
});

Meteor.Router.filters({
	'login_required': function(page){
		if(Meteor.user()){
			return page;
		}
		else if (Meteor.loggingIn()){
			return 'loading';
		}
		else
		{
			return 'login';
		}
	},
	'place_required': function(page){
		var places = Places.find({user_id:Meteor.user()._id});
		if (places.count()>0){
			return page;
		}
		else{
			return 'create_place';
		}
	}
});

Meteor.Router.filter('login_required', {only: ['create_course', 'create_place']});
Meteor.Router.filter('place_required', {only: 'create_course'});