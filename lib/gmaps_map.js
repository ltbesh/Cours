Course_map = function(element){
    this.markers = [];
    this.lat_lngs = [];
    this.marker_data = [];
    this.default_coordinates = [2.3462677001953125,48.85432452980058];
    this.default_zoom = 12;
    this.max_zoom = 15;
    this.map = new GMaps({
            el: element,
            lat: this.default_coordinates[1],
            lng: this.default_coordinates[0],
            zoomControl : true,
            zoomControlOpt: {
                style : "MEDIUM",
                position: "TOP_LEFT"
            },
            zoom: this.default_zoom,
            panControl : false,
            streetViewControl : true,
            mapTypeControl: false,
            overviewMapControl: false
        });
}

Course_map.prototype = {
    constructor : Course_map,

    marker_exists: function(key, val){
        var marker_exist = false
        _.each(this.marker_data,function(stored_marker){
            if(stored_marker[key] == val){
                marker_exist = true;
            }
        });
        return marker_exist;
    },

    add_marker: function(place){
        var self = this;
        if(!self.marker_exists("id", place._id) && typeof(place.location.coordinates[1] !== undefined) && typeof(place.location.coordinates[0] !== undefined)){
            var marker = {
                id: place._id,
                lat: place.location.coordinates[1],
                lng: place.location.coordinates[0],
                title: place.title
            };
            var g_lat_lng = new google.maps.LatLng(marker.lat, marker.lng);
            var g_marker = self.draw_marker(marker);
            self.lat_lngs.push(g_lat_lng);
            self.markers.push(g_marker);
            self.marker_data.push(marker);  
        }
    },

    draw_marker: function(marker){
        var self = this;
        var g_marker = self.map.addMarker({
                lat: marker.lat,
                lng: marker.lng,
                title: marker.title,
                infoWindow: {
                content: marker.title}
            });
        return g_marker;
    },

    //Remove all the marker whose id is not present in the places_id argument
    remove_markers: function(places_id){
        var self = this;
        for(var i = self.marker_data.length - 1; i >= 0; i --){
            var marker = self.marker_data[i];
            if(! _.contains(places_id, marker.id)){
                self.remove_marker_with_index(i); 
            }
        }
    },

    remove_marker_with_index: function(index){
        var self = this;
        var g_marker = self.markers.splice(index,1)[0];
        self.marker_data.splice(index,1);
        self.lat_lngs.splice(index,1);
        self.map.removeMarker(g_marker);
    },

    calc_bounds: function() {
        var self = this;
        var bounds = new google.maps.LatLngBounds();
        var lat_lng_length = self.lat_lngs.length;
        // If there are some markers fits the bounds to include all the marker otherwise set viewport to default coordinates
        if(lat_lng_length > 0){
            for (var i = 0; i < lat_lng_length; i++) {
                bounds.extend(self.lat_lngs[i]);
            }
            self.map.fitBounds(bounds);
            if(self.map.getZoom()>self.max_zoom){
                self.map.setZoom(self.max_zoom);
            }
        }
        else{
            var center = new google.maps.LatLng(self.default_coordinates[1],self.default_coordinates[0]);
            self.map.panTo(center);
            self.map.setZoom(self.default_zoom);
        }   
    }
};
