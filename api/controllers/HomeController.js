var settings = require('../../settings')

var requestGoogleUrl = 'https://accounts.google.com/o/oauth2/auth?redirect_uri='+settings.DOMAIN+'/auth&response_type=code&client_id=549453773692.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.google.com%2Freader%2Fatom%2F https%3A%2F%2Fwww.google.com%2Freader%2Fapi%2F'

var HomeController = {

	// To trigger this action locally, visit: `http://localhost:port/home/index`
	index: function (req,res) {
		var auth = req.session.googleAuth;
		if(!auth){
			return res.redirect(requestGoogleUrl)
		}

		res.view();

	}

};
module.exports = HomeController;