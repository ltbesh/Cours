repeat_events = function(events){
    var one_day = 24 * 60 * 60 * 1000;
    var repeated_events = [];

    // Loop through the events
    for (var i = 0, events_count = events.length; i< events_count; i ++){
        current_event = events[i];

        // If the event need to be repeated
        if(current_event.repeat === true){
            var number_repetition = Math.ceil(365/current_event.repeat_frequency);
            for (var j = - number_repetition ; j < number_repetition; j ++){
                repeated_events.push({
                    id : current_event._id,
                    title : current_event.title,
                    allDay : current_event.all_day,
                    start : new Date(new Date(current_event.start).getTime() + j * current_event.repeat_frequency * one_day),
                    end : new Date(new Date(current_event.end).getTime() + j * current_event.repeat_frequency * one_day)
                });
            }
        }
        // Else it is a single event
        else{
            repeated_events.push({
                id : current_event._id,
                title : current_event.title,
                allDay : current_event.all_day,
                start : current_event.start,
                end : current_event.end
            });
        }
    }
    return repeated_events;
}

get_owned_time_slots = function(id){
    return TimeSlots.find({user_id:id});
}

upsert_time_slot = function(time_slot){
    Meteor.call("insert_time_slot", time_slot, function(error, result){
        if(error){
            insert_alert(error.reason,"error");
        }
        else{
            insert_alert("Votre créneau horaire à bien été ajouté", "success");
            console.log(result);
            return result;
        }
    });
}