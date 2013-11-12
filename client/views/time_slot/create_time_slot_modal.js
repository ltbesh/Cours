Template.create_time_slot_modal.rendered = function(){
    $( "#date-starts" ).datepicker();
    $( "#date-ends" ).datepicker();
}

Template.create_time_slot_modal.events({
    "click .cancel" : function(){
        Session.set("show_create_time_slot", false);
    },
    "click .save" : function(){
        Session.set("show_create_time_slot", false);
    }

});