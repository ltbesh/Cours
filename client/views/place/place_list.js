Template.place_list.helpers({
	places: function () {
	    var places =  get_searched_places(	
	    	Session.get('day_selector'), 
			Session.get('price_min'), 
			Session.get('price_max'), 
			Session.get('schedule_min'), 
			Session.get('schedule_max'),
			Session.get('subject_search'), 
			Session.get('geographical_search'), 
			Session.get('limit'));
	    return places[1];
	},
	places_ready: function(){
		return ! place_handle.loading();
	},
	all_places_loaded: function(){	
		return ! place_handle.loading() && places.find().count() < place_handle.loaded();
	}
});

Template.place_list.events({
	'click .load-more' : function(e){
		e.preventDefault();
		place_handle.loadNextPage();
	}
});