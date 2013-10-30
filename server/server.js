// On server startup, create some course if the database is empty.
Meteor.startup(function () {
    Places._ensureIndex({ location : "2dsphere" });

    if(Meteor.users.find().count() === 0){
      var id_ltbesh = Accounts.createUser({username: 'ltbesh', password: 'admin'});
      var id_alex = Accounts.createUser({username: 'dada', password: 'admin'});
      var id_lucas = Accounts.createUser({username: 'lucas', password: 'admin'});
    }

    if (Places.find().count() === 0) {
      Places.insert({
        title: 'Sofitel de New York',
        description: 'Un très bel hotel situé au centre de new york ou l\'on peut croiser des personnalités politiques diverses et variées.',
        address: '8 rue des françs bourgeois 75003 Paris',
        location : { type : 'Point', coordinates: [2.3636317000000417, 48.8566874]}, 
        images: ["ROAD_MISC_010.jpg", "STARTLINE_COLOR_011.jpg"],
        user_id : id_ltbesh,
        _id: '1'
      });
      Places.insert({
        title: 'Théatre de trévise',
        description: 'Un très bel endroit insalubre, plein de poussière de toile d\'araignées et de sueurs',
        address: '3 rue de trévise',
        location : { type : 'Point', coordinates: [2.345295599999986, 48.8734518]},
        images: ["interessant.jpg", "To do.png"],
        user_id : id_ltbesh,
        _id: '2'
      });
      Places.insert({
        title: 'Games Workshop',
        description: 'Attention geek en liberté',
        address: '20 rue de l\'est 75020 Paris',
        location : { type : 'Point', coordinates: [2.3940036999999847, 48.8710324]},
        user_id : id_ltbesh,
        _id: '3'
      });
      Places.insert({
        title: 'Collège François Couperin',
        description: 'Vous y ferez les meilleures rencontres',
        address: '10 rue valadon Paris',
        location : { type : 'Point', coordinates: [2.3055378999999903, 48.8570848]},
        user_id : id_alex,
        _id: '4'
      });
      Places.insert({
        title: 'LE GREAT',
        description: 'Le café a fait la renommé de cet endroit',
        address: '3 rue seguier',
        location :  {type : 'Point', coordinates: [2.342209300000036, 48.854216]},
        user_id : id_alex,
        _id: '5'
      });
    }

    if(Tags.find().count() === 0){
      Tags.insert({
        _id : '1',
        title : "Danse"
      });
      Tags.insert({
        _id : '2',
        title : "Poterie"
      });
      Tags.insert({
        _id : '3',
        title : "Tennis"
      });
    }

    if (Courses.find().count() === 0) {
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
        var contacts = ["Jean Paul Dubois "," Robert Duval", "Martine Mato", "Ahmed Berkane", "Jules Bodineau"];
        var materiels = [ "one pair black boots", "String léopard", "Gant de boxe", "Marteau et enclume", "Ventilateur"];
        var price_explanations = ["C'est cher mais c'est bien", "Si vous êtes une fille c'est gratos", "Si vous trouvez ça trop cher, vous pouvez toujours allez voir ailleurs"];

        for (var j = 1; j < 4; j ++){
            for(var k = 1; k < 6; k ++){
                var is_course = get_random_int(1,3);

                if(is_course !==3){
                    var id = Courses.insert({
                        description: course_description[get_random_int(0,6)],
                        tag_id : String(j),
                        additional_information: course_additional_information[get_random_int(0,8)],
                        place_id: String(k),
                        price: get_random_int(10, 200),
                        contact : contacts[get_random_int(0,4)],
                        required_materiel : materiels[get_random_int(0,4)],
                        price_explanation : price_explanations[get_random_int(0,2)]
                    });

                    var number_of_slots = get_random_int(1,4);
                    for (var l = 1; l <= number_of_slots; l++){
                        var starts = get_random_int(16, 42) * 30;
                        TimeSlots.insert({
                            course_id : id,
                            day_of_week: get_random_int(1,7),
                            starts: starts,
                            ends: starts + 60
                        });
                    }
                }
            }
        }
    }
});

function get_random_int (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
