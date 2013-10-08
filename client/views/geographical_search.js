Template.geographical_search.rendered = function(){
	var input = $('#geographical-search').get(0);
	var options = {componentRestrictions: {country: 'fr'}};

	autocomplete = new google.maps.places.Autocomplete(input, options);

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		Session.set('geographical_search', {type : 'Point', coordinates: [autocomplete.getPlace().geometry.location.lng(), 
																		  autocomplete.getPlace().geometry.location.lat()]});

	});
}