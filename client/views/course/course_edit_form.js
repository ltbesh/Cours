Template.course_edit_form.rendered = function(){
    function format(item) { return item.title; };
    Deps.autorun(function(){
        var user_id = Meteor.userId();
        var new_course = Courses.findOne({user_id: user_id, status:"adding"});

        if(!new_course){
            var new_course = Meteor.call("insert_base_course",{});
        }
        else{
            Session.set("current_course", new_course);
            var tags = Tags.find().fetch();
            var tags_name =[];

            for(var i = 0; i < tags.length; i++){
                tags[i].id = tags[i]["_id"];
                delete tags[i]._id;
            }
            $("#input-tags").select2({
                data: { results: tags, text: "title" },
                placeholder: "Matière ?",
                formatSelection: format,
                formatResult: format,
            });

            var places = Places.find({user_id : Meteor.userId()}).fetch();           

            for(var i = 0; i < places.length; i++){
                places[i].id = places[i]["_id"];
                delete places[i]._id;
            }
            $("#input-place").select2({
                data: { results: places, text: "title" },
                placeholder: "Lieu ?",
                formatSelection: format,
                formatResult: format,
            });

            var time_slots = TimeSlots.find({course_id:new_course._id}).fetch();
            var events = repeat_events(time_slots);
            // If the calendar is not already present on the page add it
                if(!$("#calendar").hasClass("fc")){
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
                        dayClick : function(date, allDay, jsEvent, view){
                            clear_alerts();
                            var time_slot = {start: date, all_day: allDay};
                            Session.set("current_time_slot", time_slot);
                            Session.set("show_edit_time_slot", true);
                        },
                        eventClick : function(calEvent, jsEvent, view){
                            clear_alerts();
                            var time_slot = TimeSlots.findOne(calEvent._id);
                            Session.set("current_time_slot", time_slot);
                            Session.set("show_edit_time_slot", true);
                        },
                        allDaySlot: false,
                        minTime : 6,
                        axisFormat : "HH:mm",
                        events: events
                    });
                }

            // If the file-picker widget is not already rendered, render it
            if($("#image-picker").attr("style") !== "display: none;"){
                var element = document.getElementById("image-picker");
                element.type="filepicker-dragdrop"; 
            
                element.onchange = function(e){        
                    e.preventDefault();
                    var images = Session.get("edit_course_pictures");
                    for(var i = 0; i< e.fpfiles.length;i++){
                        images.push(e.fpfiles[i].url);
                    }
                    Session.set("edit_course_pictures", images); 
                };
                filepicker.constructWidget(element);
            }
        }
    });
}

Template.course_edit_form.helpers({
        show_edit_time_slot : function () {
            return Session.get("show_edit_time_slot");
        }    
});

Template.course_edit_form.events({ 
    "submit form": function(e) {
        e.preventDefault();

        var course = {
            description: $(e.target).find("#input-description").val(), 
            tag_id: $(e.target).find("#input-tags").select2("val")[0],
            additional_information: $(e.target).find("#input-additional-information").val(),
            place_id: $(e.target).find("#input-place").select2("val"),
            pictures: Session.get("edit_course_pictures"),
            price: $(e.target).find("#input-price").val(),
            contact: $(e.target).find("#input-contact").val(),
            required_materiel: $(e.target).find("#input-required-material").val(),
            price_explanation: $(e.target).find("#input-price-explanation").val()
        };

        Meteor.call("insert_course", course, function(error, result){
            clear_alerts();
            if(error){
                insert_alert(error.reason,"error");
            }
            else{
                var course_id = result;
                var new_time_slots = Session.get("new_time_slots");
                for(var i = 0, nb_time_slots = new_time_slots.length; i < nb_time_slots;i++){
                    new_time_slots[i].course_id = course_id;
                    Meteor.call("insert_time_slot", new_time_slots[i], function(error, result){
                        if(error){
                            // Display error
                        }
                    });
                }
                insert_alert("Votre cours a été ajouté avec succès","success");
                Meteor.Router.to("user_edit");
            }
        });
    }
});

Template.course_edit_form.destroyed = function(){
    Session.set("create_course_pictures", []);
    Session.set("new_time_slots",[])
}
