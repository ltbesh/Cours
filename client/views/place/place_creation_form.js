Template.place_creation_form.events({   
    "submit form": function(e){
        e.preventDefault();
        upsert_place();
    }
});