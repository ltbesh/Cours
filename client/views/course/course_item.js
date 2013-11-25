Template.course_item.helpers({
    valid_status:function(){
        return this.status!=="adding" || this.status ==="undefined";
    },
    subject: function(){
        return Tags.findOne(this.tag_id).title;
    },
    place: function(){
    	return Places.findOne(this.place_id).title;
    }
})
