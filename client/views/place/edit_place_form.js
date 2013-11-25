Template.edit_place_form.rendered = function(){
    if(Session.get("current_place"))
        Session.set("edit_place", true);
}

Template.edit_place_form.helpers({
    current_place : function(){
        return Session.get("current_place") ? Session.get("current_place") : {};
    }
});

Template.edit_place_form.events({   
    "submit form": function(e){
        e.preventDefault();
        var place ={
	        _id: Session.get("current_place") ? Session.get("current_place")._id : null,
	        title: $("#input-title").val(),
	        description: $("#input-description").val(), 
	        location: Session.get("geographical_search").location,
	        address: Session.get("geographical_search").address
    	};
        upsert_place(place);
    }
});

Template.edit_place_form.destroyed = function(){
    Session.set("edit_place", false);
    Session.set("geographical_search", {address : null, location: null});
}
