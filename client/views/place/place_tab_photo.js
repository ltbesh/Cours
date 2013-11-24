Template.place_tab_photo.helpers ({
    place: function () {
        return Places.findOne(Session.get("current_place"));
    },
    pictures: function(){
        var course =  Courses.findOne({_id : Session.get("current_course")}, {fields : {pictures: 1}});        
        var pictures = course.pictures;
        console.log(pictures);
        return pictures
    }
});

Template.place_tab_photo.rendered = function(){ 
    Galleria.loadTheme('/galleria_themes/classic/galleria.classic.min.js');
    Galleria.run('#galleria');
}
