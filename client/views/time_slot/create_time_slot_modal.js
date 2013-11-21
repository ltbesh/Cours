Template.edit_time_slot_modal.rendered = function(){
    Session.set("show_modal", true);
    var date = Session.get("time_slot_date");

    var time1 = new Date();
    // Set start and end time according to where the user clicked on the calendar
    $("#date-starts").datetimepicker();
    $("#date-starts").datetimepicker('setDate', date);
    $("#date-ends").datetimepicker();
    $("#date-ends").datetimepicker('setDate', new Date(date.getTime() + 60*60000));

    // Not used for now as the all day zone is hidden
    $("#all-day").prop("checked",Session.get("time_slot_all_day"));
}

Template.edit_time_slot_modal.helpers({
    update_time_slot : function(){
        return Session.get("current_time_slot");
    }

});

Template.edit_time_slot_modal.events({
    "click .cancel" : function(){
        Session.set("show_create_time_slot", false);
        clear_alerts();
    },
    "click .save" : function(){
        clear_alerts();
        var start = $("#date-starts").datetimepicker("getDate");
        var end = $("#date-ends").datetimepicker("getDate");
        var new_time_slot = {
            title : $("#input-title").val(),
            course_id : Session.get("current_course")._id,
            start : start,
            end : end,
            all_day : false,
            day_of_week : start.getDay(),
            start_time: start.getHours() * 60 + start.getMinutes(),
            end_time: end.getHours() * 60 + end.getMinutes(),
            repeat : $("#repeat").prop("checked"),
            repeat_frequency : $("#repeat").prop("checked") ? 7 : 0
        };

        Meteor.call("insert_time_slot", new_time_slot, function(error, result){
            if(error){
                insert_alert(error.reason,"error");
            }
            else{
                insert_alert("Votre créneau horaire à bien été ajouté", "success");
                console.log(result);
                Session.set("show_create_time_slot", false);
            }
        });
    },
    "click .delete" : function(){
        var time_slots = Session.get("new_time_slots");
        var current_time_slot_id = Session.get("current_time_slot");
        for(var i = time_slots.length - 1; i >=0 ; i--){
            if(time_slots[i]._id === current_time_slot_id)
                time_slots.splice(i,1);
        }
        TimeSlots.remove(current_time_slot_id);
        Session.set("show_create_time_slot", false);
    }

});

Template.edit_time_slot_modal.destroyed = function(){
    Session.set("show_modal", false);
    Session.set("current_time_slot", false);
}