Template.course_detail.helpers ({
	place: function () {
		var location_id = this.location_id;
    	return Places.findOne( { _id: String(location_id) } );
    },

    photo_tab: function () {
    	return Session.equals("course_detail_information_active_tab", 'photo_tab');
    },

    info_tab: function () {
    	return Session.equals('course_detail_information_active_tab', 'info_tab');
    }

    
});