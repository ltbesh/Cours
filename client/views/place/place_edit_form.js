Template.place_edit_form.events({   
    "submit form": function(e){
        e.preventDefault();
        var place ={
	        _id: Session.get("current_place") ? Session.get("current_place") : null,
	        title: $("#input-title").val(),
	        description: $("#input-description").val(), 
	        location: Session.get("geographical_search").location,
	        address: Session.get("geographical_search").address
    	};
        upsert_place(place);
    }
});