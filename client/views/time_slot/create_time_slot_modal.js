Template.create_time_slot_modal.rendered = function(){
    var date = Session.get("new_time_slot_date");
    var month = date.getMonth() + 1;
    var formated_date = date.getDate() + "/" + month + "/" + date.getFullYear()
    $("#date-starts").val(formated_date);
    $("#date-starts").datepicker();
    $("#date-ends").val(formated_date);
    $("#date-ends").datepicker();
    for (var i = 0; i < 24; i++)
    {
        if(i<10)
            i = "0"+i;

        $("#input-hour-starts")
            .append($("<option></option>")
            .attr("value",i)
            .text(i));
        $("#input-hour-ends")
            .append($("<option></option>")
            .attr("value",i)
            .text(i));

        if(i<12){
            var j = 5 * i;
            if (j<10)
                j = "0" + j;
            $("#input-minute-starts")
                .append($("<option></option>")
                .attr("value",j)
                .text(j));
            $("#input-minute-ends")
                .append($("<option></option>")
                .attr("value", j)
                .text(j));
        }
    }  

    var hours = Session.get("new_time_slot_date").getHours();
    var minutes = Session.get("new_time_slot_date").getMinutes();
    $("#input-hour-starts option").each(function() { this.selected = (this.text == hours); });
    $("#input-minute-starts option").each(function() { this.selected = (this.text == minutes); }); 
    $("#input-hour-ends option").each(function() { this.selected = (this.text == hours + 1); }); 
    $("#input-minute-ends option").each(function() { this.selected = (this.text == minutes); }); 
    $("#all-day").prop("checked",Session.get("new_time_slot_all_day"))

}

Template.create_time_slot_modal.events({
    "click .cancel" : function(){
        Session.set("show_create_time_slot", false);
    },
    "click .save" : function(){
        var time_slots = Session.get("new_time_slots");
        var start = new Date($("#date-starts").datepicker("getDate").getTime() + 1000 * 60 * (Number($("#input-hour-starts").val()) * 60 + Number($("#input-minute-starts").val())));
        var end = new Date($("#date-starts").datepicker("getDate").getTime() + 1000 * 60 * (Number($("#input-hour-ends").val()) * 60 + Number($("#input-minute-ends").val())));
        var new_time_slot = {
            title : $("#input-title").val(),
            start : start,
            end : end,
            all_day : false,
            day_of_week : start.getDay(),
            start_time: start.getHours() * 60 + start.getMinutes(),
            end_time: end.getHours() * 60 + end.getMinutes(),
            repeat : $("#repeat").prop("checked"),
            repeat_frequency : $("#repeat").prop("checked") ? 7 : 0
        };
        time_slots.push(new_time_slot);
        Session.set("new_time_slots", time_slots);
        Session.set("show_create_time_slot", false);
    }

});