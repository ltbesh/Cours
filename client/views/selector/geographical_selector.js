Template.geographical_selector.rendered = function(){
    var input = $("#geographical-search").get(0);
    var options = {types: ["geocode"],
                    componentRestrictions: {country: "fr"}
                };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addListener(autocomplete, "place_changed", function() {
        var g_place = autocomplete.getPlace();
        var locality = "";
        var postal_code = "";
        // Find the postal code and locality (city of the current search)
        if(g_place){
            for (var i = g_place.address_components.length - 1; i >=0; i--){
                var current_object = g_place.address_components[i];
                if(_.contains(current_object.types,"postal_code")){
                    postal_code = current_object.long_name;
                }
                else if(_.contains(current_object.types,"locality")){
                    locality = current_object.long_name;
                }
            }
            if(g_place){
                if(Session.get("search_page")){
                    Session.set("geographical_search", {
                            address :g_place.formatted_address,
                            location: {
                                type : "Point", 
                                coordinates: [g_place.geometry.location.lng(), 
                                            g_place.geometry.location.lat()]
                            },
                            locality : locality,
                            postal_code : postal_code,
                            types : g_place.types
                    });
                }
                else{
                    Session.set("edit_place_address", {
                            address :g_place.formatted_address,
                            location: {
                                type : "Point", 
                                coordinates: [g_place.geometry.location.lng(), 
                                            g_place.geometry.location.lat()]
                            },
                            locality : locality,
                            postal_code : postal_code,
                            types : g_place.types
                    });                
                }
            }
        }
    });
}

Template.geographical_selector.helpers({
    address : function(){
        if(Session.get("search_page") && Session.get("geographical_search").address)
            return Session.get("geographical_search").address;
        else {
            return this.address;
        }
    }
});