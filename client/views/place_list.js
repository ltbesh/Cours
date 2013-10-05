Template.place_list.helpers({
	places : function (){
		var places =  Places.find({});
		console.log(places);
		return places;
	}

});