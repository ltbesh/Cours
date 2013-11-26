Template.nav.rendered=function(){
  if(!Meteor.user()){
    $('.login-link-text').text("Sign Up/Sign In");
  }else{
    $('#login-buttons-logout').before('<a class="account-link button btn">My Account</a>');
  }
};

Template.nav.events({
	"click .account-link" : function(){
		Meteor.Router.to("user_edit");
	}

})
