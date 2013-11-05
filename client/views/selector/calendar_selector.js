Template.calendar_selector.rendered = function(){
	if(Session.get('day_selector').length < 7){
		_.each(Session.get('day_selector'), function(day){
			$('input[value*='+ day + ']').prop('checked', true);
		});
	}
};

Template.calendar_selector.events({
	'click input.day_selector': function(){
		var day =[];
		$('input[name=day_selector]:checked').each(function(){
			day.push(Number($(this).val()));
		});
		Session.set("day_selector", (day.length>0 ) ? day : [0,1,2,3,4,5,6]);
	}
});