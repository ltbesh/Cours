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
	"click .delete-place": function(e){
		e.preventDefault();
		
		if(confirm("Supprimer ce lieu ?")){
			var place_id = e.target.id
			Places.remove(place_id);
		}
	}

});