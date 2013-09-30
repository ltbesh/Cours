// On server startup, create some players if the database is empty.
  Meteor.startup(function () {
    if (Courses.find().count() === 0) {
        Courses.insert({
        	title: "Richard Douyeb", 
        	description: "Best KM course in town", 
        	subject: "Krav Maga", 
        	day_of_week: 2, 
        	starts: 1000, 
       		ends: 1060,
        	additional_information: "Salle toute pourrie"});

        Courses.insert({
        	title: "Dominique strauss kahn", 
        	description: "Cours de sexe en salle", 
        	subject: "Sexe", 
        	day_of_week: 4, 
        	starts: 1200, 
       		ends: 1260,
        	additional_information: "Interdit au femme de chambre"});

  }});
