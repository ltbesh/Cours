owns_document = function(userId, doc){ 
	return doc && doc.user_id === userId;
}