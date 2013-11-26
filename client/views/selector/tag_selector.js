Template.tag_selector.rendered = function(){
    function format(item) { return item.title; };

    Deps.autorun(function(){
        // If the template is used on a place detail page display only the tags available for this place 
        if(Session.get("current_place")){
            var courses = Courses.find({place_id: Session.get("current_place")._id},{fields : {tag_id: 1}}).fetch();
            courses = _.pluck(courses, "tag_id");
            var tags = Tags.find({_id : {$in : courses}}).fetch();
        }
        // If the template is used in search then return all the tags
        else{
            var tags = Tags.find().fetch();
        }
        if(tags){
            for(var i = 0; i < tags.length; i++){
                tags[i].id = tags[i]['_id'];
                delete tags[i]._id;
            }
            $("#subject-search").select2({
                data: { results: tags, text: 'title' },
                placeholder: 'Chercher un sport', 
                formatSelection: format,
                formatResult: format,
            });
            
            // For the detail page
            if(Session.get("current_place")){
                if(Session.get("current_course")){
                    var current_course_tag = Courses.findOne(Session.get("current_course")._id).tag_id;
                    $("#subject-search").select2("val", current_course_tag); 
                }
                $("#subject-search").on("change", function(e) { 
                    var current_course = Courses.findOne({place_id : Session.get("current_place")._id, tag_id : e.val});
                    Session.set("current_course",current_course);
                });
            }

            // For the search page
            else {
                $("#subject-search").on("change", function(e) { 
                    Session.set('subject_search',e.val);
                });

                if (Session.get('subject_search'))
                    $("#subject-search").select2("val", Session.get('subject_search'));
            }
        }
    });
}
