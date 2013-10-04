// On server startup, create some course if the database is empty.
  Meteor.startup(function () {
    if (Courses.find().count() === 0) {
        var course_title = ["Pour les nuls", "Seulement pour les pros", "Cours confirmés", "Cours experts", "Cours tous niveaux", "Faux débutant"];
        var course_description = ["Un très bon cours", 
                      "Parisien passez votre chemin", 
                      "Le prof pue des bras", 
                      "Meuf facile à chopper", 
                      "Le prof passe le cours sur Facebook",
                      "On est beaucoup trop nombreux",
                      "Un cours un peu court"];
        var course_subject = ["Sexe en salle", "Danse orientale", "Body step", "Poterie", "Curling", "Javascript", "Tennis", "Escalade"];
        var course_additionale_information = ["Distributeur de bonbon cassé",
                                      "Le verrou des douches ne fonctionne pas",
                                      "Interdit aux femmes",
                                      "Le cours est rempli de pédophile",
                                      "Le prof est sympa et souriant",
                                      "On progresse rapidemment, mais c'est chacun son rythme",
                                      "Cours pour les connards",
                                      "Cassez vous ia pas d'ambiance",
                                      "J'ai préféré Singapour"];
        for(var i = 0;i<100;i++){
          var starts = getRandomInt(480, 1380);
          Courses.insert({
            title: course_title[getRandomInt(0,5)],
            description: course_description[getRandomInt(0,6)],
            subject: course_subject[getRandomInt(0,7)],
            day_of_week: getRandomInt(1,7),
            starts: starts,
            ends: starts + 60,
            additional_information: course_additionale_information[getRandomInt(0,8)],
            location_id: getRandomInt(1,2),
            price: getRandomInt(10, 200)
          });
        }
      }

    if (Places.find().count() === 0) {

      var place_title = ['Sofitel de New York', 'Théatre de trévise', 'College François Couperin', 'Games Workshop', 'Gileleje', ];
      Places.insert({
        title: 'Sofitel de New York',
        description: 'Un très bel hotel situé au centre de new york ou l\'on peut croiser des personnalités politiques diverses et variées.',
        location: '3 rue de new-york',
        _id: '1'
      });

      Places.insert({
        title: 'Théatre de trévise',
        description: 'Un très bel endroit insalubre, plein de poussière de toile d\'araignées et de sueurs',
        location: '3 rue de trévise',
        _id: '2'
      });
    }
  });

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
