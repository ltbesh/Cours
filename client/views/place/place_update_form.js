Template.place_update_form.rendered = function(){
	Session.set("place_update_page", true);
}

Template.place_update_form.events({   
    "submit form": function(e){
        e.preventDefault();
        upsert_place();
    }
});

Template.place_update_form.helpers({
	current_place : function(){
		return Places.find(Session.get("current_place")).fetch()[0];
	}
});

Template.place_update_form.destroyed = function(){
	Session.set("place_update_page", false);
}