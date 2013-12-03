Template.tag_selector.rendered = function(){
    function format(item) { return item.id; };

    // If the template is used on a place detail page display only the tags available for this place
    Deps.autorun(function () {
        if(Session.get("current_place")){
            var courses = Courses.find({place_id: Session.get("current_place")._id},{fields : {tag_id: 1}}).fetch();
            var course_tags = _.flatten(_.pluck(courses, "tag_id"));
            var tags = Tags.find({_id : {$in : course_tags}}).fetch();
        }
        // If the template is used in search then return all the tags
        else{
            var tags = Tags.find().fetch();
        }

        if(tags){
            // For the course edit page use a select2 with tags enabled
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
                    placeholder: "Matière",
                    maximumSelectionSize: 1
                }); 
                $("#tag-selector").select2("val", current_tag);
            }
            else{
                for(var i = 0; i < tags.length; i++){
                    tags[i].id = tags[i]['_id'];
                    delete tags[i]._id;
                }
                $("#tag-selector").select2({
                    data: { results: tags, text: 'id' },
                    placeholder: 'Chercher un sport', 
                    formatSelection: format,
                    formatResult: format,
                });
            }
        }
    });

    // For place the detail page
    if(Session.get("current_place")){
        if(Session.get("current_course")){
            var current_course_tag = Courses.findOne(Session.get("current_course")._id).tag_id;
            $("#tag-selector").select2("val", current_course_tag); 
        }
        $("#tag-selector").on("change", function(e) { 
            var current_course = Courses.findOne({place_id : Session.get("current_place")._id, tag_id : e.val});
            Session.set("current_course",current_course);
        });
    }
    // For the search page
    else {
        $("#tag-selector").on("change", function(e) { 
            Session.set('tag_selector',e.val);
        });
        if (Session.get('tag_selector'))
            $("#tag-selector").select2("val", Session.get('tag_selector'));
    }
}
