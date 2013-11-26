Template.user_edit.helpers({
    user: function(){
        return Meteor.user();
    },
    places: function(){
        return get_owned_places(Meteor.userId());
    },
    courses: function(){
        return get_owned_courses(Meteor.userId());
    }
});

Template.user_edit.events({
    "click .add-place" : function(e){
        e.preventDefault();
        Meteor.Router.to("edit_place_form", "new");
    },
    "click .add-course" : function(e){
        e.preventDefault();
        Meteor.Router.to("edit_course_form", "new");
    }
});
