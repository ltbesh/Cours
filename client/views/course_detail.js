Template.course_detail.helpers ({
	place: function () {
		var location_id = this.location_id;
    	return Places.findOne( { _id: String(location_id) } );
    }
});