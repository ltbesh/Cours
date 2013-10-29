Template.place_tab_photo.helpers ({
	place: function () {
		var place = Places.findOne({_id: this.place_id});
		return place;
    },
    images: function(){
    	var place =  Places.find({_id : Session.get("current_place")}, {fields : {images: 1}}).fetch()[0];
    	var images = place.images;
    	images = _.map(images, function(image){ return Session.get("current_place") + "/" + image;});
    	return images
    }
});

Template.place_tab_photo.rendered = function(){	
	Galleria.loadTheme('/galleria_themes/classic/galleria.classic.min.js');
    Galleria.run('#galleria');
}
