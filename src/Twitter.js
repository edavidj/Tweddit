var indico = require("indico.io"),
    Reddit = require("./Reddit"),
    Request = require("./Request"),
    Twitter = require("twitter"),
    async   = require("async"),
    passport = require("passport"),
    TwitterStrategy = require("passport-twitter"),
    http    = require("https");

indico.apiKey = "a94abe43d1aea51d0b891c7d09a781ae";
var client = new Twitter({
    consumer_key: "5UkW1lm6uIi3sqjW59C1XPlYs",
    consumer_secret: "d9j5XinzrnPUpgAzzHcifzgVjLpN65PvfgttAM5TPPzAksx8Od",
    access_token_key:"1038895591-NKLUo7VqURfU3HGbLCgUbYIRYBwwSD5LB0vWEcM",
    access_token_secret:"sXLhKWqJKOkJlkScAJJdu1xY66LRDOfOcCyIq5vYG5o0m"
});
module.exports = (function(){
    //private functions
    /**
     * Get timeline posts
     * @param {String} user
     */
    var parseIndico = (res) => {
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
        let params = {screen_name:user};
        client.get('statuses/user_timeline', params, (err, tweets, response) => {
            var tags = [];
            // console.log(err);
            // console.log(tweets);
            // console.log(response);
            async.each(tweets, function(tweet, callback){
                indico.text_tags(tweet.text)
                .then(parseIndico)
                .then((tag) => {
                    if(tag !== undefined){ tags.push(tag);}
                    callback();
                });
            }, function(err){
                if(err) throw err;
                Reddit.createMulti(res,tags);
            })           
        });

    }
    return {
        //public methods
        getTags: function(user,res){
            getTags(user,res);
        }
    };
})();
