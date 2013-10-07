Template.course_list_item.helpers({
	subject: function(){
		return Tags.findOne(this.tag_id).name;
	}
})

Template.course_list_item.events({
	'click .detail' : function(e){
		Session.set('current_course_place', this.placeId);
	}
})
