TimeSlots = new Meteor.Collection('time_slot');

Meteor.methods({
    insert_time_slot : function(time_slot_attributes){
    var user = Meteor.user();
    //user
    if(!user)
        throw new Meteor.Error(401, 
            "Vous devez être connecté pour pouvoir créer des cours");

    //Tile
    if(!time_slot_attributes.title){
        throw new Meteor.Error(422, 
            "Merci de renseigner un titre pour votre créneau horaire");
    }
    else{
        Match.test(time_slot_attributes.title, String);
    }

    //Start
    if(!time_slot_attributes.start){
         throw new Meteor.Error(422, 
            "Merci de renseigner une date de début pour votre créneau horaire");
    }
    else{
        Match.test(time_slot_attributes.start, Date);
    }   

    //End
    if(!time_slot_attributes.end){
         throw new Meteor.Error(422, 
            "Merci de renseigner une date de fin pour votre créneau horaire");
    }
    else{
        Match.test(time_slot_attributes.end, Date);
    }

    // All day
    // if(!time_slot_attributes.all_day){
    //      throw new Meteor.Error(422, 
    //         "Merci de préciser si votre créneau dure toute la journée");   	
    // }
    // else{
    //     Match.test(time_slot_attributes.end, Boolean);
    // }	

    // Day of week
    if(!time_slot_attributes.day_of_week){
         throw new Meteor.Error(422, 
            "Le jour de la semaine doit être un nombre entre 0 et 6");   	
    }
    else{
        Match.test(time_slot_attributes.end, Number);
    }	  

    //Start time
    if(!time_slot_attributes.start_time){
         throw new Meteor.Error(422, 
            "Merci de renseigner une heure de début pour votre créneau horaire");
    }
    else{
        if(time_slot_attributes.start_time < 0 || time_slot_attributes > 1435000 ){
            throw new Meteor.Error(422, 
                        "L'heure de début de votre créneau horaire doit être comprise entre 00h00 et 24h00");
        }
        Match.test(time_slot_attributes.start_time, Number);
    }

    //End time
    if(!time_slot_attributes.end_time){
         throw new Meteor.Error(422, 
            "Merci de renseigner une heure de fin pour votre créneau horaire");
    }
    else{
        if(time_slot_attributes.end_time <= time_slot_attributes.start_time){
            throw new Meteor.Error(422, 
                "L'heure de fin de votre créneau horaire doit être posterieure à son heure de début");
        }
        if(time_slot_attributes.end_time < 0 || time_slot_attributes > 1435000 ){
            throw new Meteor.Error(422, 
                "L'heure de fin de votre créneau horaire doit être comprise entre 00h00 et 24h00");
        }
        Match.test(time_slot_attributes.end_time, Number);
    }
    var time_slot_id = TimeSlots.insert(time_slot_attributes);

    return time_slot_id;

    }
});