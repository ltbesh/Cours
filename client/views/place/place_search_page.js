Template.place_search_page.rendered = function(){
	Session.set("search_page", true);
}

Template.place_search_page.destroyed = function(){
	Session.set("search_page", false);
}
