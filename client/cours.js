Template.course_list.courses = function () {

	//console.log(Session.get("day_selector"));
    if(Session.get("day_selector") && Session.get("day_selector").length>0){
    	console.log('une selection');
    	console.log(Session.get("day_selector"));
    	return Courses.find({day_of_week : {$in: Session.get("day_selector")} }, {sort: {title: 1}});
	}
	else{
    	console.log('pas de selection');
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

