Template.place_tab_photo.helpers ({
    place: function () {
        return Places.findOne(Session.get("current_place"));
    }
});
