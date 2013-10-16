Template.place_creation_form.rendered = function(){
	$("#alert").hide();
	$(".alert .close").live("click", function(e) {
    	$(this).parent().hide();
	});
}

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
				$("#alert > h4").html(error.reason);
				$("#alert").show();
			}
			else{
				Meteor.Router.to("user_edit"); 
			}
		});
	}

})