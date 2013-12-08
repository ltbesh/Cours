Template.edit_place_form.helpers({
    current_place : function(){
        return Session.get("current_place") ? Session.get("current_place") : {};
    }
});

Template.edit_place_form.events({   
    "submit form": function(e){
        e.preventDefault();
        clear_alerts();
        var place ={
            _id: this._id,
            title: $("#input-title").val(),
            description: $("#input-description").val(), 
            location: Session.get("edit_place_address").location,
            address: Session.get("edit_place_address").address,
            postal_code : Session.get("edit_place_address").postal_code,
            locality : Session.get("edit_place_address").locality
        };
        upsert_place(place);
    }
});

