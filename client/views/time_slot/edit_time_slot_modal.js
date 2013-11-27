Template.edit_time_slot_modal.rendered = function(){
    Session.set("show_modal", true);
    var time_slot = Session.get("current_time_slot");
    if(time_slot){
        // Set start and end time according to where the user clicked on the calendar
        $("#date-starts").datetimepicker();
        $("#date-starts").datetimepicker('setDate', time_slot.start);
        $("#date-ends").datetimepicker();
        if(time_slot.end)
            end = time_slot.end;
        else
            end = new Date(time_slot.start.getTime() + 60*60000);
        $("#date-ends").datetimepicker('setDate', end);

        // Not used for now as the all day zone is hidden
        $("#all-day").prop("checked",time_slot.all_day);
    }
}

Template.edit_time_slot_modal.helpers({
    update_time_slot : function(){
        if(Session.get("current_time_slot"))
            return Session.get("current_time_slot")._id;
    },
    title : function(){
        if(Session.get("current_time_slot")){
            if(Session.get("current_time_slot").title)
                return Session.get("current_time_slot").title;
        }

        else
            return "";
    },
    repeat : function(){
        if(Session.get("current_time_slot")){
            if(Session.get("current_time_slot").repeat)
                return "checked";
            else
                return "";
        }
    }

});

Template.edit_time_slot_modal.events({
    "click .close" : function(e){
        e.preventDefault();
        clear_alerts();
        $('#edit-time-slot-modal').modal('hide')
    },
    "click .save" : function(e){
        e.preventDefault();
        clear_alerts();
        var start = $("#date-starts").datetimepicker("getDate");
        var end = $("#date-ends").datetimepicker("getDate");
        var new_time_slot = {
            _id: Session.get("current_time_slot")._id ? Session.get("current_time_slot")._id : null,
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
        Meteor.call("upsert_time_slot", new_time_slot, function(error, result){
            if(error){
                insert_alert(error.reason,"error");
            }
            else{
                insert_alert("Votre créneau horaire à bien été ajouté", "success");
                $('#edit-time-slot-modal').modal('hide')    
            }
        });
    },
    "click .delete" : function(e){
        e.preventDefault();
        clear_alerts();
        TimeSlots.remove(Session.get("current_time_slot")._id);
        insert_alert("Votre créneau horaire à bien été supprimé", "success");
        $('#edit-time-slot-modal').modal('hide')
    }
});

Template.edit_time_slot_modal.destroyed = function(){
    Session.set("show_modal", false);
    Session.set("current_time_slot", null);
}