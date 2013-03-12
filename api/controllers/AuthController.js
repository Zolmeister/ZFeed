var request = require('request'),
    settings = require('../../settings')

var AuthController = {

	index: function (req,res) {
        var code = req.param('code')
        if(!code) {
	        return res.send(500)
	    }
        getAuth(code, function(auth, refresh){
            if(!auth) {
                req.session.googleAuth = null
                req.session.save()
                return res.send(500)
            }
            req.session.googleAuth = auth
            console.log(3)
            req.session.save()
            res.redirect('/')
        })
	}

};

function getAuth(code, callback) {
    request.post('https://accounts.google.com/o/oauth2/token', {
        form: {
            code: code,
            client_id: '549453773692.apps.googleusercontent.com',
            client_secret: settings.CLIENT_SECRET,
            redirect_uri: settings.DOMAIN+'/auth',
            grant_type: 'authorization_code'
        }
    }, function(err, res, body){
        console.log("authed")
        var auth = JSON.parse(body)
        console.log(auth)
        callback && callback(auth.access_token)
    })
}

module.exports = AuthController;
