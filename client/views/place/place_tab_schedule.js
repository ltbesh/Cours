Template.place_tab_schedule.rendered = function(){
    $(document).ready(function() {

    // page is now ready, initialize the calendar...

        $('#calendar').fullCalendar({
            weekends: false,
            defaultView : "agendaWeek",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month, agendaWeek'
            },
            dayNames : ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
        });

    });
}