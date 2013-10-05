Template.course_detail.helpers ({
	place: function () {
		var placeId = this.placeId;
        console.log(this.placeId);
    	return Places.findOne( { _id: String(placeId) } );
    },

    photo_tab: function () {
    	return Session.equals("course_detail_information_active_tab", 'photo_tab');
    },

    info_tab: function () {
    	return Session.equals('course_detail_information_active_tab', 'info_tab');
    }

    
});