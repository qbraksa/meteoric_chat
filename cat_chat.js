

Messages = new Meteor.Collection("messages");

if (Meteor.is_client) {
	
  Template.Chat.messages = function () {
    return Messages.find({},{sort: {time:1}});
  };  

	Template.Chat.events = {
	    'click input.add': function () {
 			var contenu = document.getElementById('msg').value; 
 			Messages.insert({content: contenu , time: new Date().getTime()})
			document.getElementById('msg').value = ""
  	    }, 

		'click input.clear' : function () {
			Messages.remove({}); 
 			Meteor.flush()
		}
	 };
	
	Template.message.events = {
	    'click .text': function () {
 			Messages.remove(this._id)
  	    }
	 };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Messages.find().count() === 0) {
        //Messages.insert({content: "Hello!" , time: new Date().getTime()});
    }
  });
}
