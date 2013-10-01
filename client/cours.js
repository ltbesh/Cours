Template.course_list.courses = function () {
	//console.log(Session.get("day_selector"));
    if(Session.get("day_selector") && Session.get("day_selector").length>0){
    	return Courses.find({day_of_week : {$in: Session.get("day_selector")} }, {sort: {title: 1}});
	}
	else{
		return Courses.find({}, {sort: {title: 1}});
	}
};

Template.calendar_selector.events({
	'click input.day_selector': function(){
		var day =[];
		$('input[name=day_selector]:checked').each(function(){
			day.push(Number($(this).val()));
			console.log(Number($(this).val()));
		});
		Session.set("day_selector", day);
	}
});

Template.price_selector.rendered = function (){
	$( "#price_selector" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
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
	Session.set("price_min", slider( "values", 0 );
	Session.set("price_max", slider( "values", 1 );
};


Template.time_selector.rendered = function (){
	$( "#time_selector" ).slider({
		range: true,
		min: 0,
		max: 1440,
		values: [ 75, 300 ],
	slide: function( event, ui ) {
		$( "#schedule" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	}
	});

	$( "#schedule" ).val( "$" + $( "#time_selector" ).slider( "values", 0 ) +
	" - $" + $( "#time_selector" ).slider( "values", 1 ) );
};

