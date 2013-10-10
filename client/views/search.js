Template.tag_search.rendered = function(){
	function format(item) { return item.title; };
	Deps.autorun(function(){
		var tags = Tags.find().fetch();
		for(var i = 0; i < tags.length; i++){
	    	tags[i].id = tags[i]['_id'];
	    	delete tags[i]._id;
		}
		$("#subject-search").select2({
			data: { results: tags, text: 'title' },
		 	placeholder: 'Chercher un sport', 
			formatSelection: format,
			formatResult: format,
			width: '100%'
		});
		
		if(Session.get('subject_search'))
			$("#subject-search").select2("val", Session.get('subject_search'))	

		$("#subject-search").on("change", function(e) { 
			Session.set('subject_search',e.val);
		});


	});
}
