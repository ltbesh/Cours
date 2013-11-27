Template.calendar.rendered = function(){
    // Calendar
    Deps.autorun(function(){
        if(Session.get("current_course")){
            var time_slots = TimeSlots.find({course_id:Session.get("current_course")._id}).fetch();
            var events = repeat_events(time_slots);
            // If the calendar is not already present on the page add it
            $('#calendar').fullCalendar( 'destroy' );
            $('#calendar').fullCalendar({
                weekends: true,
                defaultView : Session.get("user_pref_calendar_view"),
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month, agendaWeek'
                },
                dayNames : ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                dayNamesShort : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                dayClick : function(date, allDay, jsEvent, view){
                    if(Session.get("edit_course")){
                        clear_alerts();
                        var time_slot = {start: date, all_day: allDay};
                        Session.set("current_time_slot", time_slot);
                        $('#edit-time-slot-modal').modal();

                    }
                },
                eventClick : function(calEvent, jsEvent, view){
                    if(Session.get("edit_course")){
                        clear_alerts();
                        var time_slot = TimeSlots.findOne(calEvent._id);
                        Session.set("current_time_slot", time_slot);
                    }
                    $('#edit-time-slot-modal').modal();
                },
                viewRender : function(view, element){
                    Session.set("user_pref_calendar_view", view.name);
                },
                allDaySlot: false,
                minTime : 6,
                axisFormat : "HH:mm",
                events: events
            });
        }
    });
}