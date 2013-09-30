// Loaded on both the client and the server

///////////////////////////////////////////////////////////////////////////////
// Parties

/*
  Each party is represented by a document in the Parties collection:
    owner: user id
    x, y: Number (screen coordinates in the interval [0, 1])
    title, description: String
    public: Boolean
    invited: Array of user id's that are invited (only if !public)
    rsvps: Array of objects like {user: userId, rsvp: "yes"} (or "no"/"maybe")
*/

Courses = new Meteor.Collection("courses");


/*Course
{
	title : "string",
	description : "string",
	location : "donnée géographique",
	subject : "string"
	price : { seance : "integer", "trimestre" : "integer", ... },
	schedule : {day_of_week: integer, starts : integer, ends: integer },
	additional_information : "string"
}*/