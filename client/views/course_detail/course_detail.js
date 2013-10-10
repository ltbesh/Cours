Template.course_detail.helpers ({
	place: function () {
		var place_id = this.place_id;
    	return Places.findOne( { _id: String(place_id) } );
    },

    photo_tab: function () {
    	return Session.equals("course_detail_information_active_tab", 'photo_tab');
    },

    info_tab: function () {
    	return Session.equals('course_detail_information_active_tab', 'info_tab');
    },
    subject: function(){
        return Tags.find(this.tag_id).fetch()[0].title;
    }
});

Template.course_detail.destroyed= function(){
    Session.set('current_course', null);
    Session.set('current_course_place', null);
}

