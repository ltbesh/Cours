Template.edit_course_form.rendered = function(){

    function format(item) { return item.title; };
    var user_id = Meteor.userId();
    
    Deps.autorun(function(){

        var course = Session.get("current_course");

        if(course){

            // Place
            var places = Places.find({user_id : Meteor.userId()}).fetch();      
            for(var i = 0; i < places.length; i++){
                places[i].id = places[i]["_id"];
                delete places[i]._id;
            }

            if(course.place_id){
                var current_place = Places.findOne(course.place_id);
                current_place.id = current_place._id;
            }

            $("#input-place").val(["Tennis"]).select2({
                data: { results: places, text: "title" },
                placeholder: "Lieu",
                formatSelection: format,
                formatResult: format,
                initSelection : function (element, callback) {
                    var data = current_place;
                    callback(data);
                }
            });

            // Pictures
            // If the file-picker widget is not already rendered, render it
            if($("#image-picker").attr("style") !== "display: none;"){
                var element = document.getElementById("image-picker");
                if(element){
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
        }
    });
}

Template.edit_course_form.helpers({
    current_course : function(){
        return Session.get("current_course")? Session.get("current_course") : {};
    }
});

Template.edit_course_form.events({ 
    "submit form": function(e) {
        e.preventDefault();
        clear_alerts()
        var course = {
            _id : Session.get("current_course") ? Session.get("current_course")._id : null,
            description: $("#input-description").val(), 
            tag_id: $("#tag-selector").select2("val"),
            additional_information: $("#input-additional-information").val(),
            place_id: $("#input-place").select2("val"),
            pictures: Session.get("edit_course_pictures"),
            price: $("#input-price").val(),
            contact: $("#input-contact").val(),
            required_materiel: $("#input-required-material").val(),
            price_explanation: $("#input-price-explanation").val()
        };
        // Try to add all the tags entered in the field
        for(var i = 0, nb_tags = $("#tag-selector").select2("val").length; i < nb_tags; i++){
            var tag = {_id : $("#tag-selector").select2("val")[i]};
            Meteor.call("insert_tag", tag);
        }

        Meteor.call("upsert_course", course, function(error, result){
            if(error){
                insert_alert(error.reason,"error");
            }
            else{
                var course_id = result;
                insert_alert("Votre cours a été ajouté avec succès","success");
                Meteor.Router.to("user_edit");
            }
        });
    }
});

Template.edit_course_form.destroyed = function(){
    Session.set("edit_course", false);
    Session.set("current_course", null);
}
