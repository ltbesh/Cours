Template.nav.rendered =     function(){
    if(!Meteor.user()){
        $(".login-link-text").text("Sign Up/Sign In");
    }else{
        $("#login-buttons-logout").before("<button class="btn btn-default btn-block account-link">My Account</button>");
    }
};

Template.nav.events({
    "click .account-link" : function(e){
        e.preventDefault();
        Router.go("user_edit");
    },
    "click .add-course" : function(e){
        e.preventDefault();
        Router.go("edit_course_form", "new");
    }

})
