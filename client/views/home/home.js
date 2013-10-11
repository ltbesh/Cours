Template.home.events({
  'click #find-btn': function(e){
  	console.log('search');
  	Meteor.Router.to('/search');
  }
})