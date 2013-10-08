Template.photo_tab.helpers ({
	place: function () {
		var placeId = this.placeId;
    	return Places.findOne( { _id: String(placeId) } );
    },
});
