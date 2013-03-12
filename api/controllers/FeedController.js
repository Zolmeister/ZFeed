var request = require('request'),
	xml2js = require('xml2js').parseString;

var FeedController = {

	// To trigger this action locally, visit: `http://localhost:port/feed/index`
	index: function (req,res) {
		var auth = req.session.googleAuth
		getFeed(auth, function(err, feed){
            if(err)
                return console.log(err)
            console.log('get feed')
            if(feed.err){
                req.session.googleAuth = null
                req.session.save()
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(feed))
        })
        
	}

};

function getFeed(googleAuth, callback) {
    var unreadUrl = 'https://www.google.com/reader/atom/user/-/state/com.google/reading-list?xt=user/-/state/com.google/read'
    request.get(unreadUrl, {
        headers : {
            Authorization : 'OAuth ' + googleAuth
        }
    }, function(err, res, body) {
        var json = xml2js(clean(body), function(err, res) {
            var filtered = filter(res)
            callback && callback(err, filtered)
        })
    })
}

function clean(xml) {
    return xml.substring(0,xml.indexOf('<!--'))+xml.substring(xml.indexOf('-->')+'-->'.length)
}

function filter(json) {
    if (!json) {
        return {err:'reauth'}
    }
    if(!json.feed.entry)
        return {feed:{entry:[]}}
    var entries = json.feed.entry.map(function(entry){
        return {
            id : entry.id,
            link : entry.link,
            source : entry.source,
            title : entry.title,
            summary : entry.summary
        }
    })
    var out = {feed:{entry:entries}}
    return out
}

module.exports = FeedController;