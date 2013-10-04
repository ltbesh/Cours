Template.calendar_selector.events({
	'click input.day_selector': function(){
		var day =[];
		$('input[name=day_selector]:checked').each(function(){
			day.push(Number($(this).val()));
		});
		Session.set("day_selector", day);
	}
});