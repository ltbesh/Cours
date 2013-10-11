Courses = new Meteor.Collection('courses');

Meteor.methods({
	insert_course : function(course_attributes){
		var user = Meteor.user();

		//user
		if(!user)
			throw new Meteor.Error(401, 
				'Vous devez être connecté pour pouvoir créer des cours');

		//title
		if(!course_attributes.title){
			throw new Meteor.Error(422, 
				'Merci de renseigner un titre pour votre cours');
		}
		else{
			Match.test(course_attributes.title, String);
		}

		//description
		if(!course_attributes.description){
			throw new Meteor.Error(422, 
				'Merci de renseigner une description pour votre cours');
		}
		else{
			Match.test(course_attributes.description, String);
		}

		//day
		if(!course_attributes.day_of_week){
			throw new Meteor.Error(422, 
				'Merci de renseigner un jour pour votre cours');
		}
		else {
			Match.test(course_attributes.day_of_week, Number);
			if(course_attributes.day_of_week > 7 || course_attributes.day_of_week < 0 ){
				throw new Meteor.Error(422, 
					'Merci de renseigner un jour compris entre 1 et 7 pour votre cours');
			}
		}

		if(!course_attributes.price){
			throw new Meteor.Error(422, 
				'Merci de renseigner un prix pour votre cours');
		}
		else {
			Match.test(course_attributes.price, Number);
			if(course_attributes.price < 0 ){
				throw new Meteor.Error(422, 
					'Merci de renseigner un prix positif pour votre cours');
			}
		}

		if(!course_attributes.starts){
			throw new Meteor.Error(422, 
				'Merci de renseigner une heure de début pour votre cours');
		}
		else {
			Match.test(course_attributes.starts, Number);
			if(course_attributes.starts > 1439 || course_attributes.starts < 0 ){
				throw new Meteor.Error(422, 
					'Merci de renseigner une heure comprise entre 00h00 et 23h59 le début pour votre cours');
			}
		}

		if(!course_attributes.ends){
			throw new Meteor.Error(422, 'Merci de renseigner une heure de fin pour votre cours');
		}
		else {
			Match.test(course_attributes.ends, Number);
			if(course_attributes.ends > 1439 || course_attributes.ends < 0 ){
				throw new Meteor.Error(422, 
					'Merci de renseigner une heure comprise entre 00h00 et 23h59 la fin pour votre cours');
			}
			else if (course_attributes.ends <= course_attributes.starts){
				throw new Meteor.Error(422, 
					'Merci de renseigner une heure de fin posterieure à l\'heure de début pour votre cours');
			}
		}
		
		Match.test(course_attributes.additional_information, String);

		var course = _.pick(course_attributes, 
			'title', 'description', 'day_of_week', 
			'price', 'starts', 'ends', 
			'additional_information', 'tag_id', 'place_id')

		var course_id = Courses.insert(course);

		return course_id;

	}
});