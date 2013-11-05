Template.place_tab_photo.helpers ({
	place: function () {
		return Places.findOne(Session.get("current_place"));
    },
    images: function(){
    	var course =  Courses.find({_id : Session.get("current_course")}, {fields : {images: 1}}).fetch()[0];
        
    	var images = course.images;
    	return images
    }
});

Template.place_tab_photo.rendered = function(){	
	Galleria.loadTheme('/galleria_themes/classic/galleria.classic.min.js');
    Galleria.run('#galleria');
}
