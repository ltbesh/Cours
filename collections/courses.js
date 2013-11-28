Courses = new Meteor.Collection("courses");

Courses.allow({
    remove: owns_document
});

Meteor.methods({
    insert_base_course: function(course_attributes){
        var user = Meteor.user();
        //user
        if(!user)
            throw new Meteor.Error(401, 
                "Vous devez être connecté pour pouvoir créer des cours");

        var new_course = {user_id: user._id, status:"adding"};

        new_course._id = Courses.insert(new_course);
        return new_course;

    },
    upsert_course : function(course_attributes){
        var user = Meteor.user();

        //user
        if(!user)
            throw new Meteor.Error(401, 
                "Vous devez être connecté pour pouvoir créer des cours");

        //Place
        if(!course_attributes.place_id){
            throw new Meteor.Error(422, 
                "Merci de renseigner un lieu pour votre cours");
        }
        else{
            var place = Places.findOne({_id:course_attributes.place_id});
            if (place.user_id !== user._id){
                throw new Meteor.Error(422, "Ce lieu ne vous appartient pas, vous ne pouvez pas y ajouter de cours");
            }
        }

        //Tag
        if(!course_attributes.tag_id){
            throw new Meteor.Error(422, 
                "Merci de renseigner un sujet pour votre cours");
        }
        else{
            var course = Courses.findOne({tag_id : course_attributes.tag_id[0], place_id : course_attributes.place_id});
            if(course && course._id !== course_attributes._id)
                throw new Meteor.Error(422, 
                    "Un autre cours sur ce sujet existe déjà pour ce lieu, choisissez un autre lieu ou un autre sujet");
        }

        //Description
        if(!course_attributes.description){
            throw new Meteor.Error(422, 
                "Merci de renseigner une description pour votre cours");
        }
        else{
            Match.test(course_attributes.description, String);
        }

        //Price
        if(!course_attributes.price){
            throw new Meteor.Error(422, 
                "Merci de renseigner un prix pour votre cours");
        }
        else {
            Match.test(course_attributes.price, Number);
            if(course_attributes.price < 0 ){
                throw new Meteor.Error(422, 
                    "Merci de renseigner un prix positif pour votre cours");
            }
        }

        //Pictures
        if(course_attributes.pictures.length === 0){
            throw new Meteor.Error(422, 
                "Merci d'uploader au moins une photo pour votre cours");
        }

        Match.test(course_attributes.price_explanation, String);
        Match.test(course_attributes.contact, String);
        Match.test(course_attributes.required_materiel, String);
        Match.test(course_attributes.additional_information, String);

        var course = _.extend(_.pick(course_attributes, 
            "description", "tag_id", "additional_information", "place_id",
             "price", "pictures", "contact", "required_materiel","price_explanation"),{user_id: user._id});

        var course_id = Courses.upsert({_id:course_attributes._id},course);

        return course_id;
    }
});