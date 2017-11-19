var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ie-bot-393f9.firebaseio.com"
});

// This for twit
var Twit = require('twit');
var config = require('./ie_twit_config');
var T = new Twit(config);
//////////////////SEARCH HERE////////////////////
var params = { q: '#KMJS, KMJS', count: 2 };
////////////////////////////////////////////////
var searchTitle = params.q;


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref(searchTitle.substring(1).split(",", 1).join(''));
var usersRef;

// Call the getData function
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
        var tweetcontent;
        for (var i = 0; i < tweets.length; i++) {
            usersRef = ref.child(tweets[i].created_at);
            tweetcontent = tweets[i].text;
            usersRef.set({
                tweetcontent
            });
            console.log(tweets[i].created_at + '::: ' + tweets[i].text + '\n');
        }
        console.log('Done!');
    }
};