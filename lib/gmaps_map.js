gmaps = {
	map: null,

	//Google map marker object
	markers: [],

	//latLngs: [],

	//Info about the marker
	markerData: [],

	addMarker: function(marker){
		var gMarker = this.map.addMarker({
	        lat: marker.lat,
	        lng: marker.lng,
	        title: marker.title,
	        infoWindow: {
	        content: marker.title + ' ' + marker.id}
        });
        this.markers.push(gMarker);
        this.markerData.push(marker);  
	},

	removeMarker: function(id){
		var self = this;
		_.each(self.markerData, function(marker, key){
			if(marker.id ===id)
			{
				var gMarker = self.markers.splice(key,1)[0];
				self.markerData.splice(key,1);
				self.map.removeMarker(gMarker);
			}
		});
	},

	markerExists: function(key, val){
		_.each(this.markers,function(storedMarker){
			if(storedMarker[key]===val){
				return true;
			}
		});
		return false;
	},

	initialize: function(){
	    this.map = new GMaps({
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
      	Session.set('map', true);
	}

}