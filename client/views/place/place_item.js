Template.place_item.helpers({
    not_search_page: function(){
        return !Session.get("search_page");
    }
});

Template.place_item.events({
    "click .detail-place" : function(e){
        e.preventDefault();
        var course_id = Courses.findOne({place_id : this._id, tag_id : Session.get("tag_selector")}, {fields: {_id : true}})._id;
        Router.go("place_page", {_id : this._id, course_id : course_id});
    },
    "click .delete-place": function(e){
        e.preventDefault();
        if(confirm("Supprimer ce lieu ? Cette action supprimera également tout les cours associés à ce lieu.")){
            Meteor.call("remove_place", this._id);
        }
    },
    "click .edit-place": function(e){
        e.preventDefault();
        Router.go("edit_place_form", {_id : this._id});
    }
});

