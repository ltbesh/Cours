Template.calendar_selector.events({
	'click input.day_selector': function(){
		var day =[];
		$('input[name=day_selector]:checked').each(function(){
			day.push(Number($(this).val()));
		});
		Session.set("day_selector", (day.length>0 ) ? day : [1,2,3,4,5,6,7]);
	}
});