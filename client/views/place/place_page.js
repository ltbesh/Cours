Template.place_page.helpers({
	current_place: function(){
		return place =  Places.findOne(Session.get('current_place'));
	},
    subjects: function(){
    	// Return the tag_id of the courses given in that place in an array
    	var courses_tag = _.pluck(Courses.find({place_id : this._id}, {fields: {tag_id:1}}).fetch(), 'tag_id');
        return Tags.find({_id :{$in : courses_tag}});
    }
});

Template.place_page.destroyed = function(){
	Session.set('current_place', null);
}

