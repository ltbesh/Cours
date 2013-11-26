Template.nav.rendered=function(){
  if(!Meteor.user()){
    $('.login-link-text').text("Sign Up/Sign In");
  }else{
    $('#login-buttons-logout').before('<button class="btn btn-default btn-block account-link">My Account</button>');
  }
};

Template.nav.events({
	"click .account-link" : function(){
		Meteor.Router.to("user_edit");
	},
    "click .add-course" : function(e){
        e.preventDefault();
        Meteor.Router.to("edit_course_form", "new");
    }

})
