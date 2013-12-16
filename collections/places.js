Places = new Meteor.Collection("places");

Meteor.methods({
    remove_place : function(place_id){
        var place = Places.findOne(place_id);
        if(owns_document(this.userId, place)){
            Places.remove(place_id);
            courses_id_array = Courses.find({place_id : place_id}, {fields : {_id : true}}).fetch();
            for(var i = 0; i < courses_id_array.length;i ++)
            {
                Meteor.call("remove_course", courses_id_array[i]._id);
            }
        }
    },
    insert_or_update_place : function(place_attributes){
        var user = Meteor.user();
        //user
        if(!user)
            throw new Meteor.Error(401, 
                "Vous devez être connecté pour pouvoir créer ou modifier un lieu");

        //title
        if(!place_attributes.title){
            throw new Meteor.Error(422, 
                "Merci de renseigner un titre pour votre lieu");
        }
        else{
            Match.test(place_attributes.title, String);
        }

        //description
        if(!place_attributes.description){
            throw new Meteor.Error(422, 
                "Merci de renseigner une description pour votre lieu");
        }
        else{
            Match.test(place_attributes.description, String);
        }
        
        //address
        if(!place_attributes.address){
            throw new Meteor.Error(422, 
                "Merci de renseigner une adresse valide pour votre lieu");
        }
        
        if(!place_attributes.location){
            throw new Meteor.Error(422, 
                "L'adresse que vous avez renseignée n'est pas valide, merci d'utiliser les suggestions" );
        }

        var place = _.extend(_.pick(place_attributes, "title", "description", "location", "address"), {
            user_id: user._id
        });
        
        var place_id = Places.upsert({_id:place_attributes._id}, place);

        return place_id;
    }
});
