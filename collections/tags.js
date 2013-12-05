Tags = new Meteor.Collection("tags");

Meteor.methods({
    insert_tag : function(tag_attributes){
        if(!tag_attributes._id){
            throw new Meteor.Error(422, 
                "Your tag must have an id");
        }
        var existing_tag = Tags.findOne({_id:tag_attributes._id});
        //user
        if(existing_tag){
            return existing_tag;
        }
        else{
            var tag = _.pick(tag_attributes, "_id");
            Tags.insert(tag);
        }
    }
});
