var Twit = require('twit');

var config = require('./ie_twit_config');
var params = require('./search_param')
var T = new Twit(config);

getData();
setInterval(getData, 1000 * 60)

function getData() {
    console.log('Starting......');
    // 
    //  search twitter for all tweets containing the word 'banana' since July 11, 2011 
    //
    T.get('search/tweets', params, gotData);

    function gotData(err, data, response) {
        console.log('Running......');
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at + '::: ' + tweets[i].text + '\n');
        }
        console.log('Done!');
    }
};