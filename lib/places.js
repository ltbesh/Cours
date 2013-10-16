get_owned_places = function(id){
	return Places.find({user_id:id});
}