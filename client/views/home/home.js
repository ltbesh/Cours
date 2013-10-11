Template.home.events({
  'click #find-btn': function(e){
  	Meteor.Router.to('/search');
  }
})