convert_minute_to_time = function(minutes){
    var hours = Math.floor(minutes / 60);          
    var minutes = minutes % 60 ;
    if(minutes<10)
        minutes = "0"+minutes
    if(hours<10)
        hours = "0"+hours
    return [hours, minutes]
}
