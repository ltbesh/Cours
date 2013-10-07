Template.course_detail_information.helpers ({


    active: function (tab_name) {
    	return Session.equals("course_detail_information_active_tab", tab_name) ? "active" : '';
    },
});

  Template.course_detail_information.events({
    'click': function (event) {
      Session.set("course_detail_information_active_tab", $(event.target).attr('id'));
    }
  });