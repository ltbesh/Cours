Template.course_item.helpers({
    valid_status:function(){
        return this.status!=="adding" || this.status ==="undefined";
    },
    subject: function(){
        var tag = Tags.findOne({_id : this.tag_id});
        return tag ? tag._id : "";
    },
    place: function(){
    	return Places.findOne(this.place_id).title;
    }
});

Template.user_edit.events({
    "click .delete-course": function(e){
        e.preventDefault();        
        if(confirm("Supprimer ce cours ?")){
            var course_id = e.target.id;
            Courses.remove(course_id);
        }
    },
    "click .edit-course": function(e){
        e.preventDefault();
        var course_id = e.target.id;
        Meteor.Router.to("edit_course_form", course_id);
    }
});
