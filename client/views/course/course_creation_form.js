Template.course_creation_form.rendered = function(){
	function format(item) { return item.title; };
	Deps.autorun(function(){
		var tags = Tags.find().fetch();
		var tags_name =[];

		for(var i = 0; i < tags.length; i++){
	    	tags[i].id = tags[i]['_id'];
	    	delete tags[i]._id;
		}
		$("#input-tags").select2({
			data: { results: tags, text: 'title' },
		 	placeholder: 'Matière ?',
			formatSelection: format,
			formatResult: format,
		});

		var places = Places.find({user_id : Meteor.userId()}).fetch();   		 

		for(var i = 0; i < places.length; i++){
	    	places[i].id = places[i]['_id'];
	    	delete places[i]._id;
		}

		$("#input-place").select2({
			data: { results: places, text: 'title' },
		 	placeholder: 'Lieu ?',
			formatSelection: format,
			formatResult: format,
		});
	});

	for (var i = 0; i < 24; i++)
	{
		if(i<10)
			i = '0'+i;

		$('#input-start-hour')
     		.append($("<option></option>")
     		.attr("value",i)
     		.text(i));
     	$('#input-end-hour')
     		.append($("<option></option>")
     		.attr("value",i)
     		.text(i));

     	if(i<12){
			$('#input-start-minute')
         		.append($("<option></option>")
         		.attr("value",i*5)
         		.text(i*5));
         	$('#input-end-minute')
         		.append($("<option></option>")
         		.attr("value",i*5)
         		.text(i*5));
     	}
 	}    
}

Template.course_creation_form.events({ 
	'submit form': function(e) {
		e.preventDefault();

		var course = {
			title: $(e.target).find('#input-title').val(),
			description: $(e.target).find('#input-description').val(), 
			day_of_week: $(e.target).find('[name=input-day]:checked').val(),
			price: $(e.target).find('#input-price').val(),		
			tag_id: $(e.target).find('#input-tags').select2("val")[0],
			starts: Number($(e.target).find('#input-start-hour').val() * 60) + Number($(e.target).find('#input-start-minute').val()),
			ends: Number($(e.target).find('#input-end-hour').val() * 60) + Number($(e.target).find('#input-end-minute').val()),
			place_id: $(e.target).find('#input-place').select2("val"),
			additional_information: $(e.target).find("#input-additional-information").val()
		};

		Meteor.call('insert_course', course, function(error, course_id){
			if(error){
				$('#course-create-error').html(error.reason);
			}
			else{
				Meteor.Router.to('course_detail_page', course_id); 
			}
		});

	}
});


