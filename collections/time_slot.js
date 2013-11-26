TimeSlots = new Meteor.Collection('time_slots');

TimeSlots.allow({
    remove: owns_time_slot
});

Meteor.methods({
    upsert_time_slot : function(time_slot_attributes){
    var user = Meteor.user();
    //user
    if(!user)
        throw new Meteor.Error(401, 
            "Vous devez être connecté pour pouvoir créer des créneau horaire");

    //Tile
    if(!time_slot_attributes.title){
        throw new Meteor.Error(422, 
            "Merci de renseigner un titre pour votre créneau horaire");
    }
    else{
        Match.test(time_slot_attributes.title, String);
    }

    // Course_id
    if(!time_slot_attributes.course_id){
        throw new Meteor.Error(422, 
            "Votre créneau horaire doit être attaché à un cours");
    }
    else{
        var course = Courses.findOne(time_slot_attributes.course_id);
        if(course.user_id !==user._id){
            throw new Meteor.Error(422, 
                "Vous ne pouvez pas ajouter de créneau horaire à un cours qui ne vous appartient pas");            
        }
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

    var time_slot = _.extend(_.pick(time_slot_attributes, 
                "title", "course_id", "start", "end", "all_day", 
                "day_of_week", "start_time", "end_time", "repeat", "repeat_frequency"),{user_id: user._id});

    time_slot._id = TimeSlots.upsert({_id:time_slot_attributes._id}, time_slot).insertedId;

    return time_slot;
    }
});