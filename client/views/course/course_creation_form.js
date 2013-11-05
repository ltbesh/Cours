Template.course_creation_form.rendered = function(){

    $("#alert").hide();
    $(".alert .close").live("click", function(e) {
    $(this).parent().hide();
    });

    function format(item) { return item.title; };
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

    for (var i = 0; i < 24; i++)
    {
        if(i<10)
            i = "0"+i;

        $("#input-start-hour")
            .append($("<option></option>")
            .attr("value",i)
            .text(i));
        $("#input-end-hour")
            .append($("<option></option>")
            .attr("value",i)
            .text(i));

        if(i<12){
            $("#input-start-minute")
                .append($("<option></option>")
                .attr("value",i*5)
                .text(i*5));
            $("#input-end-minute")
                .append($("<option></option>")
                .attr("value",i*5)
                .text(i*5));
        }
    }    
}

Template.course_creation_form.helpers({
    "days": function(){
        return [{value : 1, title : "Lun"}, 
        {value : 2, title : "Mar"}, 
        {value : 3, title : "Mer"},
        {value : 4, title : "Jeu"},
        {value : 5, title : "Ven"},
        {value : 6, title : "Sam"},
        {value : 7, title : "Dim"}];
    }
});

Template.course_creation_form.events({ 
    "change #image-picker": function(e){
        console.log(JSON.stringify(e.fpfile));
        console.log($("#image-picker").value;
    },
    "submit form": function(e) {
        e.preventDefault();

        var course = {
            description: $(e.target).find("#input-description").val(), 
            day_of_week: $(e.target).find("[name=input-day]:checked").val(),
            price: $(e.target).find("#input-price").val(),      
            tag_id: $(e.target).find("#input-tags").select2("val")[0],
            starts: Number($(e.target).find("#input-start-hour").val() * 60) + Number($(e.target).find("#input-start-minute").val()),
            ends: Number($(e.target).find("#input-end-hour").val() * 60) + Number($(e.target).find("#input-end-minute").val()),
            place_id: $(e.target).find("#input-place").select2("val"),
            additional_information: $(e.target).find("#input-additional-information").val()
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


