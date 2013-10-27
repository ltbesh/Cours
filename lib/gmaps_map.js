gmaps = {
	map: null,

	//Google map marker object
	markers: [],

	//latLngs: [],

	//Info about the marker
	marker_data: [],

	add_marker: function(marker){
		var self = this;
		if(!gmaps.marker_exists('id', marker.id)){
			var g_marker = self.draw_marker(marker);
	        self.markers.push(g_marker);
	        self.marker_data.push(marker);  
	    }
	},

	remove_marker: function(id){
		var self = this;
		_.each(self.marker_data, function(marker, key){
			if(marker.id ===id)
			{
				var g_marker = self.markers.splice(key,1)[0];
				self.marker_data.splice(key,1);
				self.map.removeMarker(g_marker);
			}
		});
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
	        lat: 48.85432452980058,
	        lng: 2.3462677001953125,
	        zoomControl : true,
	        zoomControlOpt: {
	            style : 'MEDIUM',
	            position: 'TOP_LEFT'
	        },
	        zoom: 12,
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

}