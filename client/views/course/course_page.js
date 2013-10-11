Template.course_page.helpers({
	current_course: function(){
		return Courses.findOne(Session.get('current_course'));
	},
	place: function () {
	var place_id = this.place_id;
	var place = Places.findOne( { _id: place_id });

	return place;
    },
    subject: function(){
        return Tags.find(this.tag_id).fetch()[0].title;
    }
});

Template.course_page.rendered = function(){
    Session.set('current_course_place', this.place_id);
    console.log(this);
} 

Template.course_page.destroyed = function(){
	Session.set('current_course', null);
	Session.set('current_course_place', null);
}

Template.course_page.rendered = function(){
    Session.set('current_course_place', this.data.place_id);
} 