Template.course_item.helpers({
	valid_status:function(){
		return this.status!=="adding";
	},
	subject: function(){
		return Tags.findOne(this.tag_id).title;
	}
})

Template.course_item.events({
	'click .detail' : function(e){
		Session.set('current_course_place', this.place_id);
	}
})
