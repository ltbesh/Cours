TimeSlots = new Meteor.Collection('time_slot');

Meteor.methods({
    insert_time_slot : function(time_slot_attributes){

    var time_slot_id = TimeSlots.insert(time_slot_attributes);

    return time_slot_id;

    }
});