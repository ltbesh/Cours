Template.course_tab_photo.helpers ({
	place: function () {
		var place = Places.findOne({_id: this.place_id});
		return place;
    }
});
