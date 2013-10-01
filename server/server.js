// On server startup, create some players if the database is empty.
  Meteor.startup(function () {
    if (Courses.find().count() === 0) {
      Courses.insert({
      	title: 'Richard Douyeb', 
      	description: 'Best KM course in town', 
      	subject: 'Krav Maga', 
      	day_of_week: 2, 
      	starts: 1000, 
     		ends: 1060,
      	additional_information: 'Salle toute pourrie',
        location_id: 2
      });

      Courses.insert( {
      	title: 'Dominique strauss kahn', 
      	description: 'Cours de sexe en salle', 
      	subject: 'Sexe', 
      	day_of_week: 4, 
      	starts: 1200, 
     		ends: 1260,
      	additional_information: 'Interdit au femme de chambre',
        location_id: 1
        });

    if (Places.find().count() === 0) {
      Places.insert({
        title: 'Sofitel de New York',
        description: 'Un très bel hotel situé au centre de new york ou l\'on peut croiser des personnalités politiques diverses et variées.',
        location: '3 rue de new-york',
        _id: 1
      });

      Places.insert({
        title: 'Théatre de trévise',
        description: 'Un très bel endroit insalubre, plein de poussière de toile d\'araignées et de sueurs',
        location: '3 rue de trévise',
        _id: 2
      });

    };    
  }});

