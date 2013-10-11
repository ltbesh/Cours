Places = new Meteor.Collection('places');


Meteor.methods({
	insert_place : function(place_attributes){
		var user = Meteor.user();

		//user
		if(!user)
			throw new Meteor.Error(401, 
				'Vous devez être connecté pour pouvoir créer un lieu');

		//title
		if(!place_attributes.title){
			throw new Meteor.Error(422, 
				'Merci de renseigner un titre pour votre lieu');
		}
		else{
			Match.test(place_attributes.title, String);
		}

		//description
		if(!place_attributes.description){
			throw new Meteor.Error(422, 
				'Merci de renseigner une description pour votre lieu');
		}
		else{
			Match.test(place_attributes.description, String);
		}

		//address
		if(!place_attributes.address){
			throw new Meteor.Error(422, 
				'Merci de renseigner une adresse pour votre lieu');
		}
		else{
			Match.test(place_attributes.address, String);
		}

		var place = _.extend(_.pick(place_attributes, 'title', 'description', 'location', 'adress'), {
			user_id: user._id
		});

		var place_id = Places.insert(place);

		return place_id;
	}
});

/* Places
{
	title: "string",
	location: "données géographiques",
	description: "string"
}
*/