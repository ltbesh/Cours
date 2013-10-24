Template.place_list.helpers({
	places: function () {
	    var places_cursor =  get_searched_places(	
	    	Session.get('day_selector'), 
			Session.get('price_min'), 
			Session.get('price_max'), 
			Session.get('schedule_min'), 
			Session.get('schedule_max'),
			Session.get('subject_search'), 
			Session.get('geographical_search').location, 
			5);
	    if (places_cursor)
	    	var places = places_cursor[0];
	    return places;
	},
	places_ready: function(){
		return ! place_handle.loading();
	},
	all_places_loaded: function(){	
		return ! place_handle.loading() && Places.find().count() < place_handle.loaded();
	}
});

Template.place_list.events({
	'click .load-more' : function(e){
		e.preventDefault();
		place_handle.loadNextPage();
	}
});