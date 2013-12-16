Template.tag_selector.rendered = function(){
    function format(item) { return item.id; };

    Deps.autorun(function () {
        // Find relevant tags
        // Place detail page
        if(Session.get("current_place")){
            var courses = Courses.find({place_id: Session.get("current_place")._id},{fields : {tag_id: 1}}).fetch();
            var course_tags = _.flatten(_.pluck(courses, "tag_id"));
            var tags = Tags.find({_id : {$in : course_tags}}).fetch();
        }
        // Search and edit place page
        else{
            var tags = Tags.find().fetch();
        }

        // Fill in select 2 with tags
        if(tags){
            // Edit place form
            if(Session.get("edit_course")){
                var tags_name = new Array();

                for(var i = 0; i < tags.length;i++){
                    tags_name.push(tags[i]._id);
                }
                var course = Session.get("current_course");
                if(course.tag_id){
                    var current_tag = course.tag_id;
                }

                $("#tag-selector").select2({
                    tags:tags_name,
                    placeholder: "Discipline",
                    maximumSelectionSize: 1
                }); 
                $("#tag-selector").select2("val", current_tag);
            } 
            // Search and place detail page
            else{
                for(var i = 0; i < tags.length; i++){
                    tags[i].id = tags[i]["_id"];
                    delete tags[i]._id;
                }
                $("#tag-selector").select2({
                    data: { results: tags, text: "id" },
                    placeholder: "Sélectionnez un cours", 
                    formatSelection: format,
                    formatResult: format,
                });
            }
        }
    });

    // Set Events
    // Place detail page
    if(Session.get("current_place")){
        if(Session.get("current_course")){
            var current_course_tag = Courses.findOne(Session.get("current_course")._id).tag_id;
            $("#tag-selector").select2("val", current_course_tag); 
        }
        $("#tag-selector").on("change", function(e) {
            var place_id = Session.get("current_place")._id;
            var course = Courses.findOne({place_id : place_id, tag_id : e.val});
            Router.go("place_page", {_id : place_id, course_id : course._id});
        });
    }
    // Search and edit place pages
    else {
        $("#tag-selector").on("change", function(e) { 
            Session.set("tag_selector",e.val);
        });
        if (Session.get("tag_selector"))
            $("#tag-selector").select2("val", Session.get("tag_selector"));
    }
}
