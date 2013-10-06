Template.course_list_item.events({
	'click .detail' : function(e){
		Session.set('current_course_location', this.placeId);
	}
})
