function getFeed(callback) {
    $('#loading').remove()
    $('.feed').append($('<span class="link" id="loading">Loading...</span>'))
    $.get('/feed', function(data) {
        if (data.err){
            location.reload()
        }
        callback(data.feed)
    })
}

$(function() {
    var compiled = dust.compile($('#entry-template').html(), "entry");
    dust.loadSource(compiled);

    getFeed(renderFeed)
    $(document).bind('keydown', function(e) {
        if (e.which === 74) {//j
            var selected = $('.selected')
            if(selected.length===0){
                $('.entry')
                .first()
                .addClass('selected')
                .addClass('read')
                .markRead()
                .find('.clip')
                .css('height', $('.selected p').height())
                return
            }
            if(selected.next().length===0){
                return
            }
            else if($('.entry').not('.read').length <= 7){
                getFeed(renderFeed)
            }
            selected
            .removeClass('selected')
            .hide()
            .next()
            .addClass('selected')
            .addClass('read')
            .markRead()
            .find('.clip')
            .css('height', $('.selected p').height())
        } else if (e.which === 75) {//k
            if($('.selected').prev().length===0){
                return
            }
            $('.selected')
            .removeClass('selected')
            .prev()
            .show()
            .addClass('selected')
            .find('.clip')
            .css('height', $('.selected p').height())
        }
        $('.selected a').focus()
    })
})
var selected = undefined
var embedKey = '5c86b96b5c30467bad06dd9f518f52e3'
var embedUrl = 'http://api.embed.ly/1/oembed?key=' + embedKey

$.fn.markRead = function () {
    var id = this.data('id')
    var item = this.attr('id')
    var source = this.data('source')
    if(markedRead.indexOf(item)!==-1)
        return this
    markedRead.push(item)
    $.get('/read?id='+id+'&source='+source)
    return this
}

function getLink(entry) {
    var link = entry.link[0].$.href
    if (link.indexOf('reddit.com') !== -1) {
        var goog_summary = entry.summary[0]._
        var matched = goog_summary.match('<br> <a href="(.+)">\\[link\\]</a>')
        link = matched && matched[1] || link
    }
    return link
}

var usedIds = []
var markedRead = []

function renderFeed(feed) {
    var urls = []
    var descriptions = []
    //var descriptions = ["Mayor names 7 new members, expects 'new energy' Mayor Rahm Emanuel on Wednesday replaced the entire board that enforces City Hall ethics and campaign finance rules as he prepares to revamp the board's role so it's focused on its judicial duties.", "Last night, just as he was going to sleep, Will Ferrell started worrying about ghosts. Like, what if, right now, a ghost wafted into the room and said, \"Hi\"? What should he say back? And, more importantly, if it's a hostile ghost, what action should he take next? Lie still?", "Havildar Lachhiman Gurung, who died on December 12 aged 92, won the Victoria Cross while serving with the Gurkha Rifles in Burma in 1945; in recent years he had been a prominent figure in the campaign led by the actress Joanna Lumley to allow former Gurkhas to settle in Britain.", "Home pregnancy tests are listed in a table below in order of most sensitive to least sensitive. The levels are based on phone calls to the manufacturers. Below that there are several frequently asked questions. The majority of the tests listed are available in the United States unless otherwise noted after the test name.", "This article has multiple issues. Please help improve it or discuss these issues on the talk page . Lockton, Dan (2008-10-01). . \"Placebo buttons, false affordances and habit-forming\". Design with intent http://architectures.danlockton.co.uk/2008/10/01/placebo-buttons-false-affordances-and-habit-forming/. Luo, Michael (2004-02-27). . ^ \"For Exercise in New York Futility, Push Button\". New York Times http://www.nytimes.com/2004/02/27/nyregion/27BUTT.html.", undefined, "The longest filibusters in American political history can be measured in hours, not minutes. They were conducted on the floor of the U.S. Senate during charged debates on civil rights, public debt and the military. In a filibuster, a senator may continue to speak indefinitely to prevent a final vote on the bill.", "Germany was on the defensive in the second Great War. The final defeat inched nearer. Two weeks earlier, the 156,000 Allied troops on nearly 5,000 amphibious vehicles had landed in Normandy, France and began fighting their way east through occupied Europe.", "The Fresh Prince of Bel-Air is an American television sitcom that originally aired on NBC from September 10, 1990, to May 20, 1996. The show stars Will Smith as a fictionalized version of himself, a street-smart teenager from West Philadelphia who is sent to move in with his aunt and uncle in their wealthy Bel Air mansion, where his lifestyle often clashes with that of his relatives.", "Handbags have come a long way since the 15th century, the earlist origin of the handbag. Back in the 1400s, purses and handbags were used to carry seeds, religious items and medicine and carried by men and women.", "It was Joe Walcott, the Barbados Demon, welterweight champion of the world from 1901-1904, who actually coined the phrase \"the bigger they are the harder they fall.\" Bob Fitzsimmons certainly popularized the saying before he faced Jim Jeffries, but it was Walcott who first said it.", "A description of the upcoming fourth generation of Abrams tank - the M1A3 model. The article looks at the U.S. Army's plans to upgrade and enhance the venerable Abrams tank and keep it in active service until the year 2050. The article also explores the history of the tank - along with its successes and difficulties.", "The former farm boy speaks deliberately, can't remember the last time he got a speeding ticket, and favors suspenders, horn-rim glasses and plaid shirts. But the 68-year-old Vietnam veteran is still too risky for Wells Fargo Home Mortgage, which fired him on July 12 from his $29,795-a-year job as a customer service representative.", "Evolutionary biologists say humans will eventually homogenize, and approach the appearance of mixed-race Brazilians.CREDIT: Image via Shutterstock It really happened: Six generations of inbreeding spanning the years 1800 to 1960 caused an isolated population of humans living in the hills of Kentucky to become blue-skinned.", undefined, "ON TV Dinosaurs Decoded, airs Sunday, October 11 at 9 p.m. ET/PT on the National Geographic Channel. Preview Dinosaurs Decoded >> Many dinosaurs may be facing a new kind of extinction-a controversial theory suggests as many as a third of all known dinosaur species never existed in the first place.", "Philip M. Parker, Professor of Marketing at INSEAD Business School, has had a side project for over 10 years. He's created a computer system that can write books about specific subjects in about 20 minutes. The patented algorithm has so far generated hundreds of thousands of books. In fact, Amazon [...]", "Television: Carsey-Werner breaks ground by producing U.S. and British versions of 'That '70s Show.' LONDON - Down a quiet street along the Thames River, just outside of London, television history is being made. Here, in Teddington Studios, the Carsey-Werner Co. is taping a British version of Fox's \"That '70s Show.\"", "Matamoros, Mexico-an easy drive or stroll across the Rio Grande River from Brownsville, Texas-has been a popular hangout for vacationing college students since the 1930s. It is a typical border town, with all that implies: prostitution and sex shows, abundant alcohol and drugs, rampant poverty and crime.", "Fall of the Ottoman Empire The Titanic sank 2 World Wars First trans-Atlantic flight Hindenburg disaster Digital watches Microwaves Color television Harry Caray was born...and died Theory of general relativity"]
    var entries = feed.entry
    if (!entries || entries.length==0){
        $('#loading').remove()
        $('#none').remove()
        $('.feed').append($('<span class="link" id="none">None</span>'))
        return 
    }
    
    entries.forEach(function(entry) {
        urls.push(getLink(entry))
    })

    $.getJSON(embedUrl + '&urls=' + urls.map(escape).join(',') + '&callback=?', function(embed) {
        $('#loading').remove()
        $('#none').remove()
        embed.forEach(function(emb) {
            descriptions.push(emb.description)
        })
        entries.forEach(function(entry, i) {
            var link = getLink(entry)
            var title = entry.title[0]._
            dust.render("entry", {
                link : link,
                title : title,
                desc : descriptions[i]

            }, function(err, out) {
                var id = entry.id[0]._
                var item = id.split('/')[2]
                var source = entry.source[0].$['gr:stream-id']
                if(usedIds.indexOf(item)!==-1)
                    return
                usedIds.push(item)
                var $el = $('<div class="entry" id='+item+'></div>')
                $el.data('id', id).data('source', source)
                $el.html(out)
                $('.feed').append($el)
            })
        })
        $('.entry')
        .unbind()
        .bind('click', function(e){
                var selected = $('.selected') 
                if(selected.attr('id') == $(this).attr('id'))
                    return
                selected
                .removeClass('selected')
                .hide()
                
                $(this)
                .addClass('selected')
                .addClass('read')
                .markRead()
                .find('.clip')
                .css('height', $('.selected p').height())
                
                $('.selected a').focus()
           })
    })
}
