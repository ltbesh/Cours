Template.course_pictures.rendered = function(){
        Galleria.loadTheme("/galleria_themes/classic/galleria.classic.min.js");
        Galleria.run("#galleria", {wait:true});
}

Template.course_pictures.helpers({
    pictures: function(){
        if(Session.get("edit_course_pictures").length>0){
            return Session.get("edit_course_pictures");
        }
        else if (Session.get("current_course")){
            return Session.get("current_course").pictures;      
        }

    },
});
