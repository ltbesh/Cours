owns_document = function(userId, doc){ 
    return doc && doc.user_id === userId;
}

owns_time_slot = function(userId, doc){
    var course = Courses.find({_id : doc.course_id, user_id : userId, }).fetch()[0];
    if(course){
        return true;
    }
    else{
        return false;
    }
}