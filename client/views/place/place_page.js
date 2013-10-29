Template.place_page.helpers({
	current_place: function(){
		return place =  Places.findOne(Session.get('current_place'));
	},
    price : function(){
    	if(Session.get("current_course"))
    		return Courses.findOne(Session.get("current_course")).price;
    }
});

Template.place_page.destroyed = function(){
	Session.set('current_place', null);
}

