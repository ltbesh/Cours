Template.course_detail_information.helpers ({
    photo_tab: function () {
    	return Session.equals("course_detail_information_active_tab", 'photo_tab');
    },

    info_tab: function () {
    	return Session.equals('course_detail_information_active_tab', 'info_tab');
    },

    active: function (tab_name) {
    	return Session.equals("course_detail_information_active_tab", tab_name) ? "active" : '';
    },
});

  Template.course_detail_information.events({
    'click .tab': function (event) {
      Session.set("course_detail_information_active_tab", $(event.target).attr('id'));
    }
  });