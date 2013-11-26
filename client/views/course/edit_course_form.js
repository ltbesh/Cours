Template.edit_course_form.rendered = function(){
    Session.set("edit_course", true);

    function format(item) { return item.title; };

    Deps.autorun(function(){
        var user_id = Meteor.userId();

        if(Session.get("current_course")){
            var course = Session.get("current_course");
        }
        else{
            var course = Courses.findOne({user_id: user_id, status:"adding"});
        }

        if(!course){
            var course = Meteor.call("insert_base_course",{});
        }
        else{
            // Tags
            Session.set("current_course", course);

            var tags = Tags.find().fetch();
            for(var i = 0; i < tags.length; i++){
                tags[i].id = tags[i]["_id"];
                delete tags[i]._id;
            }

            if(Session.get("current_course").tag_id){
                var current_tag = Tags.findOne(Session.get("current_course").tag_id);
                current_tag.id = current_tag._id;
            }

            $("#input-tags").select2({
                data: { results: tags, text: "title" },
                placeholder: "Matière",
                formatSelection: format,
                formatResult: format,
                initSelection : function (element, callback) {
                    var data = current_tag;
                    callback(data);
                }
            });

            // Set default tag value
            if(current_tag){
                $("#input-tags").select2("val", current_tag._id);
            } 

            // Place
            var places = Places.find({user_id : Meteor.userId()}).fetch();           
            for(var i = 0; i < places.length; i++){
                places[i].id = places[i]["_id"];
                delete places[i]._id;
            }

            if(Session.get("current_course").place_id){
                var current_place = Places.findOne(Session.get("current_course").place_id);
                current_place.id = current_place._id;
            }

            $("#input-place").select2({
                data: { results: places, text: "title" },
                placeholder: "Lieu",
                formatSelection: format,
                formatResult: format,
                initSelection : function (element, callback) {
                    var data = current_place;
                    callback(data);
                }
            });

            // Set default place value
            if(current_place){
                $("#input-place").select2("val", current_place._id);
            }

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

            if(Session.get("edit_course_pictures").length > 0){
                Galleria.loadTheme('/galleria_themes/classic/galleria.classic.min.js');
                Galleria.run('#edit-course-galleria');
            }
        }
    });
}

Template.edit_course_form.helpers({
    show_edit_time_slot : function () {
        return Session.get("show_edit_time_slot");
    },
    current_course : function(){
        return Session.get("current_course")? Session.get("current_course") : {};
    },
    pictures : function(){
        return Session.get("edit_course_pictures");
    }
});

Template.edit_course_form.events({ 
    "submit form": function(e) {
        e.preventDefault();

        var course = {
            _id : Session.get("current_course") ? Session.get("current_course")._id : null,
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

Template.edit_course_form.destroyed = function(){
    Session.set("edit_course", false);
    Session.set("current_course", null);
    Session.set("edit_course_pictures", []);
    Session.set("new_time_slots",[])
}
