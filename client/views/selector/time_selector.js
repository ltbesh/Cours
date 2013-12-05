Template.time_selector.rendered = function (){

    if (! $("#time_selector").data("uiSlider")) {
        $( "#time_selector" ).slider({
            range: true,
            min: 480,
            max: 1320,
            step: 30,
            values: [ 
                Session.get("schedule_min") ? Session.get("schedule_min") : 0,
                Session.get("schedule_max") ? Session.get("schedule_max") : 1440 ],
        slide: function( event, ui ) {
            $( "#schedule_min" ).html(convert_minute_to_time(ui.values[ 0 ])[ 0 ] + "h" + 
                                        convert_minute_to_time(ui.values[ 0 ])[ 1 ]);
            $( "#schedule_max" ).html(convert_minute_to_time(ui.values[ 1 ])[ 0 ] + "h" + 
                                        convert_minute_to_time(ui.values[ 1 ])[ 1 ]);
        },
        stop: function(event, ui){
            Session.set("schedule_min", ui.values[ 0 ]);
            Session.set("schedule_max", ui.values[ 1 ]);
        }
        });
    }

    $( "#schedule_min" ).html(convert_minute_to_time($( "#time_selector" ).slider( "values", 0 ))[0] + "h" + 
        convert_minute_to_time($( "#time_selector" ).slider( "values", 0 ))[1]);
    $( "#schedule_max" ).html(convert_minute_to_time($( "#time_selector" ).slider( "values", 1 ))[0] + "h" + 
        convert_minute_to_time($( "#time_selector" ).slider( "values", 0 ))[1]);
};
