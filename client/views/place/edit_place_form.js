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
