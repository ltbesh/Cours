Template.course_list.courses = function () 
{

	var day_selector = (Session.get("day_selector") && Session.get("day_selector").length>0) ? Session.get("day_selector") : [1,2,3,4,5,6,7];
	var price_min = (Session.get("price_min")) ? Session.get("price_min") : 0;
	var price_max = (Session.get("price_max")) ? Session.get("price_max") : 200;
	console.log(price_min);
	console.log(price_max);
    return Courses.find(
    	{ day_of_week : {$in: day_selector}, price : {$gt : price_min, $lt : price_max}}, 
    	{ sort: {title : 1}});
};

Template.calendar_selector.events({
	'click input.day_selector': function(){
		var day =[];
		$('input[name=day_selector]:checked').each(function(){
			day.push(Number($(this).val()));
		});
		Session.set("day_selector", day);
	}
});


Template.price_selector.events({
	'stop #price_selector': function(){
		Session.set("price_min", ui.values[ 0 ]);
		Session.set("price_max", ui.values[ 1 ]);
	}
})

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
	//Session.set("price_min", slider( "values", 0 ));
	//Session.set("price_max", slider( "values", 1 ));
};


