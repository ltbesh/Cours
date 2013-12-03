Template.home.rendered = function(){
    Session.set("search_page", true);
}

Template.home.helpers({
    search_disabled : function(){
        if(!Session.get("geographical_search").location || !Session.get("tag_selector")){
            return "disabled";
        }
        else{
            return "";
        }
    }
});

Template.home.events({
    'click #find-btn': function(e){
        if(!Session.get("geographical_search").location || !Session.get("tag_selector")){
            clear_alerts();
            insert_alert("Merci d'entrer une recherche", "danger")
        }
        else{
            Router.go("/search");
        }
    }
});

Template.home.destroyed = function(){
    Session.set("search_page", false);
}