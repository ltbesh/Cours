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
        var course_additional_information = ["Distributeur de bonbon cassé",
                                      "Le verrou des douches ne fonctionne pas",
                                      "Interdit aux femmes",
                                      "Le cours est rempli de pédophile",
                                      "Le prof est sympa et souriant",
                                      "On progresse rapidemment, mais c'est chacun son rythme",
                                      "Cours pour les connards",
                                      "Cassez vous ia pas d'ambiance",
                                      "J'ai préféré Singapour"];
        for(var i = 0;i<100;i++){
          var starts = get_random_int(16, 42) * 30;
          Courses.insert({
            title: course_title[get_random_int(0,5)],
            description: course_description[get_random_int(0,6)],
            day_of_week: get_random_int(1,7),
            tag_id : String(get_random_int(1,8)),
            starts: starts,
            ends: starts + 60,
            additional_information: course_additional_information[get_random_int(0,8)],
            place_id: String(get_random_int(1,5)),
            price: get_random_int(10, 200)
          });
        }
      }

    if (Places.find().count() === 0) {
      Places.insert({
        title: 'Sofitel de New York',
        description: 'Un très bel hotel situé au centre de new york ou l\'on peut croiser des personnalités politiques diverses et variées.',
        adress: '8 rue des françs bourgeois 75003 Paris',
        location : { Type : 'Point', coordinates: [48.8566874, 2.3636317000000417]}, 
        _id: '1'
      });

      Places.insert({
        title: 'Théatre de trévise',
        description: 'Un très bel endroit insalubre, plein de poussière de toile d\'araignées et de sueurs',
        adress: '3 rue de trévise',
        location : { Type : 'Point', coordinates: [48.8734518, 2.345295599999986]},
        _id: '2'
      });
      Places.insert({
        title: 'Games Workshop',
        description: 'Attention geek en liberté',
        adress: '20 rue de l\'est 75020 Paris',
        location : { Type : 'Point', coordinates: [48.8710324, 2.3940036999999847]},
        _id: '3'
      });
      Places.insert({
        title: 'Collège François Couperin',
        description: 'Vous y ferez les meilleures rencontres',
        adress: '10 rue valadon Paris',
        location : { Type : 'Point', coordinates: [48.8570848, 2.3055378999999903]},
        _id: '4'
      });
      Places.insert({
        title: 'LE GREAT',
        description: 'Le café a fait la renommé de cet endroit',
        adress: '3 rue seguier',
        location :  {Type : 'Point', coordinates: [48.854216, 2.342209300000036]},
        _id: '5'
      });
    }

    if(Tags.find().count() === 0){
      Tags.insert({
        _id : '1',
        name : "Sexe en salle"
      });
      Tags.insert({
        _id : '2',
        name : "Danse orientale"
      });
      Tags.insert({
        _id : '3',
        name : "Body step"
      });
      Tags.insert({
        _id : '4',
        name : "Poterie"
      });
      Tags.insert({
        _id : '5',
        name : "Curling"
      });
      Tags.insert({
        _id : '6',
        name : "Javascript"
      });
      Tags.insert({
        _id : '7',
        name : "Escalade"
      });
      Tags.insert({
        _id : '8',
        name : "Tennis"
      });
    }

  });


function get_random_int (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
