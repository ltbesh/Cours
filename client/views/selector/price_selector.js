Template.price_selector.rendered = function (){

	if (! $('#price_selector').data('uiSlider')) {
		$( "#price_selector" ).slider({
			range: true,
			min: 0,
			max: 200,
			values: [ 
				Session.get('price_min') ? Session.get('price_min') : 0,
				Session.get('price_max') ? Session.get('price_max') : 200],
		slide: function( event, ui ) {
			$( "#price_min" ).html(ui.values[ 0 ] + " € - ");
			$( "#price_max" ).html(ui.values[ 1 ] + " €");
		},
		stop: function(event, ui){
			Session.set("price_min", ui.values[ 0 ]);
			Session.set("price_max", ui.values[ 1 ]);
		}
		});
	}
	$( "#price_min" ).html($( "#price_selector" ).slider( "values", 0 ) + ' € - ');
	$( "#price_max" ).html($( "#price_selector" ).slider( "values", 1 ) + ' €');
};

	