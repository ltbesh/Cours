get_owned_courses = function(id){
    return Courses.find({user_id:id});
}