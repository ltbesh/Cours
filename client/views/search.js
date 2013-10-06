Template.search.rendered = function(){
	function format(item) { return item.name; };
	Deps.autorun(function(){
		var tags = Tags.find().fetch();
		for(var i = 0; i < tags.length; i++){
	    	tags[i].id = tags[i]['_id'];
	    	delete tags[i]._id;
		}
		$("#e1").select2({
			data: { results: tags, text: 'name' },
		 	placeholder: 'Chercher un sport', 
			formatSelection: format,
			formatResult: format,
			width: '100%'
		});
	});
}
