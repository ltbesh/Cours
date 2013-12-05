Template.alerts.helpers({ 
    errors: function() {
    return Alerts.find(); }
});

Template.alert_item.rendered = function() {  
    var alert = this.data;  
    Meteor.defer(function(){    
        Alerts.update(alert._id, {$set: {seen: true}});  
    });
};