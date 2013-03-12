var request = require('request') 

var ReadController = {

	// To trigger this action locally, visit: `http://localhost:port/read/index`
	index: function (req,res) {
		var id = req.param('id', '')
        var source = req.param('source','')
        var auth = req.session.googleAuth
        if(!auth)
        	return res.end(500)
        console.log("mark as read: "+id+", "+source+", "+auth)
        markRead(auth, id, source, function(err){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success:"trues"}))
        })

	}

};

function markRead(googleAuth, id, source, callback) {
    getToken(googleAuth, function(token) {
        var T = token
        var i = id//"tag:google.com,2005:reader/item/09b980ad0d6c44d4"
        var a = "user/-/state/com.google/read"
        var s = source//"feed/http://www.reddit.com/r/funny/.rss"
        var async = "true"

        request.post('https://www.google.com/reader/api/0/edit-tag?client=ZFeed', {
            headers : {
                Authorization : 'OAuth ' + googleAuth
            },
            form : {
                T : T,
                i : i,
                a : a,
                s : s,
                async : async
            }
        }, function(err, res, body) {
            //console.log(body)//OK
            
            callback && callback(body == "OK" ? null : new Error("couldnt mark as read"))
        })
    })
}

function getToken(googleAuth, callback) {
    request.get('https://www.google.com/reader/api/0/token?client=ZFeed', {
        headers : {
            Authorization : 'OAuth ' + googleAuth
        }
    }, function(err, res, body) {
        callback && callback(body)
    })
}


module.exports = ReadController;