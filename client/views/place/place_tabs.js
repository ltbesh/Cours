Template.place_tabs.helpers ({
    photo_tab: function () {
    	return Session.equals("place_detail_information_active_tab", 'photo_tab');
    },

    info_tab: function () {
    	return Session.equals('place_detail_information_active_tab', 'info_tab');
    },
    price_tab: function () {
      return Session.equals('place_detail_information_active_tab', 'price_tab');
    },
    schedule_tab: function () {
      return Session.equals('place_detail_information_active_tab', 'schedule_tab');
    },
    active: function (tab_name) {
    	return Session.equals("place_detail_information_active_tab", tab_name) ? "active" : '';
    },
});

  Template.place_tabs.events({
    'click .tab': function (event) {
      Session.set("place_detail_information_active_tab", $(event.target).attr('id'));
    }
  });