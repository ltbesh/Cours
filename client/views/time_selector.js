Template.time_selector.rendered = function (){
	$( "#time_selector" ).slider({
		range: true,
		min: 0,
		max: 1440,
		values: [ 0, 1440 ],
	slide: function( event, ui ) {
		$( "#schedule" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
	},
	stop: function(event, ui){
		Session.set("schedule_min", ui.values[ 0 ]);
		Session.set("schedule_max", ui.values[ 1 ]);
	}
	});
	$( "#schedule" ).val( "$" + $( "#time_selector" ).slider( "values", 0 ) +
	" - $" + $( "#time_selector" ).slider( "values", 1 ) );
};