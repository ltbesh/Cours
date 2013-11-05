Template.place_creation_form.events({
    
    "submit form": function(e){
        e.preventDefault();
        console.log("Session : " + Session.get("geographical_search").address);

        var place ={
            title: $(e.target).find("#input-title").val(),
            description: $(e.target).find("#input-description").val(), 
            location: Session.get("geographical_search").location,
            address: Session.get("geographical_search").address
        };
        Meteor.call("insert_place", place, function(error, course_id){
            if(error){
                insert_alert(error.reason, "error");
            }
            else{
                insert_alert("Votre cours à bien été ajouté", "success");
                Meteor.Router.to("user_edit"); 
            }
        });
    }

})