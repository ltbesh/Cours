Template.price_selector.rendered = function (){
	$( "#price_selector" ).slider({
		range: true,
		min: 0,
		max: 200,
		values: [ 0, 200 ],
	slide: function( event, ui ) {
		$( "#amount" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
	},
	stop: function(event, ui){
		Session.set("price_min", ui.values[ 0 ]);
		Session.set("price_max", ui.values[ 1 ]);
	}
	});
	$( "#amount" ).val( "$" + $( "#price_selector" ).slider( "values", 0 ) +
	" - $" + $( "#price_selector" ).slider( "values", 1 ) );
};