gmaps = {
	map: null,

	//Google map marker object
	markers: [],
	//latLngs: [],
	lat_lngs: [],
	//Info about the marker
	marker_data: [],
	default_coordinates : [2.3462677001953125,48.85432452980058], // PARIS Coordinates
	default_zoom : 12, 
	max_zoom : 15,

	add_marker: function(marker){
		var self = this;
		if(!gmaps.marker_exists('id', marker.id)){
			var g_lat_lng = new google.maps.LatLng(marker.lat, marker.lng);
			var g_marker = self.draw_marker(marker);
			self.lat_lngs.push(g_lat_lng);
	        self.markers.push(g_marker);
	        self.marker_data.push(marker);  
	    }
	},
	remove_marker_with_index: function(index){
		var self = this;
		var g_marker = self.markers.splice(index,1)[0];
		self.marker_data.splice(index,1);
		self.lat_lngs.splice(index,1);
		self.map.removeMarker(g_marker);
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
	draw_marker: function(marker){
		var self = this;
		var g_marker = self.map.addMarker({
		        lat: marker.lat,
		        lng: marker.lng,
		        title: marker.title,
		        infoWindow: {
		        content: marker.title + ' ' + marker.id}
	        });
		return g_marker;
	},

	marker_exists: function(key, val){
		var marker_exist = false
		_.each(this.marker_data,function(stored_marker){
			if(stored_marker[key] == val){
				marker_exist = true;
			}
		});
		return marker_exist;
	},

	initialize: function(){
		var self = this;
	    self.map = new GMaps({
	        el: '#map',
	        lat: self.default_coordinates[1],
	        lng: self.default_coordinates[0],
	        zoomControl : true,
	        zoomControlOpt: {
	            style : 'MEDIUM',
	            position: 'TOP_LEFT'
	        },
	        zoom: self.default_zoom,
	        panControl : false,
	        streetViewControl : true,
	        mapTypeControl: false,
	        overviewMapControl: false
      	});

		if(self.marker_data.length > 0){
			_.each(self.marker_data, function(marker){
				self.draw_marker(marker);
			});
		}
      	Session.set('map', true);
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
        	if(self.map.getZoom()>self.max_zoom)
        		self.map.setZoom(self.max_zoom);
	    }
	    else{
	    	var center = new google.maps.LatLng(self.default_coordinates[1],self.default_coordinates[0]);
	    	self.map.panTo(center);
	    	self.map.setZoom(self.default_zoom);
	    }

        
    }

}