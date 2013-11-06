Template.course_creation_form.rendered = function(){

    function format(item) { return item.title; };
        console.log("tags");

    Deps.autorun(function(){
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
    });  
}

Template.course_creation_form.events({ 
    "change #image-picker": function(e){
        var images = Session.get("create_course_pictures");
        for(var i = 0; i< e.fpfiles.length;i++){
            images.push(e.fpfiles[i]);
        }
        Session.set("create_course_pictures", images);  
    },
    "submit form": function(e) {
        e.preventDefault();

        var course = {
            description: $(e.target).find("#input-description").val(), 
            tag_id: $(e.target).find("#input-tags").select2("val")[0],
            additional_information: $(e.target).find("#input-additional-information").val(),
            place_id: $(e.target).find("#input-place").select2("val"),
            pictures: Session.get("create_course_pictures"),
            price: $(e.target).find("#input-price").val(),
            contact: $(e.target).find("#input-contact").val(),
            required_materiel: $(e.target).find("#input-required-material").val(),
            price_explanation: $(e.target).find("#input-price-explanation").val()
        };

        Meteor.call("insert_course", course, function(error, course_id){
            if(error){

                $("#alert > h4").html(error.reason);
                $("#alert").show();
            }
            else{
                Meteor.Router.to("course_detail_page", course_id); 
            }
        });

    }
});

Template.course_creation_form.rendered = function(){
    Session.set("create_course_pictures", []);

}
