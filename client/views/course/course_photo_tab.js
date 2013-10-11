Template.photo_tab.helpers ({
	place: function () {
		var place = Places.findOne({_id: this.place_id});
		return place;
    }
});
