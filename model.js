Courses = new Meteor.Collection('courses');


/*Course
{
	title : "string",
	description : "string",
	location : "places id",
	subject : "string"
	price : { seance : "integer", "trimestre" : "integer", ... },
	schedule : {day_of_week: integer, starts : integer, ends: integer },
	additional_information : "string"
}*/

Places = new Meteor.Collection('places');

/* Places
{
	title: "string",
	location: "données géographiques",
	description: "string"
}
*/