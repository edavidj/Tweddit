const indico = require("indico.io"),
    Reddit = require("./Reddit"),
    Request = require("./Request"),
    Twitter = require("twitter"),
    async   = require("async"),
    passport = require("passport"),
    TwitterStrategy = require("passport-twitter"),
    http    = require("https");

indico.apiKey = process.env.INDICO_KEY;
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key:process.env.TWITTER_TOKEN_KEY,
    access_token_secret:process.env.TWITTER_TOKEN_SECRET
});
module.exports = (function(){
    //private functions
    /**
     * Get timeline posts
     * @param {String} user
     */
    const parseIndico = (res) => {
        //clarify that res structure is just api response
        let maxKey;
        let keys = Object.keys(res);
        for(var i of keys){
            if(maxKey === undefined && res[i] > 0.05){ maxKey = i;}
            else if(res[i] > res[maxKey] && res[i] > 0.05) {
                maxKey = i;
            }
        }
        return maxKey;
    }
    function getTags(user,res){
        user = user.slice(1,user.length);
        console.log(user);
        let params = {screen_name:user};
        client.get('statuses/user_timeline', params, (err, tweets, response) => {
            var tags = [];
            // console.log(err);
            // console.log(tweets);
            // console.log(response);
            async.each(tweets, (tweet, callback) => {
                indico.text_tags(tweet.text)
                .then(parseIndico)
                .then((tag) => {
                    indico.sentiment(tweet.text)
                      .then((sentiments) => {
                        if((tag !== undefined) && (sentiments >= 0.40)){
                            tags.push(tag);
                        }
                        callback();
                        })
                    })
                }, (err) => {
                    if(err) throw err;
                    if(tags.length === 0){ res.json();return;}
                    Reddit.createMulti(res,tags);
                });
            });
    }
    return {
        //public methods
        getTags(user,res) {
            getTags(user,res);
        }
    };
})();
