Template.place_tab_schedule.rendered = function(){
        Deps.autorun(function(){

            $('#calendar').fullCalendar( 'destroy' );
            var source_time_slots = TimeSlots.find({course_id : Session.get("current_course")}).fetch();
            var events = repeat_events(source_time_slots);

            // page is now ready, initialize the calendar...
            $('#calendar').fullCalendar({
                weekends: true,
                defaultView : "agendaWeek",
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month, agendaWeek'
                },
                dayNames : ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                dayNamesShort : ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                allDaySlot: false,
                minTime: 6,
                axisFormat : "HH:mm",
                events: events
            });
    });
}