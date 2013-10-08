Template.geographical_search.rendered = function(){
	var input = $('#geographical-search').get(0);
	var options = {componentRestrictions: {country: 'fr'}
};

	autocomplete = new google.maps.places.Autocomplete(input, options);
}