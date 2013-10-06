Template.place_list.helpers({
	places : function (){
		var places =  Places.find({});
		return places;
	}

});