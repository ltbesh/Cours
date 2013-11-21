owns_document = function(userId, doc){ 
	return doc && doc.user_id === userId;
}

owns_time_slot = function(userId, doc){
	console.log("user id : ", userId);
	console.log("time slot : ", doc);
	var course = Courses.find({_id : doc.course_id, user_id : userId, }).fetch()[0];
	console.log("course : ", course);
	if(course){
		return true;
	}
	else{
		return false;
	}
}