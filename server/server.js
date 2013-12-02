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
        user_id : id_ltbesh,
        _id: '1'
      });
      Places.insert({
        title: 'Théatre de trévise',
        description: 'Un très bel endroit insalubre, plein de poussière de toile d\'araignées et de sueurs',
        address: '3 rue de trévise',
        location : { type : 'Point', coordinates: [2.345295599999986, 48.8734518]},
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

    var tags_array = ["Danse", "Poterie", "Tennis"];

    if(Tags.find().count() === 0){
      Tags.insert({
        _id : "Danse"
      });
      Tags.insert({
        _id : "Poterie"
      });
      Tags.insert({
        _id : "Tennis"
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
        var contacts = ["JeanPaul@Dubois.com "," Robert@Duval.fr", "Martine@Mato.net", "Ahmed@Berkane.eu", "Jules@bodineau.org"];
        var materiels = [ "one pair black boots", "String léopard", "Gant de boxe", "Marteau et enclume", "Ventilateur"];
        var price_explanations = ["C'est cher mais c'est bien", "Si vous êtes une fille c'est gratos", "Si vous trouvez ça trop cher, vous pouvez toujours allez voir ailleurs"];
        var photos = [["/8.jpg", "/9.jpg", "/10.jpg"], ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"], ["/5.jpg", "/6.jpg", "/7.jpg"]];

        var time_slots_november = [1383310800,1383314400,1383318000,1383321600,1383325200,1383328800,1383332400,1383336000,1383339600,1383343200,1383346800,1383350400,1383354000,1383357600,
        1383397200,1383400800,1383404400,1383408000,1383411600,1383415200,1383418800,1383422400,1383426000,1383429600,1383433200,1383436800,1383440400,1383444000,
        1383483600,1383487200,1383490800,1383494400,1383498000,1383501600,1383505200,1383508800,1383512400,1383516000,1383519600,1383523200,1383526800,1383530400,
        1383570000,1383573600,1383577200,1383580800,1383584400,1383588000,1383591600,1383595200,1383598800,1383602400,1383606000,1383609600,1383613200,1383616800,
        1383656400,1383660000,1383663600,1383667200,1383670800,1383674400,1383678000,1383681600,1383685200,1383688800,1383692400,1383696000,1383699600,1383703200,
        1383742800,1383746400,1383750000,1383753600,1383757200,1383760800,1383764400,1383768000,1383771600,1383775200,1383778800,1383782400,1383786000,1383789600,
        1383829200,1383832800,1383836400,1383840000,1383843600,1383847200,1383850800,1383854400,1383858000,1383861600,1383865200,1383868800,1383872400,1383876000];
        
        var time_slots_title = ["Debutants", "Confirmés", "Experts"];

        for (var j = 1; j < 4; j ++){
            for(var k = 1; k < 6; k ++){
                var user_id = k<4 ? id_ltbesh : id_alex;
                var is_course = get_random_int(1,3);
                if(is_course !==3){
                  var course_tag_array = new Array(tags_array[j-1]);
                  console.log(course_tag_array);
                    var id = Courses.insert({
                        description: course_description[get_random_int(0,6)],
                        tag_id : course_tag_array ,
                        additional_information: course_additional_information[get_random_int(0,8)],
                        place_id: String(k),
                        pictures : photos[j-1],
                        price: get_random_int(10, 200),
                        contact : contacts[get_random_int(0,4)],
                        required_materiel : materiels[get_random_int(0,4)],
                        price_explanation : price_explanations[get_random_int(0,2)],
                        user_id : user_id
                    });

                    var number_of_slots = get_random_int(2,5);
                    for (var l = 1; l <= number_of_slots; l++){
                        var time_november = get_random_int(0,104);
                        var start = new Date(time_slots_november[time_november] * 1000);
                        while (start.getHours() * 60 + start.getMinutes() < 480 || start.getHours() * 60 + start.getMinutes() >= 1380){
                          var time_november = get_random_int(0,104);
                          var start = new Date(time_slots_november[time_november] * 1000);
                        }
                        var end = new Date(time_slots_november[time_november] * 1000 + 60 * 60 * 1000);

                        TimeSlots.insert({
                            course_id : id,
                            title : time_slots_title[get_random_int(0,2)],
                            start: start,
                            end: end,
                            all_day:false,
                            day_of_week : start.getDay(),
                            start_time: start.getHours() * 60 + start.getMinutes(),
                            end_time: end.getHours() * 60 + end.getMinutes(),
                            repeat : true,
                            repeat_frequency : 7,
                            user_id : user_id
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
