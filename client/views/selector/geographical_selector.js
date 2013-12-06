Template.geographical_selector.rendered = function(){
    var input = $("#geographical-search").get(0);
    var options = {componentRestrictions: {country: "fr"}};

    autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, "place_changed", function() {
        var g_place = autocomplete.getPlace();
        if(g_place){
            Session.set("geographical_search", {
                    address :g_place.formatted_address,
                    location: {
                        type : "Point", 
                        coordinates: [g_place.geometry.location.lng(), 
                                    g_place.geometry.location.lat()]
                    }
            });
        }
    });
}

Template.geographical_selector.helpers({
    address : function(){
        if(Session.get("geographical_search").address)
            return Session.get("geographical_search").address;
        else
            return this.address;
    }
});