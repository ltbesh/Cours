Template.course_item.helpers({
    valid_status:function(){
        return this.status!=="adding" || this.status ==="undefined";
    },
    subject: function(){
        var tag = Tags.findOne({_id : this.tag_id});
        return tag ? tag._id : "";
    },
    place: function(){
        var place = Places.findOne(this.place_id);
        if(place){
            return place.title;
        }
    }
});

Template.course_item.events({
    "click .delete-course": function(e){
        e.preventDefault();        
        if(confirm("Supprimer ce cours ?")){
            Meteor.call("remove_course", this._id);
        }
    },
    "click .edit-course": function(e){
        e.preventDefault();
        Router.go("edit_course_form", {_id : this._id});
    }
});
