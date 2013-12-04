Template.geographical_selector.rendered = function(){
    var input = $("#geographical-search").get(0);
    var options = {componentRestrictions: {country: "fr"}};

    autocomplete = new google.maps.places.Autocomplete(input, options);
    Deps.autorun(function(){

        //Used for geographical search and place update
        if(Session.get("geographical_search").address && (Session.get("search_page")||Session.get("edit_place")))
            $("#geographical-search").attr("value", Session.get("geographical_search").address);

        google.maps.event.addListener(autocomplete, "place_changed", function() {
            Session.set("geographical_search", { 
                    address :autocomplete.getPlace().formatted_address,
                    location: {
                        type : "Point", 
                        coordinates: [autocomplete.getPlace().geometry.location.lng(), 
                                    autocomplete.getPlace().geometry.location.lat()]
                    }
            });
        });
    });
}